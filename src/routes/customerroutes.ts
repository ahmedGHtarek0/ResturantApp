import express from 'express'
import { usermiddleware } from '../middleware/usersmiddleware'
import { addfoodsrocart, chekouteorder, deletcasr, filtringproducts, filtringproductsin, makecart, updfoodsincart } from '../services/userservices'
const router= express.Router()
router.post('/addfoods/:id',usermiddleware,async(req:any,res)=>{
    const userid= req.user._id
    const idofproduct=req.params.id
    const {quntatiy}=req.body
    const carts= await makecart({userid})
    const addfodds= await addfoodsrocart({idofproduct,userid,carts,quntatiy})
    res.status(200).send(addfodds)
})
router.put('/updatefoodincart/:id',usermiddleware,async(req:any,res)=>{
    const userid= req.user._id
    const idofproduct=req.params.id
    const {quntatiy}=req.body
    const carts= await makecart({userid})
    const updfoodsincarts= await updfoodsincart({idofproduct,carts,quntatiy})
    res.status(200).send(updfoodsincarts)
})
router.delete('/deletecart',usermiddleware,async(req:any,res)=>{
    const userid= req.user._id
    const dlete= deletcasr({userid})
    res.status(200).send(dlete)
})
router.post('/chechoutorder',usermiddleware,async(req:any,res)=>{
    const userid=req.user._id
    const chekout= await chekouteorder({userid})
    res.status(200).send(chekout)
})
router.post('/filter',usermiddleware,async(req,res)=>{
    const {nameoffilter}=req.body
    const getproductsfiltring= await filtringproducts({nameoffilter})
    res.status(200).send(getproductsfiltring)
})
router.post('/filterinthefilter',usermiddleware,async(req,res)=>{
    const {nameoffilter,nameofmores}=req.body
    const getproductsfiltring= await filtringproductsin({nameoffilter,nameofmores})
    res.status(200).send(getproductsfiltring)
})
export default router