import { CustomerModel } from "../models/CustomerModel"
import { FilterModel } from "../models/FilterModels"
import { OwnerModelproduct } from "../models/OnwerModel"
import { Ordrmodel } from "../models/Ordermodels"

interface addfooDs{
    idofproduct:string,
    userid:string,
    carts:any,
    quntatiy:number
}
interface makecart{
    userid:string,
}
export const makecart=async({userid}:makecart)=>{
    const searchaboutusercart= await CustomerModel.findOne({userid:userid})
    if(!searchaboutusercart){
        const makcart= await CustomerModel.create({userid:userid})
        await makcart.save()
        return(makcart)
    }
    return(searchaboutusercart)
}
export const addfoodsrocart=async({idofproduct,userid,carts,quntatiy}:addfooDs)=>{
    try{
    const searchaboutproduct =await OwnerModelproduct.findById(idofproduct)
    if(!searchaboutproduct||searchaboutproduct.stock!='active'){
        return('the products will be provider soon !')
    }
    // console.log(searchaboutproduct.name,searchaboutproduct.image,searchaboutproduct.price)

    for(const p of carts.cart){
        if(p.nameofproduct===searchaboutproduct.name){
            
            return('the product is already in the cart')
        }
    }

    carts.cart.push({nameofproduct:searchaboutproduct.name,image:searchaboutproduct.image,price:searchaboutproduct.price,quntatiy:quntatiy})
    carts.totaAmount=0
    for(const p of carts.cart){
        carts.totaAmount+=p.quntatiy*p.price
    }
   await carts.save()
   return(carts)
}

catch{
    console.log('errrr')
}
}
interface upd{
    idofproduct:string,
    carts:any,
    quntatiy:number
}
export const updfoodsincart=async({idofproduct,carts,quntatiy}:upd)=>{
    for(const p of carts.cart){
        if(p._id.toString()===idofproduct){
            p.quntatiy=quntatiy
        }
    }
    carts.totaAmount=0;
    for(const p of carts.cart){
        carts.totaAmount+=p.quntatiy*p.price
    }
   await carts.save()
   return(carts)
}
interface del{
    userid:string
}
export const deletcasr=async({userid}:del)=>{
    try{
     await CustomerModel.findOneAndDelete({userid:userid})
    return(' deleted !')
    }
    catch{
        return('eroror')
    }
}
export const chekouteorder=async({userid}:del)=>{
    const searchaboutusercart:any= await CustomerModel.findOne({userid:userid})
    if(!searchaboutusercart){
        return('u cant orders without has cart')
    }
    const Orderarry=[]
    for(const p of searchaboutusercart?.cart){
        const payadd1:any= await OwnerModelproduct.findOne({name:p.nameofproduct})
        payadd1.paynumber+=1
        await payadd1.save()
        Orderarry.push({
            nameofproduct:p.nameofproduct,
            image:p.image,
            price:p.price,
            quntatiy:p.quntatiy
        })
    }
    const addorders= await Ordrmodel.create({
        name:searchaboutusercart.name,
        userid:userid,
        order:Orderarry,
        totaAmount:searchaboutusercart.totaAmount
    })
    await addorders.save()
    const delcartafterorder= await CustomerModel.findOneAndDelete({userid:userid})
    return(addorders)
}
interface filtringproducts{
    nameoffilter:string,
    nameofmores?:string
}
export const filtringproducts=async({nameoffilter}:filtringproducts)=>{
    const searchaboutfilter= await OwnerModelproduct.findOne({filter:nameoffilter})
    if(!searchaboutfilter){
        return('this filter isnot exsit')
    }
    const get= await OwnerModelproduct.find({filter:nameoffilter})
    return(get)
}
export const filtringproductsin=async({nameoffilter,nameofmores}:filtringproducts)=>{
    const searchaboutfilter= await OwnerModelproduct.findOne({filter:nameoffilter})
    if(!searchaboutfilter){
        return('this filter isnot exsit')
    }
    if(nameofmores==='mostpay'){
    const get= await OwnerModelproduct.find({filter:nameoffilter}).sort({paynumber:-1})
    return(get)
    }
    else if(nameofmores==='lesspay'){
        const get= await OwnerModelproduct.find({filter:nameoffilter}).sort({paynumber:1})
    return(get)
    }
    else {
        return('the nameofmores is wrong')
    }
}