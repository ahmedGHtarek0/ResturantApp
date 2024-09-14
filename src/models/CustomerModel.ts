import mongoose,{Schema,Document} from "mongoose";
interface icart {
    nameofproduct:string,
    image:string,
    price:number,
    quntatiy:number
}
const scart= new Schema<icart>({
    nameofproduct:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    quntatiy:{type:Number,default:0}
})
interface Icustomerproduct extends Document{
    name:string,
    userid:string,
    cart:icart[],
    totaAmount:number
}
const customerproductscema= new Schema<Icustomerproduct>({
    name:{type:String,default:'anyname'},
    userid:{type:String,required:true},
    cart:[scart],
    totaAmount:{type:Number,default:0,required:true}
})
export const CustomerModel= mongoose.model<Icustomerproduct>('customer',customerproductscema)