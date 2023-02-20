import { useEffect, useState } from 'react'

export const useArrayBase64 = (e) => {
    const [Images, setImages] = useState([]);
    useEffect(() => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImages((imgs) => [...imgs, reader.result]);
            }
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    }, [])
    return [Images, setImages]
}

