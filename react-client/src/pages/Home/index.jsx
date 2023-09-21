import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../../contextApi/DataProvider';
import axios from '../../config/axios.config';
import api from '../../config/api.json';
export default function Home() {

  const navigate = useNavigate();
  const { userInfo, token, setToken, setUserInfo } = useContext(DataContext);
  const [userList, setUserList] = useState([]);
  async function getUsers() {
    try {
      await axios.get(api.user.getAllUserUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
        if (response.data.statusCode == 200) {
          setUserList(response.data.data);
        }
      }).catch((error) => {
        console.log(error);
        return;
      })
    } catch (error) {
      console.log(error);
      return;
    }
  }
  async function logout() {
    try {
      await axios.delete(api.auth.signout).then((response) => {
        if (response.data.statusCode == 200) {
          navigate('/sign-in');
          setToken(null);
          setUserInfo(null);
        }
      }).catch((error) => {
        console.log(error);
        return;
      })
    } catch (error) {
      console.log(error);
      return;
    }
  }
  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [])
  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
        <h3 className='font-bold	'>Welcome {userInfo?.username}</h3>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {
              userList?.length > 0 ? userList.map((el) => {
                return (
                  <tr key={'user' + el?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {el.username}
                    </th>
                    <td className="px-6 py-4">
                      {el.email}
                    </td>
                    <td className="px-6 py-4">
                      {el.createAt}
                    </td>
                  </tr>
                )
              }) : <>No User Found</>
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}
