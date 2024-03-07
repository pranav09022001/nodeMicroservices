//const express=require('express');
const gateway = require('fast-gateway');
const port = 9000;
//const app=express();
//hello

const server = gateway({
    routes: [{
        //This is for Show
        prefix: '/show',
        target: 'http://localhost:3001'
    },
    {
        //This is for Episodes 
        prefix:'/episode',
        target:'http://localhost:3002'
    },
    {
        //This is for Category 
        prefix:'/category',
        target:'http://localhost:3003'
    }


    ]


})

server.get("/", (req, res) => {
    res.send("API GATEWAY CALLED...")
})
server.get("/show",(req,res)=>{
    res.send("Show API called..")
})
server.get("/episode",(req,res)=>{
    res.send("Episode API called..")
})
server.get("/category",(req,res)=>{
    res.send("Category API called..")
})
server.start(port).then(server => {
    console.log(`app listening on port http://localhost:${port}`)
});
 //app.listen(port,()=>{console.log( `app listening on port http://localhost:${port}`)})