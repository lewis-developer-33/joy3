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
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const page = () => {
  const {toast} = useToast()
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const handleSubmit = async () => {
    const user = {
      email,pass
    }
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
          <CardTitle>RBS - Log In</CardTitle>
          <CardDescription>Fill in the fields below</CardDescription>
        </CardHeader>
        <CardContent className='w-full grid gap-4'>
        
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
        <CardFooter>
          <Button onClick={handleSubmit}>Apply</Button>
        </CardFooter>
      </Card>
  )
}

export default page