import React, { useContext, useEffect } from 'react'
import { DataContext } from '../contextApi/DataProvider';
import axios from '../config/axios.config';
import api from '../config/api.json';
export default function InitAuth() {
    const { token, setToken, userInfo, setUserInfo } = useContext(DataContext)
    async function regenerateAccessToken() {
        try {
            await axios.get(api.auth.regenerateAccessToken).then((response) => {
                if (response.data.statusCode == 200) {
                    const accessToken = response.data.token;
                    setToken(accessToken);
                }
            }).catch((error) => {
                console.log(error);
                return;
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }

    function regenerateAccessTokenAtExpire() {
        try {

        } catch (error) {
            console.log(error);
            return;
        }
    }

    async function init() {
        await regenerateAccessToken();
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <></>
    )
}
