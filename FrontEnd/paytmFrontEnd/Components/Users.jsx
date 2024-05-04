import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0); // State to track typing timeout

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/filter?filter=${filter}`, {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        setUsers(response.data.users);
        console.log(users)
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  // Debounce function
  const handleInputChange = (event) => {
    clearTimeout(typingTimeout); // Clear previous timeout
    const inputValue = event.target.value;
    setFilter(inputValue); // Update filter immediately

    // Set a new timeout to execute fetchData after 500ms
    setTypingTimeout(setTimeout(() => {
      // This will only execute after 500ms of user's last input
      console.log("Fetching data...");
      // fetchData(); // Uncomment this line if you want to fetch data on timeout
    }, 500));
  };

  return (
    <div>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div className='my-2'>
        <input
          type="text"
          placeholder='search user'
          onChange={handleInputChange} // Call the debounce function on change
          className='p-3 rounded w-full '
        />
      </div>
      {isLoading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        users.map((user) => (
          <User key={user._id} user={user} />
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

function User({user}){
  const navigate=useNavigate()
    console.log(user)
     return ( 
        <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                {user.first_name&&<div className="flex flex-col justify-center h-full text-xl">
                    {user.first_name[0]}
                </div>}
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.first_name} {user.last_name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onclick={(e) => {
              console.log("send button")
                navigate("/send?id=" + user._id + "&name=" + user.first_name);
            }} label={"Send Money"} />
        </div>
    </div>
     )
}
//the users array and the search system  .. so there has to be a input box and 