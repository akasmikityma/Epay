import React, { useEffect, useState } from 'react'
import Appbar from '../Components/Appbar'
import Users from '../Components/Users'
import Balance from '../Components/Balance'
import axios from 'axios'
export default function Dashboard() {
  const [userobj, setuserobj] = useState({})
  useEffect(() => {
    const getUser = async () => {
      const userString = localStorage.getItem("user");
      if (userString) {
        // Parse the string into an object
        const user = JSON.parse(userString);
        setuserobj(user);
      }
    };
  
    getUser();
  }, []);
  return (
    <div>
        <Appbar user={userobj}/>
        <div className="m-8">
            <Balance user={userobj} />
            <Users />
        </div>
    </div>
  )
}
