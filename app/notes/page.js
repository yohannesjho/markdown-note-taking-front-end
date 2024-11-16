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
      <h1>All Notes</h1>
      <Link href="/notes/new">Create New Note</Link>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <Link href={`/notes/${note._id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
