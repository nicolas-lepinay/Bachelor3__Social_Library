import { useEffect, useState } from 'react';

// 🅰️ Axios :
import axios from 'axios';

const useFetchBorrowedBooks = ({
    filters = ''
    } = {}) => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const BORROWED_BOOKS_ROUTE = process.env.REACT_APP_BORROWED_BOOKS_ROUTE;
    
    const query = `${BORROWED_BOOKS_ROUTE}?populate=*${filters}`;

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}${query}`);
                setData(res.data.data);
            } catch(err) {
                setError(err)
                console.log('USE FETCH BORROWED BOOKS | ' + err)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [query, API_URL])

    return { 
        data,
        setData,
        loading,
        error,
    }
}

export default useFetchBorrowedBooks;