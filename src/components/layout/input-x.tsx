import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Booleanish } from '@/types';

type InputXPropsType = {
    pending: boolean;
    isRequired: boolean;
    inputType: React.HTMLInputTypeAttribute;
    identifier: string;
    accept?: string;
    title: string;
    placeholder?: string;
    endContent?: React.ReactElement;
    onInputValueChange?: React.ChangeEventHandler<HTMLInputElement>;
};


export default function InputX({ pending, isRequired, inputType, identifier, title, placeholder, endContent, accept, onInputValueChange }: InputXPropsType) {
    return (
        <span>
            <Label htmlFor={identifier} aria-required={String(isRequired) as Booleanish}>{title}</Label>
            <span className='flex flex-row gap-x-2'>
                <Input onChange={onInputValueChange} accept={accept} className='flex-1' type={inputType} name={identifier} placeholder={placeholder} required={isRequired} aria-readonly={String(pending) as Booleanish} readOnly={pending} />
                {endContent || <></>}
            </span>
        </span>
    );
}
