import { NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { OwnerModelogin } from "../models/logandreg";
export const Onwemiddleware=(req:any,res:any,next:NextFunction)=>{
    const authorization = req.get('authorization')
    if(!authorization){
        res.send('there is no authorization ')
    }
    const token = authorization.split(' ')[1]
    if(!token){
        res.send('there is no token')
    }
    jwt.verify(token,'owner',async(err:any,payload:any)=>{
        if(err){
            res.send('Mr hAKER the token is not right')
        }
        if(!payload){
            res.send('no ensha allah')
        }
        const Ownerdata= await OwnerModelogin.findOne({email:payload.email})
        req.owner=Ownerdata
        next()
    })

}