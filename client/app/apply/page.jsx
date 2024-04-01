'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { useState,useEffect } from "react"
import { createWorker } from 'tesseract.js';


const page = () => {
  const {toast} = useToast()
  const [file,setFile] = useState()
  const [name,setName] = useState('')
  const [id,setID] = useState('')
  const [age,setAge] = useState('')
  const [nationality,setNationality] = useState('')

  const [sports,setSports] = useState('')
  const [clubs,setClubs] = useState('')
  const [grade,setGrade] = useState('')
  const [religion,setReligion] = useState('')
  const [orphan,setOrphan] = useState('')
  const [income,setIncome] = useState('')

  const onChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    const data = {
      name,
      id,
      age,
      nationality,
      sports,
      clubs,
      grade,
      religion,
      orphan,
      income
    }
    const res = await axios.post('http://localhost:8000/apply',data)
    console.log(res)
    toast({
      title:res.data.message
    })
    // console.log(data)
  }
  return (
    <div className="flex items-center">
      <div className="relative w-full h-screen">
        <Image
        src='/loan.jpg'
        alt='loan'
        fill
        />
        <div className="absolute w-full h-full bg-slate-900/40 top-0 left-0 pt-10 pl-10">
          <p className=" font-bold text-4xl">The <span className="text-orange-600">Dream</span> is closer than you think</p>
        </div>
      </div>
      <div className="bg-slate-900 w-[500px] h-screen flex flex-col items-center justify-center px-10">
        <Card className='w-[400px] shadow-md'>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>Best of luck</CardDescription>
          </CardHeader>
          <CardContent className='w-full grid gap-4'>
          {/* <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">National ID</Label>
            <Input id="picture" type="file" onChange={onChange} />
          </div> */}

            <Input
            placeholder='Name'
            name='name'
            onChange={(e) => setName(e.target.value)}
            />
            <Input
            placeholder='ID'
            name='id'
            onChange={(e) => setID(e.target.value)}
            />
            <Input
            placeholder='Age'
            name='age'
            onChange={(e) => setAge(e.target.value)}
            />
            <Input
            placeholder='Nationality'
            name='nationality'
            onChange={(e) => setNationality(e.target.value)}
            />
            
            <Input
            placeholder='Sports'
            name='sports'
            onChange={(e) => setSports(e.target.value)}
            />
            <Input
            placeholder='Clubs'
            name='clubs'
            onChange={(e) => setClubs(e.target.value)}
            />
            <Select onValueChange={(value) => setGrade(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1.0</SelectItem>
                <SelectItem value="2">2.0</SelectItem>
                <SelectItem value="3">3.0</SelectItem>
                <SelectItem value="4">4.0</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setReligion(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Religion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="christian">Christian</SelectItem>
                <SelectItem value="muslim">Muslim</SelectItem>
                <SelectItem value="aethist">Aethist</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setOrphan(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Orphan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, orphaned</SelectItem>
                <SelectItem value="no">Not orphaned</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setIncome(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Family income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">Less than Kes 20,000</SelectItem>
                <SelectItem value="30">Less than Kes 30,0000</SelectItem>
                <SelectItem value="40">Less than Kes 40,0000</SelectItem>
                <SelectItem value="50">Less than Kes 50,0000</SelectItem>
                <SelectItem value="51">More than Kes 50,0000</SelectItem>
              </SelectContent>
            </Select>

          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Apply</Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}

export default page