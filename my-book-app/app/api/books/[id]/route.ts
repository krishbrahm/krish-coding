import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Node.js backend handler for PATCH requests to /api/books/[id]
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {

        const newParams = await params;
        const bookId = newParams.id;
        console.log(newParams);
        const body = await request.json();
        const { title, genre, publication_year } = body;

        const { data, error } = await supabase
            .from('books')
            .update({ title, genre, publication_year })
            .eq('book_id', bookId)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const newParams = await params;
        const bookId = newParams.id;

        const { data, error } = await supabase
            .from('books')
            .delete()
            .eq('book_id', bookId)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json(data)
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
        
    }
}

