import { notFound } from 'next/navigation';

async function fetchNoteDetails(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${id}`);
  if (!res.ok) {
    notFound();  
  }
  console.log(res)
  return res.json();
}

export default async function NoteDetails({ params }) {
  const { id } = await params
  const note = await fetchNoteDetails(id);
  
  return (
    <div>   
      <h1 className='text-lg'>Title:-{note.title}</h1>
      <p>Content:-{note.content}</p>
    </div>
  );
}

