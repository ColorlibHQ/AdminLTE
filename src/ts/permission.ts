/**
 * AdminLTE 权限管理系统
 * 基于角色的客户端路由与菜单可见性权限管理
 */

interface UserInfo {
  id: number;
  username: string;
  name: string;
  avatar?: string;
}

interface RolePriority {
  [role: string]: number;
}

interface PermissionConfig {
  [key: string]: string[];
}

interface PermissionData {
  user: UserInfo;
  roles: string[];
  rolePriority: RolePriority;
  routePermissions: PermissionConfig;
  menuPermissions: PermissionConfig;
  elementPermissions: PermissionConfig;
}

class PermissionManager {
  private permissions: PermissionData | null = null;
  private currentRoles: string[] = [];
  private highestPriorityRole: string | null = null;
  private readonly MENU_ATTR = 'data-permission';
  private readonly ELEMENT_ATTR = 'data-element-permission';

  /**
   * 初始化权限管理器
   * @param permissionData 权限数据
   */
  init(permissionData: PermissionData): void {
    this.permissions = permissionData;
    this.currentRoles = permissionData.roles;
    this.highestPriorityRole = this.getHighestPriorityRole();
    
    // 初始化权限控制
    this.initRouteGuard();
    this.initMenuPermissions();
    this.initElementPermissions();
    
    console.log('权限管理系统已初始化', {
      user: permissionData.user,
      roles: permissionData.roles,
      highestPriorityRole: this.highestPriorityRole
    });
  }

  /**
   * 获取优先级最高的角色
   */
  private getHighestPriorityRole(): string | null {
    if (!this.permissions || this.currentRoles.length === 0) {
      return null;
    }

    return this.currentRoles.reduce((highest, role) => {
      const currentPriority = this.permissions!.rolePriority[role] || 0;
      const highestPriority = this.permissions!.rolePriority[highest] || 0;
      return currentPriority > highestPriority ? role : highest;
    }, this.currentRoles[0]);
  }

  /**
   * 检查用户是否拥有指定权限
   * @param allowedRoles 允许的角色列表
   */
  hasPermission(allowedRoles: string[]): boolean {
    // 如果允许所有角色（空数组），则返回true
    if (allowedRoles.length === 0) {
      return true;
    }

    // 检查是否有重叠角色
    return this.currentRoles.some(role => allowedRoles.includes(role));
  }

  /**
   * 检查路由访问权限
   * @param path 路由路径
   */
  hasRoutePermission(path: string): boolean {
    if (!this.permissions) {
      return false;
    }

    // 精确匹配
    if (this.permissions.routePermissions[path]) {
      return this.hasPermission(this.permissions.routePermissions[path]);
    }

    // 通配符匹配
    for (const [routePattern, allowedRoles] of Object.entries(this.permissions.routePermissions)) {
      if (routePattern.endsWith('*')) {
        const baseRoute = routePattern.slice(0, -1);
        if (path.startsWith(baseRoute)) {
          return this.hasPermission(allowedRoles);
        }
      }
    }

    // 默认拒绝访问
    return false;
  }

  /**
   * 检查菜单权限
   * @param menuKey 菜单标识
   */
  hasMenuPermission(menuKey: string): boolean {
    if (!this.permissions) {
      return false;
    }

    const allowedRoles = this.permissions.menuPermissions[menuKey] || [];
    return this.hasPermission(allowedRoles);
  }

  /**
   * 检查元素权限
   * @param elementKey 元素标识
   */
  hasElementPermission(elementKey: string): boolean {
    if (!this.permissions) {
      return false;
    }

    const allowedRoles = this.permissions.elementPermissions[elementKey] || [];
    return this.hasPermission(allowedRoles);
  }

