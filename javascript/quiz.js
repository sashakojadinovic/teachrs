 const questions = [
            {
                text: "Koji je hemijski simbol za vodonik?",
                answers: ["H", "He", "O", "N"],
                correct: "H",
            },
            {
                text: "Koliko protona ima atom ugljenika (C)?",
                answers: ["6", "12", "8", "7"],
                correct: "6",
            },
            {
                text: "Koji element koristimo za pravljenje stakla?",
                answers: ["Natrijum", "Silicijum", "Hlor", "Kalcijum"],
                correct: "Silicijum",
            },
        ];

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

            q.answers.forEach((ans) => {
                const btn = document.createElement("button");
                btn.textContent = ans;
                btn.style.padding = "0.5rem 1rem";
                btn.style.border = "1px solid #ccc";
                btn.style.borderRadius = "8px";
                btn.style.background = "#fff";
                btn.style.cursor = "pointer";
                btn.onmouseover = () => (btn.style.background = "#eef");
                btn.onmouseout = () => (btn.style.background = "#fff");

                btn.onclick = () => {
                    // On click disable all buttons to prevent multiple clicks
                    Array.from(answersDiv.children).forEach(b => b.disabled = true);

                    // Mark the clicked button green or red
                    if (ans === q.correct) {
                        score++;
                        btn.style.background = "#c8e6c9"; // svetlo zelena
                        btn.style.borderColor = "#388e3c"; // tamno zelena
                    } else {
                        btn.style.background = "#ffcdd2"; // svetlo crvena
                        btn.style.borderColor = "#d32f2f"; // tamno crvena

                        // Opcionalno: označi tačan odgovor
                        Array.from(answersDiv.children).forEach(b => {
                            if (b.textContent === q.correct) {
                                b.style.background = "#c8e6c9";
                                b.style.borderColor = "#388e3c";
                            }
                        });
                    }

                    // Nakon 1.2 sekundi ide na sledeće pitanje ili rezultat
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
                "Gotovo! Tvoj rezultat je: " + score + " od " + questions.length + ".";
            answersDiv.innerHTML = "";
            resultDiv.style.display = "block";

            const successRatio = score / questions.length;

            if (successRatio >= 0.66) {
                feedback.textContent = "Odlično! Savladao si gradivo.";
                reviewLink.style.display = "none";
            } else {
                feedback.textContent = "Izgleda da ti treba još malo vežbe.";
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