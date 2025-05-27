import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    useEffect( ()=> {
            document.title = "Sign up - WhoGoHelp";
        }, []);    
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData(prev => ({ ...prev, [name]: value }));
        setError(prev => ({ ...prev, [name]: "" }));

        if (name === "email" && value && !emailRegex.test(value)) {
            setError(prev => ({ ...prev, email: "Invalid email address" }));
        }

        if (name === "password" && value && !passwordRegex.test(value)) {
            setError(prev => ({
                ...prev,
                password: "Password must include uppercase, lowercase, number, special character, and be at least 8 characters"
            }));
        }

        if (name === "confirmPassword" && value !== formdata.password) {
            setError(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setSuccess("");

        const { name, username, email, password, confirmPassword } = formdata;

        const newError = {
            name: name.trim() ? "" : "Name can't be empty",
            username: username.trim() ? "" : "Username can't be empty",
            email: email.trim() ? "" : "Email can't be empty",
            password: password.trim() ? "" : "Password can't be empty",
            confirmPassword: confirmPassword.trim() ? "" : "Confirm Password can't be empty"
        };

        setError(newError);

        const hasError = Object.values(newError).some(err => err !== "");
        if (hasError) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://whogohelp.free.nf/backend/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Signup successful!");
                setFormData({
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setError({});
                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                setError(prev => ({ ...prev, ...data.errors }));
            }
        } catch (err) {
            console.error(err);
            setError(prev => ({ ...prev, server: "An error occurred. Please try again later." }));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container p-5 justify-center flex items-center min-h-screen">
            <div className="wrapper rounded-2xl w-full max-w-xl bg-orange-500 p-10 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h1 className="font-bold text-4xl text-white underline mb-2">Signup</h1>
                    <p className="mb-5 text-white">Join WhoGoHelp to impact your immediate community.</p>

                    {success && <p className="text-black mb-2 italic">{success}</p>}
                    {error.server && <p className="text-black mb-2 italic">{error.server}</p>}

                    {/* Name */}
                    <label className="text-white font-bold text-lg">Name
                        <input type="text"
                            name="name"
                            className="input-style"
                            placeholder="Name"
                            value={formdata.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    {error.name && <p className="text-black italic">{error.name}</p>}

                    {/* Username */}
                    <label className="text-white font-bold text-lg">Username
                        <input
                            type="text"
                            name="username"
                            className="input-style"
                            placeholder="Username"
                            value={formdata.username}
                            onChange={handleInputChange}
                        />
                    </label>
                    {error.username && <p className="text-black italic">{error.username}</p>}

                    {/* Email */}
                    <label className="text-white font-bold text-lg">Email
                        <input
                            type="email"
                            name="email"
                            className="input-style"
                            placeholder="Email"
                            value={formdata.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    {error.email && <p className="text-black italic">{error.email}</p>}

                    {/* Password */}
                    <label className="text-white font-bold text-lg">Password
                        <input
                            type="password"
                            name="password"
                            className="input-style"
                            placeholder="Password"
                            value={formdata.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    {error.password && <p className="text-black italic">{error.password}</p>}

                    {/* Confirm Password */}
                    <label className="text-white font-bold text-lg">Confirm Password
                        <input
                            type="password"
                            name="confirmPassword"
                            className="input-style"
                            placeholder="Confirm Password"
                            value={formdata.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </label>
                    {error.confirmPassword && <p className="text-black italic">{error.confirmPassword}</p>}

                    <button
                        type="submit"
                        className="bg-black w-full text-white py-3 mt-4 rounded-xl hover:bg-gray-900 transition-colors duration-200 text-lg"
                    >
                        {loading ? (
                            <div className="flex justify-center">
                                <div className="w-6 h-6 border-4 border-white border-t-orange-600 rounded-full animate-spin"></div>
                            </div>
                        ) : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;