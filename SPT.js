document.addEventListener("DOMContentLoaded", function() {
    // Ensure the form is loaded before attaching the event listener
    const form = document.getElementById("audio-form");
    
    // Add the submit event listener
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        // Get the file input element
        const fileInput = document.getElementById("audio-file");
        
        // Create a new FormData object
        const formData = new FormData();
        formData.append("audio", fileInput.files[0]); // Append the selected audio file

        // Make the API request to the backend
        fetch('https://stt-backend-v1av.onrender.com/transcribe', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Assuming the transcription text is in 'data.transcription'
            const transcriptionText = data.transcription;
            document.getElementById("transcription-text").textContent = transcriptionText;

            // Enable the copy button after transcription
            const copyButton = document.getElementById('copy-button');
            copyButton.disabled = false;  // Enable the copy button
            copyButton.addEventListener('click', function() {
                // Select the text in the transcription box
                const transcriptionBox = document.getElementById('transcription-text');
                transcriptionBox.select();
                transcriptionBox.setSelectionRange(0, 99999); // For mobile devices
                
                // Try to copy the text
                try {
                    document.execCommand('copy'); // Copy the selected text
                    alert('Text copied to clipboard!');
                } catch (err) {
                    alert('Failed to copy text.');
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("transcription-text").textContent = 'An error occurred. Please try again.';
        });
    });
});