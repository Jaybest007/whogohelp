import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Landing = lazy(() => import('./pages/Landing'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const WithNavbar = lazy(() => import('./layouts/WithNavbar'));
const Profile = lazy(() => import('./pages/Profile'));
const BrowseErrandsPage = lazy(() => import('./pages/BrowseErrandPage'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
