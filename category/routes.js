const {Router} =require('express');
const controller=require('./controller')
const multer =require('multer');
const router=Router();

//Assigning storage to store files 
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() ;
            const fileName = file.originalname.split('.').shift()+'_'+uniqueSuffix + '.' + file.originalname.split('.').pop();
        
        cb(null, fileName);
    }
  });
  const upload = multer({ storage: storage });

//routes for episode
router.get("/view",controller.getCat)//Get request
router.get("/view/:id",controller.getCatById)//Post request
router.post("/create",upload.fields([
    { name: 'category_image', maxCount: 1 },
    { name: 'category_icon', maxCount: 1 },
    {name:'category_banner',maxCount:1}
]),
controller.addCat)
router.put("/update/:id",controller.updateCat)
router.delete("/delete/:id",controller.removeCat)

//router.get("/episode/view",controller.getEpi)



module.exports=router;