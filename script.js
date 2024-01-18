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
}
