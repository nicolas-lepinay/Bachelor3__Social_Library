import { useEffect, useState } from 'react';

// 🅰️ Axios :
import axios from 'axios';

const useFetchBooks = ({
    filters = '',
    isUnique = false,
    } = {}) => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const BOOKS_ROUTE = process.env.REACT_APP_BOOKS_ROUTE;

    const query = `${BOOKS_ROUTE}?populate=*${filters}`;

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}${query}`);
                if(isUnique) {
                    setData(res.data.data[0])
                }
                else {
                    setData(res.data.data.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))); // Tri alphabétique en fonction du titre
                }
            } catch(err) {
                setError(err)
                console.log('USE FETCH BOOKS | ' + err)
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

export default useFetchBooks;