"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";
import React from 'react';
import { HomeIcon, LogInIcon, SettingsIcon, UserCircle2Icon, UserPlus2Icon } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { userAtom } from '@/components/atoms';
import { useAtomValue } from 'jotai';
import { cssVars } from '@/app.config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NavItem() {
    const path = usePathname();

    return (
        <div className='flex flex-col gap-y-2'>
            <SheetClose asChild>
                <Button variant={path === '/' ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                    <Link href={'/'}>
                        <HomeIcon />
                        Home
                    </Link>
                </Button>
            </SheetClose>

            <SheetClose asChild>
                <Button variant={path === '/profile' ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                    <Link href={'/profile'}>
                        <UserCircle2Icon />
                        Profile
                    </Link>
                </Button>
            </SheetClose>

            <SheetClose asChild>
                <Button variant={path === '/settings' ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                    <Link href={'/settings'}>
                        <SettingsIcon />
                        Settings
                    </Link>
                </Button>
            </SheetClose>

            <SheetClose asChild>
                <Button variant={path === '/sign-in' ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                    <Link href={'/sign-in'}>
                        <LogInIcon />
                        Sign in
                    </Link >
                </Button>
            </SheetClose>

            <SheetClose asChild>
                <Button variant={path === '/sign-up' ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                    <Link href={'/sign-up'}>
                        <UserPlus2Icon />
                        Sign up
                    </Link>
                </Button>
            </SheetClose>
        </div>
    );
}


export function UserProfile() {
    const user = useAtomValue(userAtom);

    return (
        <div className='flex flex-row gap-2'>
            <ThemeToggle borderRadius='full' />

            {/* To-Do: Add valid image link of the user */}
            <Button asChild className='w-10 h-10 rounded-full [&_svg]:size-6 bg-background hover:bg-background'>
                <Link href={user ? '/profile' : '/sign-in'}>
                    <Avatar className='w-10 h-10 bg-background' style={{ border: '1px solid hsl(240, 3.7%, 15.9%)' }}>
                        {user ? (
                            <>
                                <AvatarImage src={'https://github.com/shadcn.png'} width={cssVars.headerPx} height={cssVars.headerPx} alt={user.username} />
                                <AvatarFallback className='bg-background'><UserCircle2Icon className='text-foreground' /></AvatarFallback>
                            </>
                        ) : (
                            <AvatarFallback className='bg-background'><UserCircle2Icon className='text-foreground' /></AvatarFallback>
                        )}
                    </Avatar>
                </Link>
            </Button>
        </div>
    );
}