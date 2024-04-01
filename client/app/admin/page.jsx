'use client'
import React,{useEffect,useState} from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation'
import axios from 'axios'
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
import { useToast } from '@/components/ui/use-toast'

const page = () => {
  const router = useRouter()
  const {toast} = useToast()
  const [records,setRecords] = useState([])
  const [minAge,setMinAge] = useState('')
  const [maxAge,setMaxAge] = useState('')
  const [grade,setGrade] = useState('')
  const [income,setIncome] = useState('')

  const [modify,setModify] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      const records = await axios.get('http://localhost:8000/records')
      console.log(records)
      setRecords(records.data.message)
    }
    fetchRecords()
  },[])

  console.log(records)
  const handleSubmit = async () => {
    const model = {minAge,maxAge,grade,income}
    const res = await axios.put("http://localhost:8000/model",model)
    if (res.data.message){
      toast({
        title:res.data.message
      })
    }
    else if (res.data.error){
      toast({
        variant:'destructive',
        title:res.data.error
      })
    }
  }

  return (
    <div className='flex flex-col items-center pt-20 font-semibold'>
      <section className='w-[500px]'>
        <Button onClick={() => setModify(true)} >Modify model</Button>
        <Table>
          <TableCaption>A list of your recent application.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((d,i) => (
              <TableRow>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell>{d.idNo}</TableCell>
                <TableCell className='text-destructive'>{d.reason}</TableCell>
                <TableCell className="text-right">{d.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      
      {modify && (
        <div className='fixed bg-slate-900/40 top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
          <Card className='w-[400px] shadow-md'>
            <CardHeader>
              <CardTitle>RBS - Modify model</CardTitle>
              <CardDescription>Fill in the fields below</CardDescription>
            </CardHeader>
            <CardContent className='w-full grid gap-4'>
              <Input
              placeholder='Minimum Age'
              name='minAge'
              onChange={(e) => setMinAge(e.target.value)}
              />
              <Input
              placeholder='Maximum Age'
              name='maxAge'
              onChange={(e) => setMaxAge(e.target.value)}
              />
              <Input
              placeholder='Income'
              name='income'
              onChange={(e) => setIncome(e.target.value)}
              />
              <Input
              placeholder='Grade'
              name='grade'
              onChange={(e) => setGrade(e.target.value)}
              />
              

            </CardContent>
            <CardFooter className='grid gap-2'>
              <Button onClick={handleSubmit}>Update</Button>
              <Button variant='destructive' onClick={() => setModify(false)}>Cancel</Button>
            </CardFooter>
        </Card>
        </div>
      )}
      
    </div>
  )
}

export default page