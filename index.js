require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Configuration, OpenAIApi } =require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

//const readline = require("readline");

async function getTranscription(fileName){
  const fs = require("fs")
  console.log('Iniciando Transcripción de Archivo: '+fileName)
  //buffer, // The audio file to transcribe.
  //"whisper-1", // The model to use for transcription.
  //undefined, // The prompt to use for transcription.
  //'json', // The format of the transcription.
  //1, // Temperature
  //'en' // Language
  const resp = await openai.createTranscription(
            fs.createReadStream(fileName),
            "whisper-1",            
            undefined,
            'json',
            1,
            'en')
  .then((resp) => {
    console.log(resp.data.text)  
    return resp.data.text
  })
  .catch((e) => {
    console.log("ERROR LLAMANDO TRANSCRIPCION!!")
    console.log(e);
    console.log("STACK")
    console.log("------")
    console.log(e.stack)
    return (e.message)
  });

}

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
    const transcripcion=getTranscription('/uploads/'+req.file.filename);
    console.log(transcripcion);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
