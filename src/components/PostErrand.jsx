import React, {useState} from "react";
import { FaCheckCircle } from 'react-icons/fa';

function PostErrand(){

    const [errandData, setErrandData] = useState({
        title: "",
        description: "",
        pickUpLocation: "",
        dropOffLocation: "",
        reward: "",
        notes: "",
    })

    const [error, setError] = useState({
        title: "",
        description: "",
        pickUpLocation: "",
        dropOffLocation: "",
        reward: "",
        server: "",
        
    })
    const [success, setSuccess] =useState(false)
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
        

        const {title, description, pickUpLocation, dropOffLocation, reward, notes} = errandData;

        //let validate
        const newError ={
            title: title.trim() ? "" : "Title cant be empty",
            description: description.trim() ? "" : "Description cant be empty",
            pickUpLocation: pickUpLocation.trim() ? "" : "Pick up Location is required",
            dropOffLocation: dropOffLocation.trim() ? "" : "Drop off location is required",
            reward: reward.trim() ? "" : "Reward is required",
        }
        setError(newError)

        //let check if we have no error
        const hasError = Object.values(newError).some((err) => err !== "")

        if(hasError){
            return;
        }

        try {
            const response = await fetch("https://whogohelp.free.nf/backend/post_errand.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
                },
                credentials: "include",
                body: JSON.stringify(errandData)
            });

            const text = await response.text();
            let data = {};
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    setError((error) => ({ ...error, server: "Server returned invalid response" }));
                    setLoading(false);
                    return;
                }
            }

            if(response.ok){
                setError((error) => ({ ...error, server: "" }));
                setSuccess(data.success);
                SetPosted(true);
            } else {
                setError((error) => ({...error, server: data.error || "An error occurred"}));
                console.log(data.error);   
            }
        } catch(err){
            console.log(err);
            setError((error) => ({...error, server: "An error occurred"}))
        } finally {
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
                <h1 className="font-bold text-4xl py-2 md:text-4xl mx-2 mb-2">Have an errand?</h1>
                <p className="heading-sub text-thin md:text-lg mx-2 mb-4 text-center">
                    Post to find help with your errand
                </p>
                <p className="text-red-600 text-sm italic mt-1" >{error.server}</p>
                <form onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-4">
                      <div className="flex flex-col mb-2">
                        <label htmlFor="title" className="font-bold mb-1">Title:</label>
                        <input
                          id="title"
                          type="text"
                          name="title"
                          className="input-style focus:ring-2 focus:ring-orange-300 transition"
                          placeholder="e.g. Grocery Shopping"
                          value={errandData.title}
                          onChange={handleInput}
                          autoComplete="off"
                          required
                          minLength={3}
                          maxLength={50}
                        />
                        {error.title && (
                          <p className="text-red-600 text-sm italic mt-1">{error.title}</p>
                        )}
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="description" className="font-bold mb-1">Description:</label>
                        <input
                          id="description"
                          type="text"
                          name="description"
                          className="input-style focus:ring-2 focus:ring-orange-300 transition"
                          placeholder="Describe the errand in detail"
                          value={errandData.description}
                          onChange={handleInput}
                          autoComplete="off"
                          required
                          minLength={5}
                          maxLength={200}
                        />
                        {error.description && (
                          <p className="text-red-600 text-sm italic mt-1">{error.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="pickUpLocation" className="font-bold mb-1">Pickup from:</label>
                        <input
                          id="pickUpLocation"
                          type="text"
                          name="pickUpLocation"
                          className="input-style focus:ring-2 focus:ring-orange-300 transition"
                          placeholder="e.g. 123 Main St"
                          value={errandData.pickUpLocation}
                          onChange={handleInput}
                          autoComplete="off"
                          required
                          minLength={3}
                          maxLength={100}
                        />
                        {error.pickUpLocation && (
                          <p className="text-red-600 text-sm italic mt-1">{error.pickUpLocation}</p>
                        )}
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="dropOffLocation" className="font-bold mb-1">Drop off to:</label>
                        <input
                          id="dropOffLocation"
                          type="text"
                          name="dropOffLocation"
                          className="input-style focus:ring-2 focus:ring-orange-300 transition"
                          placeholder="e.g. 456 Market Ave"
                          value={errandData.dropOffLocation}
                          onChange={handleInput}
                          autoComplete="off"
                          required
                          minLength={3}
                          maxLength={100}
                        />
                        {error.dropOffLocation && (
                          <p className="text-red-600 text-sm italic mt-1">{error.dropOffLocation}</p>
                        )}
                      </div>
                      <div className="flex flex-col mb-2">
                        <label htmlFor="reward" className="font-bold mb-1">Reward (₦):</label>
                        <input
                          id="reward"
                          type="number"
                          name="reward"
                          className="input-style focus:ring-2 focus:ring-orange-300 transition"
                          placeholder="e.g. 2000"
                          value={errandData.reward}
                          onChange={handleInput}
                          autoComplete="off"
                          required
                          min={0}
                          step={1}
                        />
                        {error.reward && (
                          <p className="text-red-600 text-sm italic mt-1">{error.reward}</p>
                        )}
                      </div>
                    </div>
                    <label htmlFor="notes" className="font-bold mb-1">Note:</label>
                    <input
                      id="notes"
                      type="text"
                      name="notes"
                      className="input-style my-2 w-full focus:ring-2 focus:ring-orange-300 transition"
                      placeholder="(optional) Give more details about the errand "
                      value={errandData.notes}
                      onChange={handleInput}
                      autoComplete="off"
                      maxLength={200}
                    />
                    <button className="bg-black w-full text-white py-3 my-2 mb-3 rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200 text-base md:text-lg">
                        {loading ? (
                            <div className="flex justify-center items-center ">
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