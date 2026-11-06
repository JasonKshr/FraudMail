
const imageInput = document.getElementById("emailImage");
const fileName = document.getElementById("fileName");
const analyzeButton = document.getElementById("analyzeButton");

const scanStatus = document.getElementById("scanStatus");
const statusCircle = document.getElementById("statusCircle");
const statusSymbol = document.getElementById("statusSymbol");
const statusTitle = document.getElementById("statusTitle");
const result = document.getElementById("result");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    fileName.textContent = file
        ? file.name
        : "Click to select an image";

    scanStatus.hidden = true;
});

function showStatus(type, symbol, title, message) {
    scanStatus.hidden = false;
    statusCircle.className = `status-circle ${type}`;
    statusSymbol.textContent = symbol;
    statusTitle.className = type;
    statusTitle.textContent = title;
    result.textContent = message;
}

analyzeButton.addEventListener("click", async () => {
    const file = imageInput.files[0];

    if (!file) {
        showStatus("error", "!", "No Image Selected",
            "Please choose an email screenshot.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    analyzeButton.disabled = true;
    analyzeButton.textContent = "Analyzing...";

    showStatus("loading", "", "Analyzing Your Email...",
        "Extracting text and checking for threats.");

    try {
        const response = await fetch("/api/uploads/file/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Analysis request failed");
        }

        const data = await response.json();

        if (data.prediction === 1) {
            showStatus("fraud", "✕", "Potential Phishing Detected",
                "This email has been flagged as suspicious.");
        } else if (data.prediction === 0) {
            showStatus("safe", "✓", "No Phishing Detected",
                "The model did not detect phishing indicators.");
        } else {
            throw new Error("Unexpected prediction result");
        }
    } catch (error) {
        showStatus("error", "!", "Analysis Failed",
            "Something went wrong. Please try again.");
        console.error(error);
    } finally {
        analyzeButton.disabled = false;
        analyzeButton.textContent = "Analyze Screenshot →";
    }
});
