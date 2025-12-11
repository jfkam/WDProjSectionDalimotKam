document.getElementById("showSignup").addEventListener("click", () => {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
});

document.getElementById("showLogin").addEventListener("click", () => {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

const msg = document.getElementById("message");

document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    msg.innerHTML = "";

    if (!username || !password) {
        msg.innerHTML = "<div class='error'>Please fill all fields.</div>";
        return;
    }

    if (password.length < 6) {
        msg.innerHTML = "<div class='error'>Password must be at least 6 characters.</div>";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        msg.innerHTML = "<div class='error'>Username already exists.</div>";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    msg.innerHTML = "<div class='success'>Account created! You can now log in.</div>";

    document.getElementById("signupForm").reset();
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    msg.innerHTML = "";

    if (!username || !password) {
        msg.innerHTML = "<div class='error'>Please fill all fields.</div>";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => 
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!user) {
        msg.innerHTML = "<div class='error'>Incorrect username or password.</div>";
        return;
    }

    msg.innerHTML = "<div class='success'>Login successful! Redirecting...</div>";

    localStorage.setItem("currentUser", username);

    setTimeout(() => {
        window.location.href = "Home.html";
    }, 1200);
});