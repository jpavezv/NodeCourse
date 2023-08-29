require('dotenv').config();
const readline = require("readline");
const { Configuration, OpenAIApi } =require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

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


exports.getTranscription=getTranscription