const baiQuestions = [
    ["I do not feel numbness or tingling", "I mildly feel numbness", "I moderately feel numbness", "I severely feel numbness"],
    ["I do not experience feeling hot", "I mildly experience feeling hot", "I moderately experience feeling hot", "I severely experience feeling hot"],
    ["I do not feel wobbliness in legs", "I mildly experience wobbliness", "I moderately experience wobbliness", "I severely experience wobbliness"],
    ["I am able to relax", "I am mildly unable to relax", "I am moderately unable to relax", "I am severely unable to relax"]
    // Add the remaining 17 questions here
];

// Render questions when page loads
document.addEventListener("DOMContentLoaded", () => {
    let html = '';
    baiQuestions.forEach((q, index) => {
        html += `<div class="question-block" style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">`;
        html += `<p><strong>Symptom ${index + 1}</strong></p>`;
        q.forEach((optionText, optIndex) => {
            html += `<label style="display: block;"><input type="radio" name="q${index}" value="${optIndex}"> ${optIndex} - ${optionText}</label>`;
        });
        html += `</div>`;
    });
    document.getElementById('quizQuestions').innerHTML = html;
});

async function calculateBAI() {
    let score = 0;
    let answers = {};
    let answeredAll = true;

    for (let i = 0; i < baiQuestions.length; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
            score += parseInt(selected.value);
            answers[`q${i}`] = parseInt(selected.value);
        } else {
            answeredAll = false;
        }
    }

    if (!answeredAll) {
        alert("Please answer all questions.");
        return;
    }

    let interpretation = "";
    if (score <= 21) interpretation = "Low anxiety.";
    else if (score <= 35) interpretation = "Moderate anxiety.";
    else interpretation = "Potentially concerning levels of anxiety.";

    const resultBox = document.getElementById('testResult');
    resultBox.style.display = 'block';
    resultBox.innerHTML = `<h3>Score: ${score}</h3><p>${interpretation}</p>`;

    // Save to server
    const payload = { test_type: "BAI", total_score: score, raw_answers: answers };
    try {
        await fetch('/api/save_assessment', { method: 'POST', body: JSON.stringify(payload) });
    } catch (error) { console.error(error); }
}