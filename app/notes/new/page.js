'use client';
import React, { useState } from 'react';

export default function FormComponent() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    // Handle title change
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Handle content change
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // Handle file change
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);  // Only store the first file
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form data for submitting
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }

        try {
            // Example submission (you can modify the endpoint accordingly)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/note/new`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                // Reset form after submission
                setTitle('');
                setContent('');
                setFile(null);
            } else {
                alert('Submission failed!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex justify-center items-center">
            <div className='w-full sm:w-3/4 md:1/2'>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={handleContentChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        rows="4"
                        placeholder="Enter content"
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Upload File
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="mt-1 p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
