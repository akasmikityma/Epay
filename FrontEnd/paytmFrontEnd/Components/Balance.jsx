import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Balance({ user }) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/amount?id=${user._id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setAmount((response.data.balance).toFixed(2));
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [user._id]); // Fetch user details whenever user ID changes

  return (
    <div className='flex'>
      <div className='font-bold text-lg'>Your Balance</div>
      <div className='font-semibold ml-4 text-lg'>{`RS ${amount}`}</div>
    </div>
  );
}
