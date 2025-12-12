 document.addEventListener("DOMContentLoaded", () => {
            const user = localStorage.getItem("currentUser") || "User";
            document.getElementById("username").innerText = user;
        });