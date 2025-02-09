import React, { useState } from 'react';
import { ImageKitService } from '../../hooks/useImageKit';

const UploadImage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            const imageKitService = new ImageKitService();
            const userId = '1'; // Remplacez par l'ID utilisateur approprié
            const fileId = await imageKitService.uploadImage(file, userId);
            setMessage(fileId ? 'Image uploaded successfully!' : 'Upload failed.');
        } else {
            setMessage('Please select a file first.');
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadImage;
