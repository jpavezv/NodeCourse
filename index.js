require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT;
const OpenAIApi =require("openai");
const openai = new OpenAIApi(process.env.OPENAI_API_KEY );

//const readline = require("readline");

async function getTranscription(fileName){
  console.log('Iniciando Transcripción de Archivo: '+fileName)
  //buffer, // The audio file to transcribe.
  //"whisper-1", // The model to use for transcription.
  //undefined, // The prompt to use for transcription.
  //'json', // The format of the transcription.
  //1, // Temperature
  //'en' // Language
   /*const resp = await openai.createTranscription(
            fs.createReadStream(fileName),
            "whisper-1",            
            undefined,
            'json',
            1,
            'en')*/
  const resp = await openai.audio.transcriptions.create(
    fs.createReadStream(filename),
    "whisper-1" )
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
  console.log('Transcripción Finalizada');
}

const app = express();

//const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save to 'uploads' directory. Make sure this directory exists.
    },
    filename: (req, file, cb) => {
        // Set the file extension to .mp3
        const filename_tmp=Date.now()+'.mp3';
        cb(null, filename_tmp);
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

app.post('/upload', upload.single('audio'), async (req, res) => {
    console.log('Received audio file:', req.file.filename); // Log the saved filename
    const transcripcion = getTranscription(path.join(__dirname, './uploads', req.file.filename));
    console.log(transcripcion);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
