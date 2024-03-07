const Pool=require("pg").Pool;

const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"audiopitara",
    password:"12345",
    port:4000,
});

module.exports=pool;