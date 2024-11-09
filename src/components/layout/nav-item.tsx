"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function NavItem({ href, children }: { href: string; children: ReactNode; }) {
    return (
        <Button asChild>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
}
