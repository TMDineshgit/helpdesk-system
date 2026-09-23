const permissions = {
  ADMIN: [
    'ticket:create',
    'ticket:view',
    'ticket:update',
    'ticket:delete',
    'ticket:assign',
    'user:manage',
  ],

  SUPPORT_AGENT: [
    'ticket:create',
    'ticket:view',
    'ticket:update',
    'ticket:assign',
  ],

  USER: [
    'ticket:create',
    'ticket:view',
  ],
};

function usePermissions(role = 'USER') {
  const rolePermissions = permissions[role] || [];

  const hasPermission = (permission) => {
    return rolePermissions.includes(permission);
  };

  return {
    hasPermission,
  };
}

export default usePermissions;