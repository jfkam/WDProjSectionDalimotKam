// note.js

// Ensure JS runs after page loads
window.addEventListener("DOMContentLoaded", () => {
    // Display current user
    const user = localStorage.getItem("currentUser") || "User";
    document.getElementById("username").innerText = user;

    // Display current year in footer
    document.getElementById("year").innerText = new Date().getFullYear();

    // Attach button click safely
    const sendBtn = document.querySelector(".send-btn");
    sendBtn.addEventListener("click", submitNote);

    // Show notes
    displayNotes();
});

function submitNote() {
    const noteInput = document.getElementById("noteInput");
    if (!noteInput) return;

    const text = noteInput.value.trim();
    if (text === "") {
        alert("Please write something first!");
        return;
    }

    // Safely get notes from localStorage
    let notes = [];
    try {
        notes = JSON.parse(localStorage.getItem("notes")) || [];
        if (!Array.isArray(notes)) notes = [];
    } catch (e) {
        notes = [];
    }

    // Add new note
    notes.push({
        text: text,
        timestamp: new Date().toLocaleString()
    });

    // Save notes
    localStorage.setItem("notes", JSON.stringify(notes));

    // Clear input
    noteInput.value = "";

    // Refresh displayed notes
    displayNotes();
}

function displayNotes() {
    const notesList = document.getElementById("notesList");
    if (!notesList) return;

    notesList.innerHTML = "";

    let notes = [];
    try {
        notes = JSON.parse(localStorage.getItem("notes")) || [];
        if (!Array.isArray(notes)) notes = [];
    } catch (e) {
        notes = [];
    }

    if (notes.length === 0) {
        notesList.innerHTML = "<p>No notes yet. Be the first to send one!</p>";
        return;
    }

    notes.forEach((note) => {
        const div = document.createElement("div");
        div.classList.add("note");
        div.innerHTML = `
            <p>${note.text}</p>
            <span class="note-timestamp">${note.timestamp}</span>
        `;
        notesList.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const user =
        localStorage.getItem("currentUser") ||
        localStorage.getItem("username") ||
        "User";

    const headerUser = document.getElementById("username");
    const settingsUser = document.getElementById("settings-username");

    if (headerUser) headerUser.textContent = user;
    if (settingsUser) settingsUser.textContent = user;
});

function toggleSettings() {
    document.getElementById("settings-menu").classList.toggle("show");
}

