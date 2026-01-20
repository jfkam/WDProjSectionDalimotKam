

const q1 = parseInt(localStorage.getItem("q1")) || 0;
const q2 = parseInt(localStorage.getItem("q2")) || 0;
const q3 = parseInt(localStorage.getItem("q3")) || 0;
const q4 = parseInt(localStorage.getItem("q4")) || 0;



const anxietyScore = q2 + q4;
const depressionScore = (8 - (q1 + q3)); 


document.getElementById("anxietyBar").style.width =
    (anxietyScore / 8) * 100 + "%";

document.getElementById("depressionBar").style.width =
    (depressionScore / 8) * 100 + "%";


const infoBox = document.getElementById("infoBox");

if (anxietyScore >= 6) {
    infoBox.innerHTML += `
        <div class="message">
            Frequent anxiety can be caused by academic pressure, workload, financial issues or burnout.
        </div>
    `;
}

if (depressionScore >= 6) {
    infoBox.innerHTML += `
        <div class="message">
            A poor sleep schedule and overworking can cause a noticeable shift to your demeanor.
        </div>
    `;
}

infoBox.innerHTML += `
    <div class="message">
        Healthy coping strategies include rest, talking to someone you trust, and practicing self-care.
    </div>
`;

function goNext() {
    window.location.href = "nextsteps.html";
}
