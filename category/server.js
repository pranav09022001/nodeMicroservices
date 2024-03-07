const express = require('express');
const MediaRoutes = require('./routes')

const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const port = 3003;
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/", (req, res) => {
    res.send("Category API CALLED...")
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.use(upload.single('category_image'));

app.use("/", MediaRoutes);

app.listen(port, () => { console.log(`app listening on port http://localhost:${port}`) })