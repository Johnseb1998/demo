// mcmi3.js - Isolated test logic

const mcmiItems = [
    { id: 1, text: "Lately, my strength seems to be draining out of me, even in the morning.", scale: "Major Depression" },
    { id: 2, text: "I think highly of rules because they are a good guide to follow.", scale: "Compulsive" },
    // ... Add all 175 items here from your source files ...
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('quizQuestions');
    mcmiItems.forEach((item, index) => {
        container.innerHTML += `
            <div class="question-block">
                <p>${item.id}. ${item.text}</p>
                <label><input type="radio" name="q${item.id}" value="true"> True</label>
                <label><input type="radio" name="q${item.id}" value="false"> False</label>
            </div>
        `;
    });
});

async function calculateMCMI() {
    let scores = {}; // Initialize counters for all 24 scales[cite: 6]
    
    // Logic to tally weight-2 prototypal items and weight-1 non-prototypal items[cite: 6]
    // Fetch user answers and process against the MCMI scoring keys
    
    alert("Calculating raw scores based on Millon scoring guidelines...");
    
    // Save to server
    const payload = { test_type: "MCMI-III", raw_scores: scores };
    await fetch('/api/save_assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}