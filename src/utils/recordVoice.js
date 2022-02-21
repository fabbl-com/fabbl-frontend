var constraints = { audio: true };
var chunks = [];
function handleDataAvailable(event) {
  console.log("data-available");
  if (event.data.size > 0) {
    chunks.push(event.data);
    console.log(chunks);
    let audioData = new Blob(chunks, { type: "audio/wav;" });
    audioData.lastModifiedDate = new Date();
    audioData.name = `fileName`;
    var url = URL.createObjectURL(audioData);
    console.log(url);
    // const audio = new Audio(url);
    // audio.play();
    console.log(audioData);
    return { url, audioData };
  }
}

export const record = async () => {
  try {
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    var mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    setTimeout(() => {
      console.log("stopping");
      mediaRecorder.stop();
    }, 10000);
  } catch (error) {
    console.log(error);
  }
};
