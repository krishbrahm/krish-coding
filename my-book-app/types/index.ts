export interface Author {
    author_id: number;
    author_name: string;
    date_of_birth: Date;
    author_email: string;
}

export interface Book {
    book_id: number;
    title: string;
    genre: string;
    author_id: number;
    publication_year: number;
    authors: Author;
}
