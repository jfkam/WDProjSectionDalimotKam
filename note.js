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

    notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.classList.add("note-card");

    div.innerHTML = `
        <p class="note-text">${note.text}</p>
        <span class="note-timestamp">${note.timestamp}</span>

        <div class="note-actions">
            <button class="edit-btn" onclick="editNote(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        </div>
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

// Edit Button
function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    const newText = prompt("Edit your note:", notes[index].text);

    if (newText !== null && newText.trim() !== "") {
        notes[index].text = newText.trim();
        notes[index].timestamp = new Date().toLocaleString();

        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}
// Delete Button
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
