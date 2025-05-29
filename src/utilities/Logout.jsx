import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Logout = () => {
    const navigate = useNavigate();

    useEffect( ()=> {
        axios.get("https://whogohelp.free.nf/backend/logout.php", {
            withCredentials: true})
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                console.error("logout failed", err);
            });
    },[]);

    return <p> Loggin out...</p>
}

export default Logout;