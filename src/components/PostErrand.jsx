import React, {useState} from "react";
import { FaCheckCircle } from 'react-icons/fa';

function PostErrand(){

    const [errandData, setErrandData] = useState({
        title: "",
        description: "",
        location: "",
        reward: "",
        notes: "",
    })

    const [error, setError] = useState({
        title: "",
        description: "",
        location: "",
        reward: "",
        server: "",
        
    })
    const [posted, SetPosted] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleInput(event){
        const {name, value} = event.target;

        setErrandData({...errandData, [name]:value})
        setError({...error, [name]:""})
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        setLoading(true)
        

        const {title, description, location, reward, notes} = errandData;

        //let validate
        const newError ={
            title: title.trim() ? "" : "Title cant be empty",
            description: description.trim() ? "" : "Description cant be empty",
            location: location.trim() ? "" : "Location is required",
            reward: reward.trim() ? "" : "Reward is required",
        }
        setError(newError)

        //let check if we have no error
        const hasError = Object.values(newError).some((err) => err !== "")

        if(hasError){
            return;
        }

        try{
            
            const response = await fetch("https://whogohelp-backend.onrender.com/backend/post_errand.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
                },
                body: JSON.stringify(errandData)
            });

            const data = await response.json();

            if(response.ok){
                setError((error) => ({ ...error, server: "" }));
                SetPosted(true);

            }else{
                setError((error) => ({...error, server: data.error}));
                console.log(data.error);   
            }
        }catch(err){
            console.log(err);
            setError((error) => ({...error, server: "An error occured"}))
            
        }finally{
                setLoading(false);
                
            }



    }
    return(
         <div className="bodyContainer rounded-xl p-3 md:p-2 bg-orange-500 text-white flex flex-col items-center justify-center shadow-lg">
        
        {posted ? (
            <div className="w-full text-white text-center flex flex-col justify-center items-center my-10">
                <FaCheckCircle className="text-7xl mb-4 mx-auto" />
                <h1 className="text-2xl md:text-3xl font-semibold">Your Errand has been posted successfully</h1>
            </div>
        ) : ( 
            <>
                <h1 className="font-bold text-3xl md:text-3xl mx-2 mb-2">Have an errand?</h1>
                <p className="heading-sub text-thin md:text-lg mx-2 mb-4 text-center">
                    Post to find help with your errand
                </p>
                <p className="text-red-600 text-sm italic mt-1" >{error.server}</p>
                <form onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-4">
                        <div className="flex flex-col mb-2">
                            <input
                                type="text"
                                name="title"
                                className="input-style"
                                placeholder="Title"
                                value={errandData.title}
                                onChange={handleInput}
                            />
                            {error.title && (
                                <p className="text-red-600 text-sm italic mt-1">{error.title}</p>
                            )}
                        </div>
                        <div className="flex flex-col mb-2">
                            <input
                                type="text"
                                name="description"
                                className="input-style"
                                placeholder="Description"
                                value={errandData.description}
                                onChange={handleInput}
                            />
                            {error.description && (
                                <p className="text-red-600 text-sm italic mt-1">{error.description}</p>
                            )}
                        </div>
                        <div className="flex flex-col mb-2">
                            <input
                                type="text"
                                name="location"
                                className="input-style"
                                placeholder="Location"
                                value={errandData.location}
                                onChange={handleInput}
                            />
                            {error.location && (
                                <p className="text-red-600 text-sm italic mt-1">{error.location}</p>
                            )}
                        </div>
                        <div className="flex flex-col mb-2">
                            <input
                                type="number"
                                name="reward"
                                className="input-style"
                                placeholder="Reward"
                                value={errandData.reward}
                                onChange={handleInput}
                            />
                            {error.reward && (
                                <p className="text-red-600 text-sm italic mt-1">{error.reward}</p>
                            )}
                        </div>
                    </div>
                    <input
                        type="text"
                        name="notes"
                        className="input-style my-2 w-full"
                        placeholder="Give me more details about the errand"
                        value={errandData.notes}
                        onChange={handleInput}
                    />
                    <button className="bg-black w-full text-white py-3 my-2 mb-3 rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200 text-base md:text-lg">
                        {loading ? (
                            <div className="flex justify-center items-center my-2">
                                <div className="w-8 h-8 border-4 border-white border-t-orange-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Post Errand"
                        )}
                    </button>
                </form>
            </>
        )}
    </div> 
    )

}

export default PostErrand;