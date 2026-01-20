let currentPage = 0;
const pages = document.querySelectorAll(".page");
const pageIndicator = document.getElementById("pageIndicator");

function showPage(index) {
    pages.forEach((page, i) => {
        page.hidden = i !== index;
    });
    pageIndicator.textContent = `Page ${index + 1} of ${pages.length}`;
}

function saveAnswers() {
    const form = document.getElementById("quizForm");
    const data = new FormData(form);

    for (let [key, value] of data.entries()) {
        localStorage.setItem(key, value);
    }
}

function loadAnswers() {
    pages.forEach(page => {
        const inputs = page.querySelectorAll("input[type='radio']");
        inputs.forEach(input => {
            if (localStorage.getItem(input.name) === input.value) {
                input.checked = true;
            }
        });
    });
}

function nextPage() {
    saveAnswers();

    if (currentPage === pages.length - 2) {
        window.location.href = "results.html";
        return;
    }

    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function calculateScore() {
    let total = 0;
    const questions = 4;

    for (let i = 1; i <= questions; i++) {
        const value = localStorage.getItem("q" + i);
        if (value) {
            total += parseInt(value);
        }
    }

    document.getElementById("score").textContent =
        `Score: ${total} / ${questions * 4}`;

    let resultText = "";
    if (total >= 13) {
        resultText = "amazing mental health idk";
    } else if (total >= 9) {
        resultText = "Y=okay mental health";
    } else {
        resultText = "go to the psych ward yo ";
    }

    document.getElementById("result").textContent = resultText;
}

loadAnswers();
showPage(currentPage);
