'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch notes');
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.log(err)
        setError(err.message);
      }
    }
    fetchNotes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className='text-center text-xl font-semibold'>All Notes</h1>
      <Link className='bg-green-500 hover:bg-green-600 hover:text-white duration-300 px-2 py-1 rounded-md  text-lg' href="/notes/new">Create New Note</Link>
      <ul className=' space-y-4 list-inside list-decimal  flex flex-col items-center justify-center'>
        {notes.map((note) => (
          <li className='' key={note._id}>
            <Link href={`/notes/${note._id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
