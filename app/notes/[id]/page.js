'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NoteDetails({ params: paramsPromise }) {
    const router = useRouter();
    const [params, setParams] = useState(null);
    const [note, setNote] = useState(null);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [toggle, setToggle] = useState(false)

    // Resolve params and fetch note details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = await paramsPromise;
                setParams(resolvedParams);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${resolvedParams.id}`);
                if (!res.ok) throw new Error('Failed to fetch the note.');

                const data = await res.json();
                setNote(data);
                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [paramsPromise]);

    // Handle update of the note
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            if (!params) throw new Error('Invalid parameters.');

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) throw new Error('Failed to update the note.');

            const updatedNote = await res.json();
            setNote(updatedNote); // Update local note state

            router.push(`/notes/${updatedNote._id}`); // Navigate to the updated note's page
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
    };

    // Handle deletion of the note
    const handleDelete = async () => {
        try {
            if (!params) throw new Error('Invalid parameters.');

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/${params.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete the note.');

            router.push('/notes'); // Redirect to notes list after deletion
        } catch (err) {
            console.error(err.message);
            setError('Unable to delete the note.');
        }
    };


    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!note) return <div>Loading...</div>;

    return (
        <div className="p-4 flex justify-center items-center">
            <div className='w-full sm:w-3/4 md:w-1/2'>
                <form onSubmit={handleUpdate} className={`mb-6 ${toggle ? 'block' : 'hidden'}`}>
                    <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
                    <div className="mb-4">
                        <label className="block text-lg" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="6"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Note
                    </button>
                </form>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Preview:</h2>
                    <p>{note.title}</p>
                    <p className="text-lg mt-2">{note.content}</p>
                </div>

                <button
                    onClick={handleDelete}
                    className={`${toggle?'hidden':'inline'} bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600`}
                >
                    Delete Note
                </button>
                <button onClick={() => setToggle(!toggle)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-4">
                    {toggle? "Close":"Edit"}
                </button>
            </div>
        </div>
    );
}
