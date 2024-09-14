import express from 'express'
import mongoose  from 'mongoose'
import OwnerRoutes from './routes/OwnerRoutes';
import authroutes from './routes/authroutes';
import customerroutes from './routes/customerroutes';
const app=express()
const port =3010;
mongoose
.connect("mongodb://localhost:27017/ResturantApp")
.then(()=> console.log("MongoDB connected !"))
.catch((err)=>console.log("faild to connect cause ", err))
app.use(express.json())//middleware built in express who change the json in the req and but in the req.body
// retsurant App real time 
app.use('/owner',OwnerRoutes)
app.use('/auth',authroutes)
app.use('/customer',customerroutes)
app.listen(port,()=>{
    console.log(`srever is ruunig at http://localhost:${port}`)
})