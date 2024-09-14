import { FilterModel } from "../models/FilterModels"
import { OwnerModelproduct } from "../models/OnwerModel"
import { Ordrmodel } from "../models/Ordermodels"

interface filter{
    filter:string
}
export const addfilter=async({filter}:filter)=>{
    const searchaboutfilter = await FilterModel.findOne({filter:filter})
    if(searchaboutfilter){
        return('the filter is alrefy exsit')
    }
    const addfilters= await FilterModel.create({filter})
    await addfilters.save()
    return(addfilters)
}
interface addfoods{
    name:string,
    price:number,
    filter:string,
    id?:string,
    stock?:string
}
export const addfooDs=async({name,price,filter}:addfoods)=>{
    const checkfoodname:any= await OwnerModelproduct.findOne({name:name})
    if(checkfoodname){
        return('this item already exsit')
    }
    const searchaboutfilter =await FilterModel.findOne({filter:filter})
    if(!searchaboutfilter){
        return('this filter is not exist')
    }
  const add=  await OwnerModelproduct.create({name,price,filter})
  await add.save()
    return(add)
    
}
export const upd=async({name,price,filter,id,stock}:addfoods)=>{
    const checkfoodname:any= await OwnerModelproduct.findOne({_id:id})
    if(!checkfoodname){
        return('the items is deleted')
    } 
 const upda:any= await OwnerModelproduct.updateOne({_id:id},{$set:{name,price,filter,stock}})  
 return('updated')
}
export const getorder=async()=>{
    const getorderes= await Ordrmodel.find()
    return(getorderes)
}