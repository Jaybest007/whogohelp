import react, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Signup(){

    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        server: "",
    });
    const [success, setSuccess] = useState("");
    const [loading , setLoading] = useState(false);

    function handleInputChange(event){
        const {name, value} = event.target;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
        setFormData((formdata) => ({...formdata, [name]:value}));
        setError((error) => ({...error, [name]: ""}));

        
        if(name === "email"){
            if(value !== ""){
                if(emailRegex.test(value)){
                    setFormData((formdata) => ({...formdata, [name]:value}))
                    setError((error) => ({...error, [name]: ""}));
                }else{
                    setError((err)=>({...error, [name]: "Invalid email"}))
                }
            }
        }

        //not working well
        // const updatedData = {...formdata, [name]: value}
        if(name === "password"){
            if(value !== ""){
                if(passwordRegex.test(value)){
                    setError({...error, [name]: ""})
                    setFormData({...formdata, [name]:value})
                }else{
                    setError((prevError) => ({...prevError, [name]: "Password must consit of text, number,specialcharacter and must be 8digit longs"}));
                }
            }
        }
        
        const pass = formdata.password
        if(name === "confirmPassword"){
            if(value !== ""){
                if(pass !== value){
                    setError({...error, [name]: "Password does not match"})
                }else{
                    setFormData({...formdata, [name]:value})
                    setError({...error, [name]: ""})
                }
            }
        }
    }


    //handle submit logic
    async function handleSubmit(event){
        event.preventDefault();
        setLoading(true)
        const {name, username, email, password, confirmPassword} = formdata;

        //let validate for error
        const newError = {
            name: name.trim() ? "" : "Name can't be empty ***",
            username: username.trim() ? "" : "Username can't be empty ***",
            email: email.trim() ? "" : "Email cant be empty ***",
            password: password.trim() ? "" : "Password can't be empty ***",
            confirmPassword: confirmPassword.trim() ? "" : "Confrim password can't be empty ***",        }
        setError(newError)

        // let check if there is no error
        const hasError = Object.values(newError).some((err) => err !== "")

        if (hasError){
            return;
        }

        try{
            const response = await fetch("https://d963-197-210-226-35.ngrok-free.app/back/signup.php" ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata),
            });

            const data = await response.json();

            if(response.ok){
                setSuccess(data.success)
                setError({
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                server: "",
                });
                navigate("/dashboard");
            }else{
                setError(prev => ({
                    ...prev, ...data.errors 
                }));
                // console.log("CONNECTION CANNOT BE REACHED TO THE BACKEND")
            }
        }catch (err) {
            console.error(err);
            setError((prev) => ({...prev, server: "An error occurred. Please try again."}));
        }finally{
            setLoading(false)
        }  
    }
    return (
        
        <div className="container p-5 justify-center flex items-center min-h-screen">
            <div className="wrapper rounded-2xl w-4xl h-auto bg-orange-500 p-10 shadow-lg">
                <form action="" onSubmit={handleSubmit}>
                    <h1 className=" font-bold text-4xl text-white underline underline-offset-4 mb-2">Signup</h1> 
                    <p className="mb-5 text-white">Join WhoGoHelp platform to help and impact your imediate community.</p>

                    <p className='text-black text-l mb-2 italic '>{success}</p>
                    <p className='text-black text-l mb-2 italic '>{error.server}</p>

                    <label htmlFor="name" className="text-white font-bold text-lg ">Name
                        <input 
                        type="text" 
                        name='name' 
                        className="input-style" 
                        placeholder="Name"
                        value={formdata.name}
                        onChange={handleInputChange}
                        />
                    </label>
                    <p className='text-black text-l mb-2 italic '>{error.name}</p>

                    <label htmlFor="Username" className="text-white font-bold text-lg"> Username
                    <input 
                        type="text" 
                        name='username' 
                        className="input-style" 
                        placeholder="Username" 
                        value={formdata.username}
                        onChange={handleInputChange}
                        />
                        
                    </label>
                    <p className='text-black text-l mb-2 italic '>{error.username}</p>

                    <label htmlFor="Email" className="text-white font-bold text-lg">Email address
                        <input type="email" 
                        name='email' 
                        className="input-style" 
                        placeholder="Email" 
                        value={formdata.email}
                        onChange={handleInputChange}
                        />
                        
                    </label>
                    <p className='text-black text-l mb-2 italic '>{error.email}</p>

                    <label htmlFor="Password" className="text-white font-bold text-lg">Password
                        <input 
                        type="password" 
                        name='password' 
                        className="input-style" 
                        placeholder="Password" 
                        value={formdata.password}
                        onChange={handleInputChange}
                        />
                    </label>
                        <p className='text-black text-l mb-2 italic '>{error.password}</p>

                    <label htmlFor="confirmpassword" className="text-white font-bold text-lg">Confirm password
                        <input 
                        type="password" 
                        name='confirmPassword'
                        className="input-style" 
                        placeholder="Confirm Password" 
                        value={formdata.confirmPassword}
                        onChange={handleInputChange}
                        />
                    </label>
                        <p className='text-black text-l mb-2 italic '>{error.confirmPassword}</p>

                    
                    <button className="bg-black w-full text-white py-3 my-2 rounded-xl hover:bg-gray-900 cursor-pointer transition-colors duration-200 text-base md:text-lg">
                       {loading ? (<div className="flex justify-center my-4">
                        <div className="w-6 h-6 border-4 border-white border-t-orange-600 rounded-full animate-spin"></div>
                    </div>) : ("Signup")}
                        
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Signup