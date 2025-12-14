// -----------------------------
// DARK MODE TOGGLE
// -----------------------------
const toggle = document.getElementById("dark-toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = 
        document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// -----------------------------
// MATERIAL RIPPLE EFFECT
// -----------------------------
document.querySelectorAll(".ripple").forEach(button => {
    button.addEventListener("click", function(e) {
        const rect = this.getBoundingClientRect();
        this.style.setProperty("--ripple-x", (e.clientX - rect.left) + "px");
        this.style.setProperty("--ripple-y", (e.clientY - rect.top) + "px");
    });
});

// -----------------------------
// AUTO-SUGGEST DROPDOWN
// -----------------------------
const suggestionsBox = document.getElementById("suggestions");
const input = document.getElementById("search-input");

input.addEventListener("input", () => {
    const text = input.value.trim();
    if (!text) {
        suggestionsBox.classList.add("hidden");
        return;
    }

    const sampleSuggestions = [
        text + " news",
        text + " website",
        "How to " + text,
        text + " tutorial",
        text + " meaning"
    ];

    suggestionsBox.innerHTML = "";

    sampleSuggestions.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        li.onclick = () => {
            input.value = s;
            suggestionsBox.classList.add("hidden");
        };
        suggestionsBox.appendChild(li);
    });

    suggestionsBox.classList.remove("hidden");
});

// Close suggestions when clicking outside
document.addEventListener("click", e => {
    if (!e.target.closest(".search-wrapper"))
        suggestionsBox.classList.add("hidden");
});

// -----------------------------
// VOICE RECOGNITION
// -----------------------------
const mic = document.getElementById("mic");
const micDots = document.getElementById("mic-dots");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    mic.addEventListener("click", () => {
        mic.style.fill = "#1a73e8";
        micDots.style.opacity = "1";
        recognition.start();
    });

    recognition.addEventListener("result", e => {
        input.value = e.results[0][0].transcript;
    });

    recognition.addEventListener("end", () => {
        mic.style.fill = "#9aa0a6";
        micDots.style.opacity = "0";
    });
} else {
    console.log("Speech recognition not supported.");
}
