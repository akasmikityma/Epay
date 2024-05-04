import React,{useState} from 'react'
import Heading from '../Components/Heading'
import Inputbox from '../Components/Inputbox'
import Button from '../Components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function SignUP() {
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate=useNavigate()
  return (
     <div className='bg-slate-400 min-h-screen flex justify-center'>
     <div className='flex flex-col justify-center'>
        <div className='bg-white w-80 text-center py-6 h-max px-8 rounded-lg shadow-md'>
        <Heading label={"Sign UP"}/>
        <Inputbox label={"First_Name"} onchange={(e)=>{
            setfirstname(e.target.value)
        }} placeholder={"john"}/>
        <Inputbox label={"Last_Name"} onchange={(e)=>{
            setlastname(e.target.value)
        }}placeholder={"john"}/>
        <Inputbox label={"Email"} onchange={(e)=>{
            setemail(e.target.value)
        }}placeholder={"john"}/>
        <Inputbox label={"Password"} onchange={(e)=>{
            setpassword(e.target.value)
        }}placeholder={"john"}/>
        <div>
            <Button label={"sign Up"} onclick={async()=>{
               const response= await axios.post("http://localhost:3000/signUP",{
                    firstname,
                    lastname,
                    email,
                    password
                })
                 localStorage.setItem("token", response.data.token)
                navigate('/dashboard')
            }}/>
        </div>
        </div>
     </div>
     </div>
    
  )
}
