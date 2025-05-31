import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPowerOff, FaBars } from "react-icons/fa";
import axios from "axios";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect ( () => {

        axios.get('https://whogohelp.free.nf/backend/user_session.php', {
            withCredentials: true
        })
        .then ( response => {
            setLoggedIn(response.data.loggedIn);
        })
        .catch (err => {
            console.log(err)
        }) 

    },[]);

    return (
        <nav className="navbar fixed w-full bg-orange-500 text-white z-50">
            <div className="flex items-center justify-between p-2">
                <Link to="/" className="text-2xl font-bold hover:bg-orange-600 p-2 rounded">
                    WhoGoHelp
                </Link>
                {/* Hamburger menu for mobile */}
                <button
                    className="md:hidden p-2 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <FaBars size={24} />
                </button>
                {/* Desktop menu */}
                <ul className="hidden md:flex space-x-2 items-center">
                    {!loggedIn ? (
                        <>
                            <li>
                                <Link to="/dashboard" className="block p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/Logout" className="block p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>
                                    <FaPowerOff />
                                </Link>
                            </li>
                        </>
) : (
                        <>
                            <li>
                                <Link to="/Login" className="block p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>Login</Link>
                            </li>
                            <li>
                                <Link to="/Signup" className="p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                            </li>
                        </>
)}                             
                </ul>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col bg-orange-500 px-4 pb-4 space-y-2">
                   
                   {loggedIn ? (
                        <>
                            <li>
                                <Link to="/dashboard" className="block p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/Logout" className="block p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>
                                    <FaPowerOff />
                                </Link>
                            </li>
                        </>
) : (
                        <>
                            <li>
                                <Link to="/Login" className="block p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>Login</Link>
                            </li>
                            <li>
                                <Link to="/Signup" className="p-2 hover:bg-orange-600 rounded" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                            </li>
                        </>
)}               
                </ul>
            )}
        </nav>
    );
}

export default Navbar;