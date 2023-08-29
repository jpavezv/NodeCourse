const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save to 'uploads' directory. Make sure this directory exists.
    },
    filename: (req, file, cb) => {
        // Set the file extension to .mp3
        cb(null, Date.now() + '.mp3');
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Check if the uploaded file is an audio file
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an audio file!'), false);
        }
    }
});

app.use(express.static(path.join(__dirname, '.')));

app.post('/upload', upload.single('audio'), (req, res) => {
    console.log('Received audio file:', req.file.filename); // Log the saved filename
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
