import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../../contextApi/DataProvider';
import axios from '../../config/axios.config';
import api from '../../config/api.json';
export default function Home() {

  const navigate = useNavigate();
  const { userInfo, token } = useContext(DataContext);
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
    navigate('/sign-in')
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div class="container mx-auto p-4">
      <div className='flex justify-between'>
        <button onClick={logout} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
        <h3 className='font-bold	'>Welcome {userInfo?.username}</h3>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                User name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {
              userList?.length > 0 ? userList.map((el) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {el.username}
                    </th>
                    <td class="px-6 py-4">
                      {el.email}
                    </td>
                    <td class="px-6 py-4">
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
