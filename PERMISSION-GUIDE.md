# AdminLTE 权限管理系统使用指南

## 概述

本权限管理系统为AdminLTE框架提供了基于角色的客户端路由与菜单可见性权限管理功能，支持细粒度的权限控制和动态权限更新。

## 权限JSON数据结构

### 完整结构示例

```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Alexander Pierce",
    "avatar": "./assets/img/user2-160x160.jpg"
  },
  "roles": ["admin", "editor"],
  "rolePriority": {
    "admin": 3,
    "editor": 2,
    "viewer": 1
  },
  "routePermissions": {
    "/index.html": ["admin", "editor", "viewer"],
    "/index2.html": ["admin", "editor"],
    "/index3.html": ["admin"],
    "/widgets/*": ["admin", "editor", "viewer"]
  },
  "menuPermissions": {
    "dashboard": ["admin", "editor", "viewer"],
    "dashboard.v1": ["admin", "editor", "viewer"],
    "dashboard.v2": ["admin", "editor"],
    "dashboard.v3": ["admin"]
  },
  "elementPermissions": {
    "create-button": ["admin", "editor"],
    "delete-button": ["admin"]
  }
}
```

### 字段说明

#### 1. `user` - 用户基本信息
- `id`: 用户ID
- `username`: 用户名/账号
- `name`: 用户真实姓名
- `avatar`: 用户头像URL（可选）

#### 2. `roles` - 用户角色列表
当前用户拥有的角色数组，支持多角色

#### 3. `rolePriority` - 角色优先级定义
数字越大优先级越高，用于多角色冲突时的权限决议

#### 4. `routePermissions` - 路由访问权限
键为路由路径，值为允许访问的角色列表

**匹配规则：**
- 精确匹配：`/index.html` 只会匹配首页
- 通配符匹配：`/widgets/*` 会匹配所有widgets子页面
- 空数组：表示允许所有角色访问

#### 5. `menuPermissions` - 菜单可见性权限
键为菜单标识，值为允许可见的角色列表

#### 6. `elementPermissions` - 页面元素权限
键为页面元素标识，值为允许可见的角色列表

## 使用方法

### 1. 在HTML中添加权限标识

#### 菜单权限控制
```html
<li class="nav-item" data-permission="dashboard.v3">
  <a href="./index3.html" class="nav-link">
    <i class="nav-icon bi bi-circle"></i>
    <p>Dashboard v3 (仅admin可见)</p>
  </a>
</li>
```

#### 页面元素权限控制
```html
<button class="btn btn-danger" data-element-permission="delete-button">
  <i class="bi bi-trash"></i> 删除数据 (仅admin)
</button>
```

### 2. 初始化权限系统

权限系统会自动通过AdminLTE初始化，默认加载`./js/permission-example.json`配置文件。

您也可以手动初始化：

```javascript
const permissionData = {
  // 权限配置数据
};

window.adminlte.permissionManager.init(permissionData);
```

### 3. 动态更新权限

无需刷新页面即可动态更新用户权限：

```javascript
// 切换用户角色
window.adminlte.permissionManager.updatePermissions({
  roles: ['viewer']
});

// 更新完整权限配置
window.adminlte.permissionManager.updatePermissions({
  user: {
    id: 2,
    username: 'guest',
    name: 'Guest User'
  },
  roles: ['viewer']
});
```

### 4. 权限检查API

```javascript
// 检查是否拥有路由访问权限
const hasAccess = window.adminlte.permissionManager.hasRoutePermission('/index3.html');

// 检查是否拥有菜单权限
const hasMenuAccess = window.adminlte.permissionManager.hasMenuPermission('dashboard.v3');

// 检查是否拥有元素权限
const hasElementAccess = window.adminlte.permissionManager.hasElementPermission('delete-button');

// 获取当前用户信息
const userInfo = window.adminlte.permissionManager.getUserInfo();

// 获取当前角色列表
const roles = window.adminlte.permissionManager.getCurrentRoles();
```

## 系统特性

### 1. 自动权限控制
- 页面加载时自动检查当前路由权限
- 自动隐藏无权限的菜单项和页面元素
- 自动处理树形菜单，如果子菜单都无权限，则隐藏父菜单

### 2. 导航拦截
- 自动拦截页面内导航请求
- 对无权限访问给出明确提示
- 支持未授权访问重定向到403页面

### 3. 多角色支持
- 支持用户同时拥有多个角色
- 自动合并多角色权限
- 基于优先级处理权限冲突

### 4. 动态更新
- 支持权限变更时无需刷新页面
- 实时更新菜单和页面元素可见性
- 即时应用新的权限配置

## 最佳实践

### 1. 权限标识命名规范

使用点分隔的命名空间风格：
```
系统.模块.功能
例如：system.user.create, system.log.view
```

### 2. 角色设计建议

| 角色名 | 优先级 | 权限说明 |
|--------|--------|----------|
| admin  | 3      | 系统管理员，拥有所有权限 |
| editor | 2      | 内容编辑者，拥有编辑权限 |
| viewer | 1      | 普通查看者，仅拥有只读权限 |
| guest  | 0      | 游客权限，仅拥有公开页面访问权限 |

### 3. 安全性注意事项

1. **客户端权限仅作为辅助控制**：重要业务逻辑必须在服务端进行权限验证
2. **敏感信息保护**：避免在前端权限配置中泄露敏感权限信息
3. **定期更新权限**：用户权限变更时应及时更新前端权限配置
4. **路由守卫**：配合服务端路由验证，防止非法访问

## 示例页面

访问 `./dist/permission-demo.html` 查看完整的权限管理系统演示，包含：
- 动态权限切换演示
- 不同角色的菜单可见性效果
- 页面元素权限控制展示
- 路由访问权限测试
