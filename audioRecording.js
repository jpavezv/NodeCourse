const fs = require('fs');
const lame = require('node-lame');
const record = require('node-record-lpcm16');

const audioFile = 'recorded_audio.mp3';
const durationInSeconds = 10; // Change this to the desired recording duration

function recordAudio(durationInSeconds) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(audioFile);
    const encoder = new lame.Encoder({
      channels: 2,
      bitDepth: 16,
      sampleRate: 44100,
      bitRate: 128,
      outSampleRate: 22050,
      mode: lame.STEREO,
    });

    record
      .start({
        threshold: 0,
        silence: '1.0',
      })
      .on('data', (data) => {
        encoder.write(data);
      });

    setTimeout(() => {
      record.stop();
      encoder.end();
    }, durationInSeconds * 1000);

    encoder.pipe(writeStream);
    writeStream.on('finish', () => resolve());
    writeStream.on('error', (err) => reject(err));
  });
}

async function main() {
  try {
    console.log('Recording audio...');
    await recordAudio(durationInSeconds);
    console.log(`Audio recorded and saved to ${audioFile}`);
  } catch (error) {
    console.error('Error recording audio:', error);
  }
}

main();