// import React,{useState} from 'react';
// import BotomWarning from '../Components/BotomWarning';
// import Heading from '../Components/Heading';
// import Inputbox from '../Components/Inputbox';
// import Button from '../Components/Button';
// import axios from 'axios';
// import { json, useNavigate } from 'react-router-dom';
// export default function SignIN() {
//     const [email, setEmail] = useState('');
//     const [password, setpassword] = useState('')
//     const navigate=useNavigate();
//   return (
//     <div className='bg-slate-400 min-h-screen flex justify-center'>
//     <div className='flex flex-col justify-center'>
//        <div className='bg-white w-80 text-center py-6 h-max px-8 rounded-lg shadow-md'>
//        <Heading label={"Sign IN"}/>
//        <Inputbox label={"Email"} onchange={(e)=>{
//            setEmail(e.target.value)
//        }}placeholder={"john"}/>
//        <Inputbox label={"Password"} onchange={(e)=>{
//            setpassword(e.target.value)
//        }}placeholder={"john"}/>
//        <div className='pt-2'>
//            <Button label={"sign IN"} onclick={async()=>{
//             if(email==''||password==''){
//                 alert("u need to put something there")
//             }
//               const response= await axios.post("http://localhost:3000/signIN",{
//                    email,
//                    password
//                })
//                 localStorage.setItem("token", response.data.token)
//                 localStorage.setItem("user",JSON.stringify(response.data.uesr))
//                navigate('/dashboard')
//            }}/>
//        </div>
//        <BotomWarning/>
//        </div>
//     </div>
//     </div>
   
//   )
// }
import React, { useState } from 'react';
import BotomWarning from '../Components/BotomWarning';
import Heading from '../Components/Heading';
import Inputbox from '../Components/Inputbox';
import Button from '../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Message from '../Components/Message'; // Importing the Message component

export default function SignIN() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State to manage messages
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (email === '' || password === '') {
            setMessage("You need to enter both email and password");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/signIN", {
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.uesr));
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage("User with this email doesn't exist");
            } else {
                console.error('Error signing in:', error);
                setMessage("An error occurred while signing in. Please try again later.");
            }
        }
    };

    return (
        <div className='bg-slate-400 min-h-screen flex justify-center'>
            <div className='flex flex-col justify-center'>
                <div className='bg-white w-80 text-center py-6 h-max px-8 rounded-lg shadow-md'>
                    <Heading label={"Sign IN"} />
                    <Inputbox label={"Email"} onchange={(e) => setEmail(e.target.value)} placeholder={"john"} />
                    <Inputbox label={"Password"} onchange={(e) => setPassword(e.target.value)} placeholder={"john"} />
                    <div className='pt-2'>
                        <Button label={"sign IN"} onclick={handleSignIn} />
                    </div>
                    {message && <Message label={message} />} {/* Display message if it exists */}
                    <BotomWarning />
                </div>
            </div>
        </div>
    );
}
