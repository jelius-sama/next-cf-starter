import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/server/supabase/edge';

export const createMiddlewareClient = (request: NextRequest) => {
    // Create an unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient();

    return { supabase, response };
};