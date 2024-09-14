import mongoose,{Schema,Document} from "mongoose";
interface iordercart {
    nameofproduct:string,
    image:string,
    price:number,
    quntatiy:number
}
const ecordercart= new Schema<iordercart>({
    nameofproduct:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    quntatiy:{type:Number,default:0}
})
interface Iorder extends Document{
    name:string,
    userid:string,
    order:iordercart[],
    totaAmount:number
}
const customerproductscema= new Schema<Iorder>({
    name:{type:String,default:'anyname'},
    userid:{type:String,required:true},
    order:[ecordercart],
    totaAmount:{type:Number,default:0,required:true}
})
export const Ordrmodel= mongoose.model<Iorder>('order',customerproductscema)