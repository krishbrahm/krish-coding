import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { author_name, date_of_birth, author_email } = body;

        if (!author_name || !author_name.trim()) {
            return NextResponse.json({ error: 'Author name is required.' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('authors')
            .insert([
                {
                    author_name: author_name.trim(),
                    date_of_birth: date_of_birth || null,
                    author_email: author_email || null,
                }
            ])
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
