const {Router} =require('express');
const controller=require('./controller')
const multer=require('multer');
const router=Router();

//Assigning storage to store files 
const storage=multer.diskStorage({
    destination:'uploads/',
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now();
        const fileName = file.originalname.split('.').shift()+'_'+uniqueSuffix + '.' + file.originalname.split('.').pop();
        cb(null,fileName);
    
    }
})
const upload = multer({ storage: storage });
//routes for show
router.get("/view", controller.getShows)
router.post("/create",upload.fields([
    { name: 'show_image', maxCount: 1 }
]),controller.addShows)
router.get("/view/:id",controller.getShowsById)
router.put("/update/:id",controller.updateShow)
router.delete("/delete/:id",controller.removeShows)

//router.get("/episode/view",controller.getEpi)



module.exports=router;