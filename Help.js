document.addEventListener("DOMContentLoaded", () => {
        const usernameSpan = document.getElementById("username");
        if (usernameSpan) {
            const user = localStorage.getItem("currentUser") || "User";
            usernameSpan.textContent = user;
        }
    });

    function toggleDrop(id) {
    const box = document.getElementById(id);
    box.classList.toggle('open');
}