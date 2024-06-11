import './scss/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Categories from './pages/Categories';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import PageNotFound from './components/PageNotFound';
import ReportaNumberpage from './pages/ReportaNumberpage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './components/RequireAuth';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function App() {
    const [searchNumber, setSearchNumber] = useState('');

    const { setAuth } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = Cookies.get('jwt-auth');
                if (token) {
                    console.log('Token exists:', token);

                    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/users/currentUser`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },

                        withCredentials: true,
                    });

                    if (res.ok) {
                        const user = await res.json();
                        console.log('User data:', user);
                        const userDetails = user?.data;

                        setAuth({ userDetails, isSignedIn: true });
                    } else {
                        console.error('Failed to fetch user data:', res.statusText);
                        setAuth({ isSignedIn: false });
                    }
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.error('Error during authentication check:', error);
                setAuth({ isSignedIn: false });
            }
        };

        checkAuth();
    }, [setAuth]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Homepage setSearchNumber={setSearchNumber} />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="search" element={<Categories setSearchNumber={setSearchNumber} searchNumber={searchNumber} />} />
                <Route element={<RequireAuth allowed="user" />}>
                    <Route path="reportanumber" element={<ReportaNumberpage />} />
                    <Route path="blog" element={<Blog />} />
                </Route>

                <Route element={<RequireAuth allowed="admin" />}>
                    <Route path="search" element={<Categories setSearchNumber={setSearchNumber} searchNumber={searchNumber} />} />
                    <Route path="dashboard" element={<Admin />} />
                </Route>
            </Routes>

            <Footer />
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
