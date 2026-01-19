

    function toggleDrop(id) {
    const box = document.getElementById(id);
    box.classList.toggle('open');
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