export { default } from 'next-auth/middleware'
export const config = { matcher: [
    '/dashboard/admin',
    '/dashboard/admin/trending',
    '/dashboard/admin/trending/create',
    '/dashboard/admin/mobile-games',
    '/dashboard/admin/mobile-games/create',
    '/dashboard/admin/pc-games',
    '/dashboard/admin/pc-games/create',
    '/dashboard/admin/apps',
    '/dashboard/admin/apps/create',
    '/dashboard/admin/voucher',
    '/dashboard/admin/voucher/create',
] }