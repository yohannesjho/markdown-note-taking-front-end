import { notFound } from 'next/navigation';

async function fetchNoteDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${id}`);
  if (!res.ok) {
    notFound();  
  }
  return res.json();
}

export default async function NoteDetails({ params }) {
  const note = await fetchNoteDetails(params.id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
