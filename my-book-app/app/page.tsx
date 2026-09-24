'use client';

import { useEffect, useState } from 'react';
import { Book } from '@/types';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [authors, setAuthors] = useState<any[]>([]); // 🌟 ADD THIS: State to store ALL database authors

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAuthorFormData, setNewAuthorFormData] = useState({
    author_name: '',
    date_of_birth: '',
    author_email: ''
  });


  const hasNewRow = books.some(book => book.book_id === -1);


  // 1. Fetch initial data from our Node.js GET API
  useEffect(() => {
    async function fetchBooksAndAuthors() {
      try {
        setLoading(true);
        const response = await fetch('/api/books');
        if (!response.ok) throw new Error('Failed to fetch data from API');

        const payload = await response.json(); // Unpacks the { books, authors } object bundle

        setBooks(payload.books);   // Stores book layout rows
        setAuthors(payload.authors); // 🌟 STORES ALL AUTHORS (Even unpublished ones!)
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchBooksAndAuthors();
  }, []);


  // 2. Handle typing in the input boxes (updates local UI state instantly)
  const handleCellChange = (bookId: number, field: keyof Book, value: any) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.book_id === bookId ? { ...book, [field]: value } : book
      )
    );
  };

  // 3. The Action Toggle Handler (Triggers local row addition OR bulk save)
  const handleHeaderAction = async () => {
    if (!hasNewRow) {
      // SCENARIO A: No active virtual row, so add one locally instantly
      const fallbackId = authors[0]?.author_id || 1;
      const fallbackName = authors[0]?.author_name || '';

      const virtualNewBook: Book = {
        book_id: -1, // Flag for virtual new rows
        title: '',
        genre: '',
        publication_year: 0,
        author_id: fallbackId, // Default author allocation
        authors: {
          author_id: fallbackId,
          author_name: fallbackName,
          date_of_birth: new Date(),
          author_email: ''
        }
      };
      setBooks((prevBooks) => [...prevBooks, virtualNewBook]);
    } else {
      // SCENARIO B: A virtual row exists, acting as a "Save" action!
      const newRowsToSave = books.filter((book) => book.book_id === -1);

      // Validation safeguard: Don't let them hit save if title is completely empty
      if (newRowsToSave.some(b => !b.title.trim())) {
        alert("Please enter a title before saving your new book!");
        return;
      }

      try {
        setIsSaving(true);
        const response = await fetch('/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRowsToSave),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save new records');
        }

        const savedBooks = await response.json(); // Array of saved items back from DB

        // Remove the temporary virtual row and replace it with real database rows
        setBooks((prevBooks) => {
          const existingOnes = prevBooks.filter((book) => book.book_id !== -1);
          return [...existingOnes, ...savedBooks];
        });

        alert('New book added successfully!');
      } catch (err: any) {
        alert(`Creation Error: ${err.message}`);
      } finally {
        setIsSaving(false);
      }
    }
  };

  // 4. Delete row handler
  const handleRowDelete = async (bookId: number) => {
    if (bookId === -1) {
      // Cancel Action: If it hasn't been saved to DB yet, just drop it from UI state
      setBooks((prevBooks) => prevBooks.filter((b) => b.book_id !== -1));
      return;
    }
    try {
      setIsSaving(true);
      const response = await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete record');
      setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== bookId));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Add this submit handler:
  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorFormData.author_name.trim()) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/books', { // or your corresponding authors POST endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAuthorFormData),
      });

      if (!response.ok) throw new Error('Failed to create author');
      const newlyCreatedAuthor = await response.json(); // Assumes server returns the fresh author object

      // 🌟 ADD THIS LINE: Push the new author onto your state list instantly!
      setAuthors((prevAuthors) => [...prevAuthors, newlyCreatedAuthor].sort((a, b) => a.author_name.localeCompare(b.author_name)));

      alert('Author created successfully!');
      setNewAuthorFormData({ author_name: '', date_of_birth: '', author_email: '' });
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Author Creation Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Loading library catalog...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📚 Library Catalog</h1>

          {/* Add this button element right here: */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            👤 Add New Author
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700 tracking-wider">
              <tr>
                <th className="px-6 py-4">Book Title</th>
                <th className="px-6 py-4">Genre</th>
                <th className="px-6 py-4">Publication Year</th>
                <th className="px-6 py-4">Author</th>
                {/* DYNAMIC ICON CONTROL CELL */}
                <th
                  className={`px-6 py-4 text-center cursor-pointer text-xl select-none transition-all duration-200 ${hasNewRow
                    ? 'bg-blue-600 text-white hover:bg-blue-700 font-bold'
                    : 'bg-gray-200/50 text-green-600 hover:bg-gray-200 hover:text-green-800'
                    }`}
                  onClick={handleHeaderAction}
                  title={hasNewRow ? "Save New Entries" : "Add Row"}
                >
                  {isSaving ? '⏳' : hasNewRow ? '💾 SAVE' : '➕'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.book_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      defaultValue={book.title || ''}
                      disabled={book.book_id !== -1} // Read-only for old rows, writeable for new ones
                      onBlur={(e) => handleCellChange(book.book_id, 'title', e.target.value)}
                      className={`w-full bg-transparent border-0 border-b border-transparent p-1 text-gray-900 ${book.book_id === -1 ? 'hover:border-gray-300 focus:border-blue-500' : 'cursor-default focus:ring-0'
                        }`}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      defaultValue={book.genre || ''}
                      disabled={book.book_id !== -1}
                      onBlur={(e) => handleCellChange(book.book_id, 'genre', e.target.value)}
                      className={`w-full bg-transparent border-0 border-b border-transparent p-1 text-gray-700 ${book.book_id === -1 ? 'hover:border-gray-300 focus:border-blue-500' : 'cursor-default focus:ring-0'
                        }`}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      defaultValue={book.publication_year || ''}
                      disabled={book.book_id !== -1}
                      onBlur={(e) => handleCellChange(book.book_id, 'publication_year', e.target.value ? parseInt(e.target.value, 10) : null)}
                      className={`w-full bg-transparent border-0 border-b border-transparent p-1 text-gray-700 ${book.book_id === -1 ? 'hover:border-gray-300 focus:border-blue-500' : 'cursor-default focus:ring-0'
                        }`}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <select
                      defaultValue={book.author_id || 1}
                      disabled={book.book_id !== -1}
                      onBlur={(e) => handleCellChange(book.book_id, 'author_id', parseInt(e.target.value, 10))}
                      className="..."
                    >
                      {/* 🌟 Change dynamicAuthors.map to authors.map */}
                      {authors.map((author) => (
                        <option key={author.author_id} value={author.author_id}>
                          {author.author_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleRowDelete(book.book_id)}
                      className="hover:scale-125 transition-transform text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add this code block at the absolute end of your JSX return layout: */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-xl font-bold text-gray-900 mb-4">👤 Create New Author</h2>

            <form onSubmit={handleAuthorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  defaultValue={newAuthorFormData.author_name}
                  onBlur={(e) => setNewAuthorFormData({ ...newAuthorFormData, author_name: e.target.value })}
                  placeholder="e.g., J.K. Rowling"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Date of Birth</label>
                <input
                  type="date"
                  defaultValue={newAuthorFormData.date_of_birth}
                  onBlur={(e) => setNewAuthorFormData({ ...newAuthorFormData, date_of_birth: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Author Email</label>
                <input
                  type="email"
                  defaultValue={newAuthorFormData.author_email}
                  onBlur={(e) => setNewAuthorFormData({ ...newAuthorFormData, author_email: e.target.value })}
                  placeholder="name@author.com"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition"
                >
                  Create Author
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}