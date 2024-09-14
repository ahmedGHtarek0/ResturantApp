import express from 'express'
import { login, registerowner, registeruser } from '../services/auth'
const route= express.Router()
route.post('/login',async(req:any,res)=>{
    const {email,password}=req.body
    const {data,statesCode}= await login({email,password})
    res.status(statesCode).send(data)
})
route.post('/regesteruser',async(req:any,res)=>{
    const {name,email,password}=req.body
    const data= await registeruser({name,email,password})
    res.send(data)
})
route.post('/registerowner',async(req:any,res)=>{
    const {name,email,password}=req.body
    const data= await registerowner({name,email,password})
    res.send(data)
})
export default route