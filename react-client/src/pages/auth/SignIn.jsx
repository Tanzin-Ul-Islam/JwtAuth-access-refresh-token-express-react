import React, { useContext, useState, useEffect } from 'react';
import api from "../../config/api.json";
import axios from '../../config/axios.config';
import { Link, useNavigate } from 'react-router-dom';
import SweetToast from '../../utils/sweetToast';
import { DataContext } from '../../contextApi/DataProvider';
export default function SignIn() {
    const { token, setToken, userInfo, setUserInfo } = useContext(DataContext);
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const payload = {
                email: email,
                password: password,
            }
            const url = 'http://localhost:5001' + api.auth.signIn;
            await axios.post(url, payload).then(async (response) => {
                if (response.status === 200) {
                    const data = response.data;
                    setToken(data.token);
                    const { createAt, updatedAt, ...userData } = data.user;
                    setUserInfo(userData);
                    navigate('/');
                    await SweetToast('success', response.data.message);
                }
            }).catch(async (error) => {
                await SweetToast('error', error.response.data.message);
            })
        } catch (error) {
            console.log(error);
            return;
        }
    }
    useEffect(() => {

    }, [])
    return (
        <div className="bg-blue-100 h-screen flex items-center">
            <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
                <input type="email" placeholder='email' className='block w-full p-2 mb-2 border' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='password' className='block w-full p-2 mb-2 border' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='bg-blue-500 text-white block w-full rounded-sm p-2 mb-2'>Sign In</button>
                <Link to={'/sign-up'}>Sign up here</Link>
            </form>
        </div>
    )
}
