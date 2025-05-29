import React from "react";
import {Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";




function Navbar() {

    return(
        <nav className="navbar fixed w-full">
            <ul className="flex p-4 bg-orange-500 text-white items-center justify-left">
                <Link to="/" className=" p-2 text-2xl font-bold hover:bg-orange-600">WhoGoHelp</Link>
                <Link to="/Login" className=" p-2 hover:bg-orange-600">Login</Link>
                <Link to="/Signup" className=" p-2 hover:bg-orange-600">Sign Up</Link>
                <Link to="/dashboard" className=" p-2 hover:bg-orange-600">Dashboard</Link>
                <Link to="/Logout"  className=" p-2 hover:bg-orange-600"><FaPowerOff /></Link>
                
            
            </ul>
        </nav>
    )
}
export default Navbar;