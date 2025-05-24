import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import WithNavbar from './layouts/WithNavbar';
import Profile from './pages/Profile';
import BrowseErrandsPage from './pages/BrowseErrandPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes with Navbar */}
                <Route element={<WithNavbar />}>
                    <Route path='/' element={<Landing />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/errands' element={<BrowseErrandsPage />} />
                    {/* Add more routes here that need the navbar */}
                </Route>

                {/* Pages with no navbar */}
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
