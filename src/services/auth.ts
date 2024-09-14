import { OwnerModelogin, usersModellogin } from "../models/logandreg"
import jwt from 'jsonwebtoken';
interface auth{
    name?:string,
    email:string,
    password:string
}
export const registeruser=async({name,email,password}:auth)=>{
    const searchaboutuser= await usersModellogin.findOne({email:email})
    if(searchaboutuser){
        return('the user already exsit')
    } 
    const savenewuser = await usersModellogin.create({name,email,password})
    await savenewuser.save()
    return(generatejwtuser({name,email,password}))
}
export const registerowner=async({name,email,password}:auth)=>{
    const searchaboutuser= await OwnerModelogin.findOne({email:email})
    if(searchaboutuser){
        return('the Owner already exsit')
    } 
    const savenewuser = await OwnerModelogin.create({name,email,password})
    await savenewuser.save()
    return(generatejwtowner({name,email,password}))
}
export const login=async({email,password}:auth)=>{
    const searchaboutuser= await usersModellogin.findOne({email:email})
    
    if(searchaboutuser){
        const name=searchaboutuser?.name
        return({data:generatejwtuser({name,email,password}),statesCode:200})
    } 
    const owner:any= await OwnerModelogin.findOne({email:email})
    if(owner){
        const name=owner?.name
        return({data:generatejwtowner({name,email,password}),statesCode:200})
    } 

    return({data:'the user is not exsit',statesCode:400})
}
const generatejwtuser=(data:any)=>{
    return jwt.sign(data,'user')
}
const generatejwtowner=(data:any)=>{
    return jwt.sign(data,'owner')
}
