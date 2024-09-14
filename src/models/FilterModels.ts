import mongoose,{Schema,Document} from "mongoose";
interface Ifilter extends Document{
    filter:string
}
const sschemaoffilter = new Schema<Ifilter>({
    filter:{type:String,required:true}
})
export const FilterModel= mongoose.model<Ifilter>('Filters',sschemaoffilter)