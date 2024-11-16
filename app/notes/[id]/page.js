'use client';  
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NoteDetails({ params: paramsPromise }) {
    const router = useRouter();  
    const [params, setParams] = useState(null);  
    const [note, setNote] = useState(null);  
    const [error, setError] = useState(null);  

     
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = await paramsPromise;
                setParams(resolvedParams);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${resolvedParams.id}`);
                if (!res.ok) throw new Error('Failed to fetch the note.');

                const data = await res.json();
                setNote(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [paramsPromise]);

    
    const handleDelete = async () => {
        try {
            if (!params) throw new Error('Invalid parameters.');

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${params.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete the note.');

            router.push('/notes');  
        } catch (err) {
            console.error(err.message);
            setError('Unable to delete the note.');
        }
    };

    
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!note) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
            <p className="mb-6">{note.content}</p>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
}
