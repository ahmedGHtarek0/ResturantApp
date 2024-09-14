import mongoose,{Schema,Document} from "mongoose";
interface Ilog extends Document{
    name:string,
   email:string,
   password:string
}
const schemaofOwner= new Schema<Ilog>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
export const usersModellogin= mongoose.model<Ilog>('user',schemaofOwner)
export const OwnerModelogin= mongoose.model<Ilog>('Owner',schemaofOwner)