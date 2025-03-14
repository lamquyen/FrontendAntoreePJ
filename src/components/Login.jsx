import './Dashboard.css'
import antoree from '../img/antoree.png'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/user');
        } catch (err) {
            setError('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
        }
    };


    return (
        <div className='flex flex-col items-center  '>


            <p className='text-3xl font-bold mb-5'>Đăng Nhập</p>
            {error && <p className='text-red-500'>{error}</p>}

            <form class="w-96 flex flex-col " onSubmit={handleSubmit}>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-lg font-medium text-gray-900  ">Your email</label>
                    <input type="email" id="email"
                        class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-lg font-medium text-gray-900  ">Your password</label>
                    <input type="password" id="password"
                        class="bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        autocomplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div class="flex items-start mb-5">
                    <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 ">Remember me</label>
                </div>
                <button type="submit" class="text-white w-fit self-center bg-[#14b24c] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center  ">Đăng nhập</button>
            </form>


        </div>
    )
}
export default Login;
