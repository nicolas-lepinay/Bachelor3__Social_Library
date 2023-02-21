import { useEffect, useState } from 'react';

// 🅰️ Axios :
import axios from 'axios';

const useFetchGenres = ({
    filters = '',
    isUnique = false,
    } = {}) => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const GENRES_ROUTE = process.env.REACT_APP_GENRES_ROUTE;

    const query = `${GENRES_ROUTE}?populate=*${filters}`;

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}${query}`);
                if(isUnique) 
                    setData(res.data[0])
                else 
                    setData(res.data.sort((a, b) => a.name.localeCompare(b.name))); // Tri alphabétique en fonction du nom
            } catch(err) {
                setError(err)
                console.log('USE FETCH GENRES | ' + err)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [query, isUnique, API_URL])

    return { 
        data,
        setData,
        loading,
        error,
    }
}

export default useFetchGenres;