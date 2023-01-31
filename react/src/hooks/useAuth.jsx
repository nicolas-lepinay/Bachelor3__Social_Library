// 🌌 React :
import { useState, useContext, useEffect, useMemo } from 'react'

// 🗝️ Auth Context :
import { AuthContext } from '../contexts/myAuthContext';

// Helpers functions :
import { findUserById } from '../helpers/helpers';

// 🅰️ Axios :
import axios from 'axios';

function useProvideAuth() {
    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const AUTH_ROUTE = process.env.REACT_APP_AUTH_ROUTE;
    const USERS_ROUTE = process.env.REACT_APP_USERS_ROUTE;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("library_user")) || null);
    //const [user, setUser] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    // LOGIN
    const login = async ({ identifier, password }) => {
        setLoading(true)
        try {
            const res = await axios.post(`${API_URL}${AUTH_ROUTE}`, { identifier, password });
            const data = await res.data;
            if(data.user.blocked === false) {
                let user = { ...data.user, jwt: data.jwt };
                const fullUser = await findUserById(user.id)
                user = { ...user, ...fullUser};
                setUser(user);
                localStorage.setItem("library_user", JSON.stringify(user)); // Send user to local storage
                //localStorage.setItem("library_user", JSON.stringify({ id: user.id })); // Send user's id to local storage
                setError(null);
                console.log(`CONNEXION | Connexion réussie. Bienvenue, ${user?.username}.`);
            } else {
                console.log("CONNEXION | Ce compte a été bloqué.");
                setError({ 
                    status: 403,
                    action: 'login',
                    message: "Ce compte a été bloqué.",
                })
            }
            setLoading(false);
        } catch(err) {
            console.log("CONNEXION | Une erreur est survenue lors de la tentative de connexion. | " + err);
            setError({ 
                status: err.response.status,
                action: 'login',
                message: err.response.status === 400 ? "Aucun compte correspondant n'a été trouvé." : `Oops ! Une erreur s'est produite pendant la connexion 😰\n(code d'erreur ${err.response.status}).`,
            })
        } finally {
            setLoading(false);
        }
    }

    // REGISTER
    const register = async (registerData) => {
        setLoading(true)
        try {
            const { role, ...rest} = registerData
            const res = await axios.post(`${API_URL}${AUTH_ROUTE}/register`, rest)
            const data = await res.data
            // Set user to 'Unconfirmed' and update their role :
            await axios.put(`${API_URL}${USERS_ROUTE}/${data.user.id}`, { confirmed: false, role })
            console.log(`INSCRIPTION | Le compte de ${data.user.username} a bien été créé.`)
            setSuccess({
                action: 'register', 
                message: 'Votre inscription a été prise en compte.'
            });
            setError(null);
        } catch(err) {
            console.log("INSCRIPTION | Une erreur est survenue lors de la tentative d'inscription. | " + err)
            setError({ 
                status: err.response.status,
                action: 'register',
                message: `Oops ! Une erreur s'est produite pendant l'inscription (code ${err.response.status}).`,
            })
        } finally {
            setLoading(false);
        }
    }

    // LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem("library_user");
        setLoading(false);
        setError(null);
    }

    // UPDATE USER
    const updateUser = async (updatedData) => {
        setLoading(true)
        try {
            await axios.put(`${API_URL}${USERS_ROUTE}/${user.id}`, updatedData);
            const fullUser = await axios.get(`${API_URL}${USERS_ROUTE}?filters[id]=${user.id}`); // Get all fields (avatar, role, adress, horses, etc.)
            const fullUserData = fullUser.data[0];
            setUser({ ...fullUserData});
            localStorage.setItem("library_user", JSON.stringify({ ...fullUserData}));
            setSuccess({
                action: 'update', 
                message: "L'utilisateur a été mis à jour.",
            });
            setError(null);
            console.log("MISE A JOUR | L'utilisateur a été mis à jour.")
        } catch(err) {
            setError({ 
                status: err.response.status,
                action: 'update',
                message: `Une erreur est survenue (code ${err.response.status}).`,
            })
            console.log("MISE A JOUR | Une erreur est survenue lors de la tentative de mise à jour de l'utilisateur. | " + err)
        } finally {
            setLoading(false);
        }
    }

    return { 
        user,
        loading,
        error,
        success,
        login,
        register,
        logout,
        updateUser,
    }
};

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;