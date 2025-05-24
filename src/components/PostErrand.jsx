import React, {useState} from "react";

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
        
    })

    function handleInput(event){
        const {name, value} = event.target;

        setErrandData({...errandData, [name]:value})
        setError({...error, [name]:""})
    }
    
    function handleSubmit(event){
        event.preventDefault()

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

    }
    return(
         <div className="bodyContainer rounded-xl p-3 md:p-2 bg-orange-500 text-white flex flex-col items-center justify-center shadow-lg">
                <h1 className="font-bold text-3xl md:text-3xl mx-2 mb-2">Have an errand?</h1>
                <p className="heading-sub text-thin md:text-lg mx-2 mb-4 text-center">
                    Post to find help with your errand
                </p>
                <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-2">
                        <input type="text" name="title" className="input-style mb-2 md:mb-0" placeholder="Title" value={errandData.title} onChange={handleInput} />
                    {/* <p className='text-black text-l mb-2 italic '>{error.title}</p> */}
                        
                        <input type="text" name="description" className="input-style mb-2 md:mb-0" placeholder="Description" value={errandData.description} onChange={handleInput}  />
                    {/* <p className='text-black text-l mb-2 italic '>{error.description}</p> */}
                        
                        <input type="text" name="location" className="input-style mb-2 md:mb-0" placeholder="Location" value={errandData.location} onChange={handleInput} />
                    {/* <p className='text-black text-l mb-2 italic '>{error.location}</p> */}
                        
                        <input type="number" name="reward" className="input-style mb-2 md:mb-0" placeholder="Reward" value={errandData.reward} onChange={handleInput} />
                    {/* <p className='text-black text-l mb-2 italic '>{error.reward}</p> */}
                    
                    
                    </div>
                    <input type="text" name="notes" className="input-style my-2 w-full" placeholder="Give me more details about the errand" value={errandData.notes} onChange={handleInput} />
                    
                    <button className="bg-black w-full text-white py-3 my-2 mb-3 rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200 text-base md:text-lg">
                        Post Errand
                    </button>
                </form>
            </div> 
    )

}

export default PostErrand;