  /**
   * 初始化路由守卫
   */
  private initRouteGuard(): void {
    // 检查当前页面权限
    const currentPath = window.location.pathname;
    const relativePath = currentPath.substring(currentPath.lastIndexOf('/'));
    
    if (!this.hasRoutePermission(relativePath)) {
      this.handleUnauthorizedAccess();
    }

    // 监听页面内导航
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.getAttribute('href')) {
        const href = link.getAttribute('href')!;
        
        // 忽略外部链接和锚点
        if (href.startsWith('http') || href.startsWith('#')) {
          return;
        }

        if (!this.hasRoutePermission(href)) {
          e.preventDefault();
          this.showPermissionDeniedAlert();
        }
      }
    });
  }

  /**
   * 初始化菜单权限控制
   */
  private initMenuPermissions(): void {
    const menuItems = document.querySelectorAll(`[${this.MENU_ATTR}]`);
    
    menuItems.forEach(item => {
      const menuKey = item.getAttribute(this.MENU_ATTR)!;
      const hasPermission = this.hasMenuPermission(menuKey);
      
      if (hasPermission) {
        this.showElement(item as HTMLElement);
      } else {
        this.hideElement(item as HTMLElement);
      }
    });

    // 处理树形菜单，如果子菜单都没有权限，则隐藏父菜单
    this.cleanupEmptyParentMenus();
  }

  /**
   * 初始化页面元素权限控制
   */
  private initElementPermissions(): void {
    const elements = document.querySelectorAll(`[${this.ELEMENT_ATTR}]`);
    
    elements.forEach(item => {
      const elementKey = item.getAttribute(this.ELEMENT_ATTR)!;
      const hasPermission = this.hasElementPermission(elementKey);
      
      if (hasPermission) {
        this.showElement(item as HTMLElement);
      } else {
        this.hideElement(item as HTMLElement);
      }
    });
  }

  /**
   * 显示元素
   */
  private showElement(element: HTMLElement): void {
    element.style.display = '';
    element.classList.remove('d-none');
  }

  /**
   * 隐藏元素
   */
  private hideElement(element: HTMLElement): void {
    element.style.display = 'none';
    element.classList.add('d-none');
  }

  /**
   * 清理空的父菜单
   */
  private cleanupEmptyParentMenus(): void {
    const parentMenus = document.querySelectorAll('.nav-item');
    
    parentMenus.forEach(menu => {
      const treeview = menu.querySelector('.nav-treeview');
      if (treeview) {
        const visibleChildren = treeview.querySelectorAll(':not(.d-none)');
        if (visibleChildren.length === 0) {
          this.hideElement(menu as HTMLElement);
        }
      }
    });
  }

  /**
   * 处理未授权访问
   */
  private handleUnauthorizedAccess(): void {
    const accessDeniedPage = '/403.html';
    
    if (window.location.pathname !== accessDeniedPage) {
      alert('您没有访问该页面的权限，请联系管理员获取权限。');
      window.location.href = accessDeniedPage;
    }
  }

  /**
   * 显示权限不足提示
   */
  private showPermissionDeniedAlert(): void {
    alert('抱歉，您没有权限访问该页面。');
  }

  /**
   * 更新权限（无需刷新页面）
   * @param newPermissions 新的权限数据
   */
  updatePermissions(newPermissions: Partial<PermissionData>): void {
    if (this.permissions) {
      this.permissions = { ...this.permissions, ...newPermissions };
      this.currentRoles = newPermissions.roles || this.currentRoles;
      this.highestPriorityRole = this.getHighestPriorityRole();
      
      // 重新应用权限
      this.initMenuPermissions();
      this.initElementPermissions();
      
      console.log('权限已更新', this.permissions);
    }
  }

  /**
   * 获取当前用户信息
   */
  getUserInfo(): UserInfo | null {
    return this.permissions?.user || null;
  }

  /**
   * 获取当前角色列表
   */
  getCurrentRoles(): string[] {
    return this.currentRoles;
  }

  /**
   * 获取最高优先级角色
   */
  getHighestRole(): string | null {
    return this.highestPriorityRole;
  }
}

// 创建单例实例
const permissionManager = new PermissionManager();

export default permissionManager;