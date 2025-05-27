import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
 function Login(){
    useEffect( ()=> {
        document.title = "Login - WhoGoHelp";
    }, []);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate()


    function handleInputChange(event){
        
         const {name, value} = event.target;

         setLoginData({...loginData, [name]: value});
         setError("");

         if(name === "email"){
            if(value !== ""){
                if(emailRegex.test(value)){
                    setLoginData((loginData) => ({...loginData, [name]:value}))
                    setError("");
                }else{
                    setError("Invalid email")
                }
            }
        }
   
    }   


    async function handleSubmit(event){
        event.preventDefault();
        setLoading(true);
        const {email, password} = loginData;

        //validation
        if (email.trim() === "" || password.trim() === ""){
            setError("All input is required")
        }

        //checking to see if there is no more error
        if(error !== ""){
            setLoading(false)
            return;
        }

       try{ 
             
            const response = await fetch("description", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                // credentials: "include",
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok){
                setError("");
                setSuccess(data.success);
                console.log(data.success);
                navigate("/dashboard")
            } else{
                setError(data.error || "Login failed");
                console.log("login failed")
            }

        } catch(err){
            console.log(err)
            setError("An error occured")
        }finally{
            setLoading(false)
        }
        
    }

    
    


    
    return(
        <div className="container p-5 justify-center flex items-center min-h-screen ">
            <div className="wrapper rounded-2xl w-4xl h-auto bg-orange-500 p-10">
                <h1 className=" font-bold text-4xl text-white mb-5 underline underline-offset-4">Login</h1> 
                <p className='text-black text-l mb-2 italic '>{error}</p>
                <p className='text-black text-l mb-2 italic '>{success}</p>


                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="Email" className="text-white font-bold text-lg">Email address
                    <input 
                    type="email" 
                    name='email'
                    className="input-style" 
                    placeholder="Email" 
                    value={loginData.email}
                    onChange={handleInputChange}
                    />
                </label>

                <label htmlFor="Password" className="text-white font-bold text-lg">Password
                    <input 
                    type="password" 
                    name='password'
                    className="input-style" 
                    placeholder="Password" 
                    value={loginData.password}
                    onChange={handleInputChange}
                    />
                </label>
                    

                <button 
                    className="bg-black w-full text-white py-3 my-4 rounded-xl 
                    hover:bg-gray-900 cursor-pointer transition-colors duration-200 text-base md:text-lg">
                        {/* HAS LOADING SPINN */}
                        {loading ? (<div className="flex justify-center my-4">
                            <div className="w-6 h-6 border-4 border-white border-t-orange-600 rounded-full animate-spin"></div>
                        </div>) : ("Login")}

                </button>
                </form>
            </div>
        </div>
    )
}


export default Login;