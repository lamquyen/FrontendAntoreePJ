import './Dashboard.css'
import { useEffect, useState } from "react";
import axios from "axios";


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null); // ID của user đang chỉnh sửa
    const [editData, setEditData] = useState({}); // D

    const token = localStorage.getItem("token")
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await axios.get(`${API_URL}/users/getUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token để xác thực
                    },
                });

                setUsers(response.data.data); // Cập nhật danh sách user
                setLoading(false);
            } catch (err) {
                setError("Bạn không có quyền truy cập!");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingId(user.id);
        setEditData({ name: user.name, email: user.email, role: user.role });
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async (id) => {
        try {
            console.log("Dữ liệu gửi lên API:", editData);


            const response = await axios.put(`${API_URL}/users/${id}`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Phản hồi từ API:", response.data); // Kiểm tra API trả về gì
            setUsers(users.map(user => user.id === id ? { ...user, ...editData } : user));
            setEditingId(null);
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error.response?.data || error.message);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa user này không?")) return;

        try {
            ;
            await axios.delete(`${API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Cập nhật danh sách user sau khi xóa
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error.response?.data || error.message);
        }
    };


    if (loading) return <p>Đang tải danh sách người dùng...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return (<>


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-black">
                <thead class="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-[#14b24c] dark:text-dark">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-lg odd:bg-white even:bg-gray-50 border-b border-gray-200">
                            <td className="px-6 py-4 font-medium text-black">
                                {editingId === user.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleInputChange}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editingId === user.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        className="border px-2 py-1 w-full"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {editingId === user.id ? (
                                    <select
                                        name="role"
                                        value={editData.role}
                                        onChange={handleInputChange}
                                        className="border px-2 py-1 w-full"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                {editingId === user.id ? (
                                    <button
                                        onClick={() => handleSave(user.id)}
                                        className="font-medium text-green-600 hover:underline"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => handleDelete(user.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    </>
    )
}
export default UserList