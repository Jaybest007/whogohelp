import PostErrand from '../components/PostErrand';
import {FaMapMarkerAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';


function LandingPage(){

    return (
        <div className="container p-5 flex flex-col max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            <div className="upper my-12 md:my-16 p-2 block">
                <h1 className="heading-text text-4xl md:text-5xl font-bold">WhoGoHelp?</h1>
                <p className="heading-sub text-base md:text-lg font-medium mt-2">
                    You want to connect to people within the same locality who
                    need help with errands (e.g., buying items, delivery, queueing) with others willing to assist for a
                    small fee or community credit
                </p>
                <Link to="/login" >
                <button className="bg-orange-500 cursor-pointer text-white px-8 py-3 my-4 rounded-md  hover:bg-orange-600 transition-colors duration-200 text-base md:text-lg">
                     Get Started
                </button>
                </Link>
            </div>
            <PostErrand/>
            
        </div>
    )
}

export default LandingPage;