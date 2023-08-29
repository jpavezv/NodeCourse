const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '.')));

app.post('/upload', upload.single('audio'), (req, res) => {
    // Here, you can save the audio file to disk, database, etc.
    console.log('Received audio file');
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});