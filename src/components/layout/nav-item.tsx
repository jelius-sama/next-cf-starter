"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { HomeIcon, LogInIcon, SettingsIcon, User2Icon, UserPlus2Icon } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { userAtom } from '@/components/atoms';
import { useAtomValue } from 'jotai';
import { cssVars } from '@/app.config';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NavItems() {
    const { user } = useAtomValue(userAtom);

    return (
        <div className='flex flex-col gap-y-2'>
            <NavItem href='/' title='Home' icon={<HomeIcon />} />

            {user && (
                <NavItem href='/profile' title='Profile'
                    icon={
                        <Avatar className='bg-transparent size-5'>
                            <AvatarImage className='bg-transparent' src={`${user.user_metadata.avatar_url}`} width={cssVars.headerPx} height={cssVars.headerPx} alt={user.user_metadata.user_name || "user"} />
                            <AvatarFallback className='bg-transparent'><User2Icon /></AvatarFallback>
                        </Avatar>
                    }
                />
            )}

            {!user && (
                <React.Fragment>
                    <NavItem href='/sign-in' title='Sign in' icon={<LogInIcon />} />

                    <NavItem href='/sign-up' title='Sign up' icon={<UserPlus2Icon />} />
                </React.Fragment>
            )}

            <NavItem href='/settings' title='Settings' icon={<SettingsIcon />} />
        </div>
    );
}


export function UserProfile() {
    const { user } = useAtomValue(userAtom);

    return (
        <div className='flex flex-row gap-2'>
            <Button asChild className='w-10 h-10 rounded-full  bg-background hover:bg-background'>
                <Link href={user ? '/profile' : '/sign-in'}>
                    <Avatar className='w-10 h-10 bg-background' style={{ border: '2px solid hsl(240, 3.7%, 15.9%)' }}>
                        <AvatarImage src={user ? `${user.user_metadata.avatar_url}` : undefined} width={cssVars.headerPx} height={cssVars.headerPx} alt={user ? user.user_metadata.user_name || "Profile" : "Sign in"} />
                        <AvatarFallback className='bg-background [&_svg]:size-5'><User2Icon className='text-foreground' /></AvatarFallback>
                    </Avatar>
                </Link>
            </Button>
        </div>
    );
}

export function NavItem({ href, title, icon }: { href: string; title: string; icon: React.JSX.Element; }) {
    const path = usePathname();

    return (
        <SheetClose asChild>
            <Button variant={path === href ? 'secondary' : 'outline'} asChild className='w-full justify-start'>
                <Link href={href}>
                    {icon}
                    {title}
                </Link>
            </Button>
        </SheetClose>
    );
}