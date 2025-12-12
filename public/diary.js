
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
        li.textContent = entry.date;

        li.addEventListener("click", () => {
            leftPage.innerHTML = entry.left;
            rightPage.innerHTML = entry.right;
            popup.style.display = "none";
        });

        list.appendChild(li);
    });

    popup.style.display = "flex";
});

document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("entriesPopup").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
            const usernameSpan = document.getElementById("username");
            if (usernameSpan) {
                const user = localStorage.getItem("currentUser") || "User";
                usernameSpan.textContent = user;
            }
        });
