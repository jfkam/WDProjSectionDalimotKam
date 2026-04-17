document.addEventListener("DOMContentLoaded", () => {

    let currentPage = 0;
    const pages = document.querySelectorAll(".page");
    const pageIndicator = document.getElementById("pageIndicator");

    function showPage(index) {
        pages.forEach((page, i) => page.hidden = i !== index);
        pageIndicator.textContent = `Page ${index + 1} of ${pages.length}`;
    }

    function saveAnswers() {
        const currentInputs = pages[currentPage].querySelectorAll("input[type='radio']");
        const selected = Array.from(currentInputs).find(input => input.checked);
        if (selected) {
            localStorage.setItem(selected.name, selected.value);
        }
    }

    function loadAnswers() {
        pages.forEach(page => {
            page.querySelectorAll("input[type='radio']").forEach(input => {
                if (localStorage.getItem(input.name) === input.value) {
                    input.checked = true;
                }
            });
        });
    }

    
    window.nextPage = function () {
        saveAnswers();
        document.getElementById("confirmBox").style.display = "block";
    };

    window.prevPage = function () {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    };

    // Edit button 
    document.getElementById("editBtn").onclick = () => {
        document.getElementById("confirmBox").style.display = "none";
    };

    // Proceed button 
    document.getElementById("proceedBtn").onclick = () => {
        document.getElementById("confirmBox").style.display = "none";

        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        } else {
            window.location.href = "results.html";
        }
    };

    loadAnswers();
    showPage(currentPage);

});

document.getElementById("quizForm").addEventListener("submit", (e) => {
    e.preventDefault();
});