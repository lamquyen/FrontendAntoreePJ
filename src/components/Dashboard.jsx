import './Dashboard.css'
import axios from 'axios'
import Login from './Login'
import logo from '../img/logo.svg'
import SignUp from './SignUp'
import antoree from '../img/antoree.png'
import UserList from './UserList'
import User from './User'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const handleLogout = () => {

        console.log("Token khi logout:", token);  // Kiểm tra token

        if (!token) {
            console.error("Không có token, không thể logout");
            return;
        }

        axios.post('http://127.0.0.1:8000/api/users/logout', {}, {
            headers: { Authorization: `Bearer ${token}` } // Chắc chắn đúng format
        })
            .then(() => {
                localStorage.removeItem('token');
                navigate('/login');
            })
            .catch(error => {
                console.error("Lỗi khi đăng xuất:", error.response?.data || error.message);
            });
    };
    return (




        <div className="flex gap-3 ">




            <div class="h-screen w-1/5 px-3 py-4 overflow-y-auto bg-blue-100  ">
                <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5 ">
                    <img src={logo} class="w-48" alt="antoree Logo" />

                </a>
                <ul class="space-y-2 font-medium">
                    <li>
                        <Link to="/user" className="btn group flex items-center hover:text-white">
                            <svg class="shrink-0 w-7 h-7 text-gray-800 group-hover:text-white transition-colors duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd" />
                            </svg>


                            <span className="flex-1 ms-3 whitespace-nowrap">User</span>
                        </Link>
                    </li>



                    <li>
                        <Link to="/user-list" class="btn group">
                            <svg class="shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">List Users</span>
                        </Link>
                    </li>
                    {!token && (
                        <>
                            <li>
                                <Link to="/login" class="btn group">
                                    <svg class="shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Log in</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/signup" class="btn group">
                                    <svg class="shrink-0 w-5 h-5 text-black transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                                </Link>
                            </li>
                        </>
                    )}
                    {token && (
                        <li>
                            <button onClick={handleLogout} className="btn group flex items-center hover:text-white">
                                <svg
                                    className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors duration-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                                    />
                                </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                            </button>
                        </li>
                    )}
                </ul>
            </div>


            <div className=' w-[75%] flex flex-col'>
                <div className=' w-fit mb-10 self-center'><img className='w-96  h-20 overflow-auto object-cover' src={antoree} alt="" /></div>
                <Routes>
                    <Route path="/user" element={<User />} />
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>



        </div>


    )
}

export default Dashboard