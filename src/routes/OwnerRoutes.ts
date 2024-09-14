import express from 'express'
import { Onwemiddleware } from '../middleware/Ownermiddleware'
import { addfilter, addfooDs, getorder, upd } from '../services/Ownerservice'
const route= express.Router()
route.post('/filter',Onwemiddleware,async(req:any,res)=>{
    const ownerid=req.owner._id
    const {filter}= req.body
    const addfilters= await addfilter({filter})
    res.status(200).send(addfilters)
})
route.post('/addfoods',Onwemiddleware,async(req:any,res)=>{
    const {name,price,filter}=req.body
    const addfoods= await addfooDs({name,price,filter})
    res.status(200).send(addfoods)
})
route.put('/updfoods/:id',Onwemiddleware,async(req:any,res)=>{
    const {name,price,filter,stock}=req.body
    const id=req.params.id
    const updfoods= await upd({name,price,filter,stock,id})
    res.status(200).send(updfoods)
})
route.get('/getorders',Onwemiddleware,async(req:any,res)=>{
    const getorders= await getorder()
    res.status(200).send(getorders)
})
export default route