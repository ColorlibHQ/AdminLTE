class PermissionSystem {
    static permissions = [];
    static initialized = false;

    static init(config) {
        this.permissions = config.permissions || [];
        this.initialized = true;
        this.applyPermissions();
        console.log('Permission system initialized');
    }

    static updatePermissions(newPermissions) {
        this.permissions = newPermissions;
        this.applyPermissions();
        console.log('Permissions updated:', newPermissions);
    }

    static hasPermission(permission) {
        if (!this.initialized) return true;
        if (this.permissions.includes('*')) return true;
        return this.permissions.includes(permission);
    }

    static applyPermissions() {
        // Hide elements without required permissions
        document.querySelectorAll('[data-permission]').forEach(element => {
            const permission = element.getAttribute('data-permission');
            if (!this.hasPermission(permission)) {
                element.style.display = 'none';
            } else {
                element.style.display = '';
            }
        });

        // Disable links without required permissions
        document.querySelectorAll('a[data-permission]').forEach(link => {
            const permission = link.getAttribute('data-permission');
            if (!this.hasPermission(permission)) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    showAlert('You do not have permission to access this page', 'danger');
                });
            }
        });
    }
}

// Make it globally available
window.PermissionSystem = PermissionSystem;