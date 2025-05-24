import React from "react";
import { Link } from "react-router-dom";


function Navbar() {

    return(
        <nav className="navbar fixed w-full">
            <ul className="flex p-4 bg-orange-500 text-white items-center justify-left">
                <Link to="/" className="mx-2 text-2xl font-bold hover:bg-orange-600">WhoGoHelp</Link>
                <Link to="/Login" className="mx-1 p-1 hover:bg-orange-600">Login</Link>
                <Link to="/Signup" className="mx-1 p-1 hover:bg-orange-600">Sign Up</Link>
                <Link to="/dashboard" className="mx-1 p-1 hover:bg-orange-600">Dashboard</Link>
            
            </ul>
        </nav>
    )
}
export default Navbar;