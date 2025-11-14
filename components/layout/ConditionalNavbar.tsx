'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../ui/Navbar';

const EXCLUDED_PATHS = ['/login', '/recuperar-password'];

export default function ConditionalNavbar() {
     const pathname = usePathname() ?? '';

     const path = pathname.replace(/\/+$/, '') || '/';
     const shouldHideNavbar = EXCLUDED_PATHS.some((p) => path === p || path.startsWith(`${p}/`));

     if (shouldHideNavbar) return null;
     return <Navbar />;
}
