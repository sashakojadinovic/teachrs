
let current = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const feedback = document.getElementById("feedback");
const reviewLink = document.getElementById("review-link");

function showQuestion() {
    const q = questions[current];
    questionText.textContent = q.text;
    answersDiv.innerHTML = "";

    q.answers.forEach((ans, index) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.onmouseover = () => (btn.style.background = "#eee");
        btn.onmouseout = () => (btn.style.background = "#fff");

        btn.onclick = () => {
            // On click disable all buttons
            Array.from(answersDiv.children).forEach(b => b.disabled = true);

            if (index === q.correct) {
                score++;
                btn.style.background = "#c8e6c9"; // zelena
                btn.style.borderColor = "#388e3c";
            } else {
                btn.style.background = "#ffcdd2"; // crvena
                btn.style.borderColor = "#d32f2f";

                // Obeleži tačan odgovor
                Array.from(answersDiv.children).forEach((b, i) => {
                    if (i === q.correct) {
                        b.style.background = "#c8e6c9";
                        b.style.borderColor = "#388e3c";
                    }
                });
            }

            setTimeout(() => {
                current++;
                if (current < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }, 1200);
        };
        answersDiv.appendChild(btn);
    });
}


function showResult() {
    questionText.textContent =
        "You scored " + score + " out of " + questions.length + ".";
    answersDiv.innerHTML = "";
    resultDiv.style.display = "block";

    const successRatio = score / questions.length;

    if (successRatio >= 0.66) {
        feedback.textContent = "Great job!.";
        reviewLink.style.display = "none";
    } else {
        feedback.textContent = "Looks like you could use a bit more practice.";
        reviewLink.style.display = "inline";
        reviewLink.onclick = (e) => {
            e.preventDefault();
            resetQuiz();
            window.scrollTo({ top: 0, behavior: "smooth" });

        };
    }
}

function resetQuiz() {
    current = 0;
    score = 0;
    resultDiv.style.display = "none";
    reviewLink.style.display = "none";
    feedback.textContent = "";
    showQuestion();
}

showQuestion();