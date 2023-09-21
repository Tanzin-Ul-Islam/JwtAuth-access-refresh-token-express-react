import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../contextApi/DataProvider';
import axios from '../config/axios.config';
import api from '../config/api.json';
import Loader from './Loader';
import jwt_decode from "jwt-decode";
import SweetToast from '../utils/sweetToast';
import { useNavigate } from 'react-router-dom';
export default function InitAuth() {
    const { token, setToken, userInfo, setUserInfo } = useContext(DataContext);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    async function getUserInfo() {
        try {
            await axios.get(api.user.profile, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.statusCode == 200) {
                    const { createAt, updatedAt, ...userData } = response.data.data;
                    console.log(userData)
                    setUserInfo(userData);
                }
            })
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function regenerateAccessToken() {
        try {
            await axios.get(api.auth.regenerateAccessToken).then((response) => {
                if (response.data.statusCode == 200) {
                    const accessToken = response.data.token;
                    setToken(accessToken);
                }
            }).catch((error) => {
                navigate('/sign-in');
                return;
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function regenerateAccessTokenAtExpire() {
        try {
            if (!token) {
                return;
            }
            const decodeAuthToken = jwt_decode(token);
            const tokenExp = decodeAuthToken.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            const tokenExpiredTime = tokenExp - currentTime;
            const newRequstTime = (tokenExpiredTime * 1000);
            setTimeout(async () => {
                await regenerateAccessToken();
            }, newRequstTime)
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function init() {
        try {
            setShowLoader(true);
            await regenerateAccessToken();
        } catch (error) {
            console.log(error);
            return;
        } finally {
            setShowLoader(false)
        }

    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (token) {
            getUserInfo();
            regenerateAccessTokenAtExpire();
        }
    }, [token]);

    return (
        <>
            {showLoader ? <Loader /> : <></>}
        </>
    )
}
