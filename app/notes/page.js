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
        if (!res.ok) {
          
          console.log(res)
        };
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
      <h1 className='text-center text-xl font-semibold mb-4 text-sm md:text-base lg:text-lg'>All Notes</h1>
      <div className='text-center md:text-right text-sm md:text-base lg:text-lg text-white mb-4'>
        <Link className='bg-green-500 hover:bg-green-600 duration-300 px-2 py-1 rounded-md' href="/notes/new">Create New Note</Link>
      </div>
      <ul className=' space-y-4 list-inside list-decimal  flex flex-col items-center justify-center text-sm md:text-base lg:text-lg'>
        {notes.map((note) => (
          <li className='' key={note._id}>
            <Link href={`/notes/${note._id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
