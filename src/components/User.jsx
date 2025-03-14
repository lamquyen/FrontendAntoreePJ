
import './Dashboard.css'
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token không tồn tại!");
            return;
        }

        axios.get('http://127.0.0.1:8000/api/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);

            })
            .catch(error => {
                console.error("Lỗi khi lấy thông tin user:", error);
            });
    }, []);
    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        if (password && password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            setLoading(false);
            return;
        }

        axios.put('http://127.0.0.1:8000/api/user', { name, email, password: password ? password : undefined }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data.user);
                setEditMode(false);
                setLoading(false);
                setPassword("");
                setConfirmPassword("");
                alert("Cập nhật thành công!");
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật user:", error);
                setLoading(false);
            });
    };
    if (!user) return <p>Đang tải thông tin...</p>;
    return (
        <div className='flex flex-col justify-start ml-8 '>
            <div className='flex justify-center items-center h-fit w-fit'>
                <svg class="w-32 h-fit text-[#14b24c] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                </svg>
                <span className='text-2xl font-bold'>{user.name}</span>
            </div>
            <div className='my-7'>
                <span className=''>
                    <p className='textInUser'>Tên:</p>
                    {editMode ? (
                        <input className='infor' value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <p className='infor'>{user.name}</p>
                    )}
                </span>
                <span className=''>
                    <p className='textInUser'>Email:</p>
                    {editMode ? (
                        <input className='infor' value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                        <p className='infor'>{user.email}</p>
                    )}
                </span>
                {editMode && (
                    <>
                        <span>
                            <p className='textInUser'>Mật khẩu mới:</p>
                            <input
                                className='border p-2'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </span>
                        <span>
                            <p className='textInUser'>Xác nhận mật khẩu:</p>
                            <input
                                className='border p-2'
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </span>
                        {error && <p className="text-red-500">{error}</p>}
                    </>
                )}


                <span>
                    <p className='textInUser'>Role:</p>
                    <p className='infor'>{user.role}</p>
                </span>
            </div>
            {editMode ? (
                <button
                    className='btn w-fit bg-[#14b24c]'
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            ) : (
                <button
                    className='btn w-fit bg-[#14b24c]'
                    onClick={() => setEditMode(true)}
                >
                    Chỉnh sửa
                </button>
            )}

        </div>

    )
}
export default User;