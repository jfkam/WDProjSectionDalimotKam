
function getEntries() {
    return JSON.parse(localStorage.getItem("diary_entries") || "[]");
}

function saveEntries(entries) {
    localStorage.setItem("diary_entries", JSON.stringify(entries));
}

const leftPage = document.querySelector(".left-page");
const rightPage = document.querySelector(".right-page");

document.getElementById("saveBtn").addEventListener("click", () => {
    const left = leftPage.innerHTML.trim();
    const right = rightPage.innerHTML.trim();

    if (!left && !right) {
        alert("Your diary entry is empty!");
        return;
    }

    const entries = getEntries();

    entries.push({
        date: new Date().toLocaleString(),
        left,
        right
    });

    saveEntries(entries);
    alert("Entry saved!");
});

document.getElementById("viewBtn").addEventListener("click", () => {
    const popup = document.getElementById("entriesPopup");
    const list = document.getElementById("entriesList");

    list.innerHTML = "";

    const entries = getEntries().sort((a, b) => new Date(b.date) - new Date(a.date));

    entries.forEach((entry, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="entry-box">
            <div class="entry-date">${entry.date}</div>

            <div class="entry-actions">
                <button class="edit-entry" data-index="${index}">Edit</button>
                <button class="delete-entry" data-index="${index}">Delete</button>
            </div>
        </div>
    `;

    
    li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;

        leftPage.innerHTML = entry.left;
        rightPage.innerHTML = entry.right;
        document.getElementById("entriesPopup").style.display = "none";
    });

    list.appendChild(li);
});

    popup.style.display = "flex";
});

document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("entriesPopup").style.display = "none";
});

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


document.getElementById("entriesList").addEventListener("click", function(e) {
    const entries = getEntries();
    const index = e.target.getAttribute("data-index");

    if (index === null) return;

 
    if (e.target.classList.contains("delete-entry")) {
        const confirmDelete = confirm("Delete this entry?");
        if (!confirmDelete) return;

        entries.splice(index, 1);
        saveEntries(entries);
        document.getElementById("viewBtn").click(); // refresh list
    }

   
    if (e.target.classList.contains("edit-entry")) {
        const newLeft = prompt("Edit left page:", entries[index].left);
        const newRight = prompt("Edit right page:", entries[index].right);

        if (newLeft !== null && newRight !== null) {
            entries[index].left = newLeft;
            entries[index].right = newRight;
            saveEntries(entries);
            document.getElementById("viewBtn").click(); // refresh list
        }
    }
});

