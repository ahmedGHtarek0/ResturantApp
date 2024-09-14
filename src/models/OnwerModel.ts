import mongoose,{Schema,Document} from "mongoose";
interface IOwner extends Document{
    name:string,
    image:string,
    price:number,
    stock:string,
    filter:string,
    paynumber:number
}
const schemaofOwner= new Schema<IOwner>({
    name:{type:String,required:true},
    image:{type:String,default:'anyimages'},
    price:{type:Number,required:true},
    stock:{type:String,default:'active'},
    filter:{type:String,required:true},
    paynumber:{type:Number,default:0}
})
export const OwnerModelproduct= mongoose.model<IOwner>('products',schemaofOwner)