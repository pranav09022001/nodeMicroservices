const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const multer = require('multer');

// const  storage=multer.diskStorage({
//     destination:'uploads/',
//     filename:function(req,file,cb){
//        // const uniquesuffix=Date.now()+'-'+ Math.round(Math.random() * 1E9);
//         const filename=file.originalname.split('.').shift()+'.'+file.originalname.split('.').pop();
//         cb(null,filename);
//     }
// })

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        if (file.mimetype.startsWith('audio/')) {
            // For audio files, use the original filename without the date prefix
            filename = file.originalname.split('.').shift() + '.' + file.originalname.split('.').pop()
            console.log(filename);
        } else {
            // For other files, include the date prefix in the filename
            filename = file.originalname.split('.').shift()+ '-'+ Date.now() + '.' + file.originalname.split('.').pop();
            console.log(filename);
        }

        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

//routes for episode
router.get("/view", controller.getEpi)
router.get("/view/:id", controller.getEpiById)
router.post("/create", upload.fields([
    { name: 'episode_image', maxCount: 1 },
    { name: 'episode_audio', maxCount: 1 }
]), controller.addEpi)
router.put("/update/:id", controller.updateEpi)
router.delete("/delete/:id", controller.removeEpi)

//router.get("/episode/view",controller.getEpi)



module.exports = router;