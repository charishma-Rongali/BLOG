const express=require('express');
const App=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser'); 
require('dotenv').config();
const blogRoutes=require('./routes/blogRoutes');

const port=5000;

//to resolve cors-cross origin request errors from front ent to backend
App.use(cors());
//to post the json data middlware 
App.use(express.json());

App.use('/',blogRoutes);

mongoose.connect(process.env.db_URI).then(()=>{
    //console.log(result);
    console.log("Connected to DB");
}).catch(err=>{
    console.log(err);
})

App.listen(port,()=>
    {
     console.log(`server listening on port:${port}`)
    });