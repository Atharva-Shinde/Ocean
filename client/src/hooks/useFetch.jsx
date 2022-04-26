import { useEffect } from "react";
import { useState } from "react";

const API_KEY = import.meta.env.GIPHY_API;

const useFetch = ({keyword}) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const {data} = await response.json();

            setGifUrl=(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
    
} 

export default useFetch;