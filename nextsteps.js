
const q1 = parseInt(localStorage.getItem("q1")) || 0;
const q2 = parseInt(localStorage.getItem("q2")) || 0;
const q3 = parseInt(localStorage.getItem("q3")) || 0;
const q4 = parseInt(localStorage.getItem("q4")) || 0;
const q5 = parseInt(localStorage.getItem("q5")) || 0;


const anxietyScore = q2 + q4;
const depressionScore = (8 - (q1 + q3)) + q5; 


if (anxietyScore >= 6) {
  document.getElementById("anxietyHigh").style.display = "block";
} else {
  document.getElementById("anxietyLow").style.display = "block";
}


if (depressionScore >= 6) {
  document.getElementById("depressionHigh").style.display = "block";
} else {
  document.getElementById("depressionLow").style.display = "block";
}

document.getElementById("generalTips").style.display = "block";

document.getElementById("exitBtn").addEventListener("click", () => {
    window.location.href = "Home.html";
});
