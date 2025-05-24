import { FaCheckCircle } from 'react-icons/fa';
import ProfilePic from '../assets/profile_pic.jpg'
import BottomNav from '../components/BottomNav';

function Profile() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-600 py-10 px-2">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-10">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                    <img
                        src={ProfilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-orange-400 shadow-lg object-cover"
                    />
                    <div className="flex flex-col items-center sm:items-start w-full">
                        <h1 className="text-2xl font-bold text-orange-600 mb-1 flex items-center gap-2">
                            Jibola
                            <FaCheckCircle title="verified" className="text-green-500 text-lg" />
                        </h1>
                        <p className="text-gray-600 text-sm text-center sm:text-left">
                    <span className="font-normal text-gray-700">
                        Hi, I’m Jibola, a trusted community member based in Lekki, Lagos. I enjoy helping others by running errands and making timely deliveries around the city. My experience includes delivering clothes at Ojota and food to Ikoyi. I’m always ready to assist and make life easier for those around me.
                    </span>
                    </p>
                    </div>
                </div>
                <ul className="mb-8 space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-orange-500">Email:</span>
                        <span className="truncate">jay@gmail.com</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-orange-500">Phone:</span>
                        <span>07030828856</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="font-semibold text-orange-500">Location:</span>
                        <span>Lekki, Lagos</span>
                    </li>
                </ul>
                <div>
                    <p className="font-semibold text-lg text-orange-600 mb-2">Task history:</p>
                    <ul className="space-y-2">
                        <li className="bg-orange-100 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
                            <span className="text-orange-500 font-semibold">12/07/2025:</span>
                            <span className="text-gray-700">Delivered clothes at Ojota</span>
                        </li>
                        <li className="bg-orange-100 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
                            <span className="text-orange-500 font-semibold">03/09/2025:</span>
                            <span className="text-gray-700">Delivered Food to Ikoyi</span>
                        </li>
                        <li className="bg-orange-100 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
                            <span className="text-orange-500 font-semibold">12/07/2025:</span>
                            <span className="text-gray-700">Delivered clothes at Ojota</span>
                        </li>
                    </ul>
                </div>
            </div>

            <BottomNav/>
        </div>
    )
}

export default Profile;