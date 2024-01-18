// Check if the browser supports MediaRecorder API
if ('MediaRecorder' in window) {
    var mediaRecorder;
    var recordedChunks = [];

    function startVoiceRecording() {
        clearPreviousRecording(); // Clear the previous recording before starting a new one

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function (event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                        updateAudioPlayer();
                    }
                };

                mediaRecorder.onstop = function () {
                    var voiceMessage = new Blob(recordedChunks, { type: 'audio/wav' });
                    document.getElementById("voiceMessage").value = voiceMessage;
                };

                mediaRecorder.start();
                console.log('Voice recording started.');
            })
            .catch(function (error) {
                console.error('Error accessing microphone:', error);
            });
    }

    function stopVoiceRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            console.log('Voice recording stopped.');
        }
    }

    function clearPreviousRecording() {
        recordedChunks = [];
        updateAudioPlayer();
    }
} else {
    console.error('MediaRecorder API is not supported in this browser.');
}

function updateAudioPlayer() {
    var audioPlayer = document.getElementById("audioPlayer");

    if (recordedChunks.length > 0) {
        audioPlayer.src = createBlobURL(recordedChunks[recordedChunks.length - 1]);
        audioPlayer.style.display = "block";
    } else {
        audioPlayer.style.display = "none";
    }
}

function createBlobURL(blob) {
    return URL.createObjectURL(blob);
}

function playVoiceMessage() {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.play();
}

function submitGrievance() {
    // Fetch form data
    var sector = document.getElementById("sector").value;
    var photo = document.getElementById("photo").value;
    var message = document.getElementById("message").value;
    var voiceMessage = document.getElementById("voiceMessage").value;

    // Simple validation (you should add more validation)
    if (!sector || !photo || (!message && !voiceMessage)) {
        alert("Please fill in all the required fields.");
        return;
    }

    // Simulate submitting data to the server (you should implement server-side logic)
    var feedbackDiv = document.getElementById("feedback");
    feedbackDiv.innerHTML = "Grievance submitted successfully. ";
    feedbackDiv.innerHTML += "You will receive updates on the status.";

    // Clear form fields
    document.getElementById("sector").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("message").value = "";
    document.getElementById("voiceMessage").value = "";

    clearPreviousRecording(); // Clear the recording after submitting the grievance
}

// HTML buttons
document.getElementById("startRecording").addEventListener("click", startVoiceRecording);
document.getElementById("stopRecording").addEventListener("click", stopVoiceRecording);
document.getElementById("clearRecording").addEventListener("click", clearPreviousRecording);
document.getElementById("playVoiceMessage").addEventListener("click", playVoiceMessage);

// Function to handle photo capture
document.getElementById("capturePhoto").addEventListener("click", function () {
    document.getElementById("photo").click();
});
// Display the captured image
document.getElementById("photo").addEventListener("change", function (event) {
    var fileInput = event.target;
    var capturedImage = document.getElementById("capturedImage");

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            capturedImage.src = e.target.result;
            capturedImage.style.display = "block";
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});
// Function to handle voice message capture
document.getElementById("captureVoiceMessage").addEventListener("click", function () {
    document.getElementById("voiceMessage").click();
});

