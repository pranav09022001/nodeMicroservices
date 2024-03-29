const express = require('express');
const MediaRoutes = require('./routes')
const app = express();
const bodyParser = require('body-parser');
const port = 3002;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/", (req, res) => {
    res.send("EPISODE API CALLED...")
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", MediaRoutes);

app.listen(port, () => { console.log(`app listening on port http://localhost:${port}`) })