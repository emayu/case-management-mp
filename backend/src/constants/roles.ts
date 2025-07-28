export const ROLES = {
  ADMIN_SYSTEM: 'ADMIN_SYSTEM',
  ADMIN_FISCALIA: 'ADMIN_FISCALIA',
  FISCAL: 'FISCAL',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES]