"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function AuthInput({ context }: { context: "sign-in" | "sign-up"; }) {
    const { pending } = useFormStatus();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    return (
        <>
            <span>
                <Label htmlFor="email" aria-required="true">Email</Label>
                <Input type="email" name="email" placeholder="Email" required={true} readOnly={pending} />
            </span>

            <span>
                <Label htmlFor="password" aria-required="true">Password</Label>
                <span className='flex flex-row gap-x-2'>
                    <Input className='flex-1' type={!showPassword ? "password" : "text"} name="password" placeholder="Password" required={true} readOnly={pending} />
                    <Button onClick={() => setShowPassword(!showPassword)} type='button' size={'icon'} className='rounded-full' variant={'outline'}>
                        {!showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </Button>
                </span>
            </span>

            {context === "sign-up" && (
                <>
                    <span>
                        <Label htmlFor="confirm-password" aria-required="true">Confirm password</Label>
                        <span className='flex flex-row gap-x-2'>
                            <Input className='flex-1' type={!showConfirmPassword ? "password" : "text"} name="confirm-password" placeholder="Confirm password" required={true} readOnly={pending} />
                            <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)} type='button' size={'icon'} className='rounded-full' variant={'outline'}>
                                {!showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </Button>
                        </span>
                    </span>

                    <span>
                        <Label htmlFor="username" aria-required="true">Username</Label>
                        <Input type="username" name="username" placeholder="Username" required={true} readOnly={pending} />
                    </span>
                </>
            )}
        </>
    );
}
