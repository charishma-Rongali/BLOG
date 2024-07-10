const mongoose=require('mongoose');
//import schema method from mongoose
//const {Schema}=mongoose;
//or new mongoose.schema()
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const Userdata=mongoose.model("Userdata",UserSchema);

module.exports=Userdata;