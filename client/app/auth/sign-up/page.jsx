'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

const page = () => {
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [pass,setPass] = useState('')
  const router = useRouter()
  const {toast} = useToast()

  const handleSubmit = async () => {
    const user = {
      email,pass,name,phone
    }
    console.log(user)
    const res = await axios.post('http://localhost:8000/sign-up',user)
    if (res.data.message) {
      toast({
        title:"Successful sign up"
      })
      localStorage.setItem("name",res.data.message)

      router.push('/admin')
    }
    else if (res.data.error){
      toast({
        variant:'destructive',
        title:res.data.error
      })
    }
  }
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
          <CardTitle>RBS - Sign Up</CardTitle>
          <CardDescription>Fill in the fields below</CardDescription>
        </CardHeader>
        <CardContent className='w-full grid gap-4'>
          <Input
          placeholder='Name'
          name='name'
          onChange={(e) => setName(e.target.value)}
          />
          <Input
          placeholder='Phone'
          name='phone'
          onChange={(e) => setPhone(e.target.value)}
          />
          <Input
          placeholder='Email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder='Password'
          name='pass'
          onChange={(e) => setPass(e.target.value)}
          />
          

        </CardContent>
        <CardFooter className='grid gap-2'>
          <Button onClick={handleSubmit}>Sign up</Button>
          <Link href='/auth/login'> Log in</Link>
        </CardFooter>
    </Card>
  )
}

export default page