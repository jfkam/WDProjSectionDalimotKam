  document.addEventListener("DOMContentLoaded", () => {
            const usernameSpan = document.getElementById("username");
            if (usernameSpan) {
                const user = localStorage.getItem("currentUser") || "User";
                usernameSpan.textContent = user;
            }
        });