let mediaRecorder;
let audioChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audio', audioBlob);

            fetch('/upload', {
                method: 'POST',
                body: formData
            });
        };
    });

document.getElementById('start').addEventListener('click', () => {
    mediaRecorder.start();
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
});

document.getElementById('stop').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
});
