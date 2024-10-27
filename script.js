// Placeholder function for the spam detection model; for demonstration only
function mockSpamDetection(message) {
    return message.includes("win") || message.includes("free");
}



// Main function that handles spam detection
/*async function checkSpam() {
    const message = document.getElementById("messageInput").value;
    const resultElement = document.getElementById("result");

    // Placeholder for an actual backend call; replace this with the fetch function if a backend is available
    const isSpam = mockSpamDetection(message); // Mock function call here

    resultElement.textContent = isSpam ? "This is spam." : "This is not spam.";
}*/

// Uncomment and modify the following if using a real backend

async function checkSpam() {
    const message = document.getElementById("messageInput").value;
    const resultElement = document.getElementById("result");

    resultElement.textContent = "Checking for spam...";

    try {
        const response = await fetch("http://127.0.0.1:8008/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Format the request according to the API's expected structure
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_length: 512,
                temperature: 0.7,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        // The API returns generated_text and generation_time
        resultElement.textContent = data.generated_text;
    } catch (error) {
        console.error("Error details:", error);
        resultElement.textContent = "Error: " + error.message;
    }
}