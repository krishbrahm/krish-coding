import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 🔍 GET Handler: Fetches books for initial page load
// Inside app/api/books/route.ts -> Replace your GET function with this:
export async function GET() {
    try {
        // Query both tables concurrently to save network latency
        const [booksResult, authorsResult] = await Promise.all([
            supabase.from('books').select(`
        book_id,
        title,
        genre,
        author_id,
        publication_year,
        authors (
          author_id,
          author_name
        )
      `),
            // Fetch ALL rows from the authors table, sorted alphabetically
            supabase.from('authors').select('author_id, author_name').order('author_name', { ascending: true })
        ]);

        if (booksResult.error) return NextResponse.json({ error: booksResult.error.message }, { status: 500 });
        if (authorsResult.error) return NextResponse.json({ error: authorsResult.error.message }, { status: 500 });

        // Pack both tables together into a single JSON package response bundle
        return NextResponse.json({
            books: booksResult.data,
            authors: authorsResult.data
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const newBooksArray = await request.json();

        // Clean up payloads: remove the virtual '-1' IDs and joined objects
        const cleanedPayload = newBooksArray.map(({ book_id, authors, ...rest }: any) => ({
            ...rest,
            title: rest.title || '',
            genre: rest.genre || '',
        }));

        // Batch insert into Supabase
        const { data, error } = await supabase
            .from('books')
            .insert(cleanedPayload)
            .select('book_id, title, genre, author_id, publication_year, authors(author_id, author_name)');

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
