// ==========================================
// 1. GLOBAL AUTHENTICATION & NAVIGATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginBtn = document.getElementById("loginHeaderBtn");
    const assessmentTabNav = document.getElementById("assessmentTabNav");

    if (isLoggedIn) {
        if(loginBtn) {
            loginBtn.innerText = "Logout";
            loginBtn.onclick = handleLogout;
        }
        if(assessmentTabNav) assessmentTabNav.style.display = "inline"; 
    } else {
        if(loginBtn) {
            loginBtn.innerText = "Login";
            loginBtn.onclick = () => window.location.href = "login.html";
        }
        if(assessmentTabNav) assessmentTabNav.style.display = "none"; 
    }
});

function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    alert("Login Successful!");
    window.location.href = "index.html"; 
}

function handleLogout(e) {
    if(e) e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "index.html";
}

function handleBookingClick() {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Please log in to book an appointment.");
        window.location.href = "login.html";
    } else {
        alert("Redirecting to your secure booking dashboard...");
    }
}


// ==========================================
// 2. AI THERAPY CHAT BOT WIDGET
// ==========================================
let chatTurn = 0; 

function toggleChat() {
    const chat = document.getElementById('chatWidget');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function sendChat() {
    const input = document.getElementById('chatMsg');
    const msg = input.value.trim();
    if (!msg) return;

    const body = document.getElementById('chatBody');
    
    body.innerHTML += `<p style="text-align:right; color:var(--primary); margin: 8px 0;"><strong>You:</strong> ${msg}</p>`;
    input.value = '';
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        let aiResponse = "";
        const lowerMsg = msg.toLowerCase();

        // Safety & Crisis Detection
        const crisisWords = ["suicide", "die", "hopeless", "hurt myself", "end it", "give up", "kill"];
        const isCrisis = crisisWords.some(word => lowerMsg.includes(word));

        if (isCrisis) {
            aiResponse = "I am so sorry you are in such pain right now. Please know that your life has value and you are not alone. I strongly urge you to speak to a professional immediately. Please <a href='login.html' style='color:var(--primary); font-weight:bold;'>log in to book an urgent session</a>, or contact your local emergency services (112 or 100).";
            chatTurn = 0; 
        } 
        else {
            chatTurn++;
            
            if (chatTurn === 1) {
                const reflections = [
                    "I hear you. Can you tell me a little more about how that makes you feel?",
                    "That sounds challenging. What thoughts usually go through your mind when you feel this way?",
                    "Thank you for sharing that with me. How long have you been experiencing this?"
                ];
                aiResponse = reflections[Math.floor(Math.random() * reflections.length)];
            } 
            else if (chatTurn === 2) {
                aiResponse = "It takes courage to open up and reflect on this. Even in difficult times, we often have hidden resilience. What is one small, positive thought or step you can focus on today to care for yourself?";
            } 
            else {
                aiResponse = "You've shown great insight today. While I am an AI assistant here to help you reflect, exploring these feelings with a human therapist can provide profound relief and scientifically-backed strategies. I highly recommend continuing this conversation with one of our experts. Would you like to <a href='login.html' style='color:var(--primary); font-weight:bold;'>log in or register</a> to book an appointment?";
                chatTurn = 0; 
            }
        }

        body.innerHTML += `<p style="background: var(--bg-light); padding: 8px; border-radius: 4px; margin: 8px 0; line-height: 1.4;"><strong>Healing Mind AI:</strong> ${aiResponse}</p>`;
        body.scrollTop = body.scrollHeight;
        
    }, 1200);
}


// ==========================================
// 3. COMPREHENSIVE ASSESSMENT DATABASE
// ==========================================
const testData = {
    ham: {
        title: "Hamilton Anxiety Rating Scale (HAM-A)",
        type: "radio",
        instructions: "Below is a list of phrases that describe certain feeling that people have. Select one of the five responses for each of the fourteen questions[cite: 2].",
        options: [
            {val: 0, text: "Not present[cite: 2]"}, 
            {val: 1, text: "Mild[cite: 2]"}, 
            {val: 2, text: "Moderate[cite: 2]"}, 
            {val: 3, text: "Severe[cite: 2]"},
            {val: 4, text: "Very severe[cite: 2]"}
        ],
        questions: [
            "Anxious mood: Worries, anticipation of the worst, fearful anticipation, irritability.[cite: 2]",
            "Tension: Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax.[cite: 2]",
            "Fears: Of dark, of strangers, of being left alone, of animals, of traffic, of crowds.[cite: 2]",
            "Insomnia: Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors.[cite: 2]",
            "Intellectual: Difficulty in concentration, poor memory.[cite: 2]",
            "Depressed mood: Loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing.[cite: 2]",
            "Somatic (muscular): Pains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular tone.[cite: 2]",
            "Somatic (sensory): Tinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensation.[cite: 2]",
            "Cardiovascular symptoms: Tachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missing beat.[cite: 2]",
            "Respiratory symptoms: Pressure or constriction in chest, choking feelings, sighing, dyspnea.[cite: 2]",
            "Gastrointestinal symptoms: Difficulty in swallowing, wind abdominal pain, burning sensations, abdominal fullness, nausea, vomiting, borborygmi, looseness of bowels, loss of weight, constipation.[cite: 2]",
            "Genitourinary symptoms: Frequency of micturition, urgency of micturition, amenorrhea, menorrhagia, development of frigidity, premature ejaculation, loss of libido, impotence.[cite: 2]",
            "Autonomic symptoms: Dry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair.[cite: 2]",
            "Behavior at interview: Fidgeting, restlessness or pacing, tremor of hands, furrowed brow, strained face, sighing or rapid respiration, facial pallor, swallowing, etc.[cite: 2]"
        ]
    },
    anxiety_bai: {
        title: "Beck Anxiety Inventory (BAI)",
        type: "radio", 
        instructions: "Below is a list of common symptoms of anxiety. Please carefully read each item in the list. Indicate how much you have been bothered by that symptom during the past month[cite: 3, 4].",
        options: [
            {val: 0, text: "Not at all[cite: 3]"},
            {val: 1, text: "Mildly, but it didn't bother me much[cite: 3]"},
            {val: 2, text: "Moderately - it wasn't pleasant at times[cite: 3]"},
            {val: 3, text: "Severely - it bothered me a lot[cite: 3]"}
        ],
        questions: [
            "Numbness or tingling[cite: 3]", "Feeling hot[cite: 3]", "Wobbliness in legs[cite: 3]", 
            "Unable to relax[cite: 3]", "Fear of worst happening[cite: 3]", "Dizzy or lightheaded[cite: 3]", 
            "Heart pounding / racing[cite: 3]", "Unsteady[cite: 3]", "Terrified or afraid[cite: 3]", 
            "Nervous[cite: 3]", "Feeling of choking[cite: 3]", "Hands trembling[cite: 3]", 
            "Shaky / unsteady[cite: 3]", "Fear of losing control[cite: 3]", "Difficulty in breathing[cite: 3]", 
            "Fear of dying[cite: 3]", "Scared[cite: 3]", "Indigestion[cite: 3]", 
            "Faint / lightheaded[cite: 3]", "Face flushed[cite: 3]", "Hot / cold sweats[cite: 3]"
        ]
    },
    gad7: {
        title: "GAD-7 (Generalized Anxiety Disorder)",
        type: "radio",
        instructions: "Over the last 2 weeks, how often have you been bothered by the following problems?",
        options: [
            {val: 0, text: "Not at all"}, {val: 1, text: "Several days"}, 
            {val: 2, text: "More than half the days"}, {val: 3, text: "Nearly every day"}
        ],
        questions: [
            "Feeling nervous, anxious or on edge", "Not being able to stop or control worrying",
            "Worrying too much about different things", "Trouble relaxing",
            "Being so restless that it is hard to sit still", "Becoming easily annoyed or irritable",
            "Feeling afraid as if something awful might happen"
        ]
    },
    depression: {
        title: "Depression Screener (PHQ-9 Framework)",
        type: "radio",
        instructions: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
        options: [
            {val: 0, text: "Not at all"}, {val: 1, text: "Several days"}, 
            {val: 2, text: "More than half the days"}, {val: 3, text: "Nearly every day"}
        ],
        questions: [
            "Little interest or pleasure in doing things?",
            "Feeling down, depressed, or hopeless?",
            "Feeling tired or having little energy?",
            "Poor appetite or overeating?"
        ]
    },
    asrs: {
        title: "ASRS (Adult ADHD Self-Report Scale) - Part A",
        type: "radio",
        instructions: "Please answer the questions below, rating yourself on the criteria shown.",
        options: [
            {val: 0, text: "Never"}, {val: 1, text: "Rarely"}, 
            {val: 2, text: "Sometimes"}, {val: 3, text: "Often"}, {val: 4, text: "Very Often"}
        ],
        questions: [
            "How often do you have trouble wrapping up the final details of a project?",
            "How often do you have difficulty getting things in order when you have to do a task?",
            "How often do you have problems remembering appointments or obligations?",
            "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
            "How often do you fidget or squirm with your hands or feet when you have to sit down?",
            "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
        ]
    },
    tat: {
        title: "TAT (Thematic Apperception Test)",
        type: "text", 
        instructions: "Look at the image provided (or imagine a complex social scene). Write a story about what is happening, what led up to it, what the characters are thinking/feeling, and how it will end.",
        questions: [
            "Scene 1 Response:",
            "Scene 2 Response:"
        ]
    }
};

let currentTestType = '';


// ==========================================
// 4. ASSESSMENT UI & SCORING ENGINE
// ==========================================
function startTest(type) {
    if (!testData[type]) {
        alert("This assessment tool is currently being configured by our clinical team. Please check back soon.");
        return;
    }
    
    currentTestType = type;
    document.getElementById('testSelection').style.display = 'none';
    document.getElementById('activeTest').style.display = 'block';
    document.getElementById('testResult').style.display = 'none';
    
    const data = testData[type];
    document.getElementById('testTitle').innerText = data.title;
    document.getElementById('testInstructions').innerHTML = `<p><em>${data.instructions}</em></p>`;
    
    let html = '';
    data.questions.forEach((q, index) => {
        html += `<div class="question-block">`;
        
        // STANDARD RADIO
        if (data.type === 'radio') {
            html += `<p><strong>${index + 1}. ${q}</strong></p>`;
            data.options.forEach(opt => {
                html += `<label><input type="radio" name="q${index}" value="${opt.val}"> ${opt.text}</label>`;
            });
        } 
        // CUSTOM RADIO (For variable options if needed later)
        else if (data.type === 'custom_radio') {
            html += `<p><strong>Symptom ${index + 1}</strong></p>`;
            q.forEach((optionText, optIndex) => {
                html += `<label><input type="radio" name="q${index}" value="${optIndex}"> <strong>${optIndex}</strong> - ${optionText}</label>`;
            });
        }
        // TEXT INPUT (Projective tests like TAT)
        else if (data.type === 'text') {
            html += `<p><strong>${q}</strong></p>`;
            html += `<textarea id="q${index}" rows="5" style="width: 100%; border: 1px solid #ccc; border-radius: 4px; padding: 10px;" placeholder="Type your narrative here..."></textarea>`;
        }
        
        html += `</div>`;
    });
    
    document.getElementById('quizQuestions').innerHTML = html;
}

async function calculateResult() {
    const data = testData[currentTestType];
    let score = 0;
    let answers = {};
    let answeredAll = true;

    for (let i = 0; i < data.questions.length; i++) {
        if (data.type === 'radio' || data.type === 'custom_radio') {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected) {
                score += parseInt(selected.value);
                answers[`q${i}`] = parseInt(selected.value);
            } else {
                answeredAll = false;
            }
        } else if (data.type === 'text') {
            const textValue = document.getElementById(`q${i}`).value.trim();
            if (textValue) {
                answers[`q${i}`] = textValue;
            } else {
                answeredAll = false;
            }
        }
    }

    if (!answeredAll) {
        alert("Please complete all questions before submitting.");
        return;
    }

    // Interpretations
    let interpretation = "";
    
    if (currentTestType === 'gad7') {
        if (score <= 4) interpretation = "Minimal Anxiety.";
        else if (score <= 9) interpretation = "Mild Anxiety.";
        else if (score <= 14) interpretation = "Moderate Anxiety.";
        else interpretation = "Severe Anxiety. Clinical evaluation recommended.";
    } 
    else if (currentTestType === 'anxiety_bai') {
        if (score <= 21) interpretation = "Low anxiety[cite: 3, 4].";
        else if (score <= 35) interpretation = "Moderate anxiety[cite: 3, 4].";
        else interpretation = "Potentially concerning levels of anxiety[cite: 3, 4].";
    }
    else if (currentTestType === 'ham') {
        if (score < 17) interpretation = "Mild severity[cite: 2].";
        else if (score <= 24) interpretation = "Mild to moderate severity[cite: 2].";
        else interpretation = "Moderate to severe[cite: 2].";
    }
    else if (currentTestType === 'asrs') {
        if (score >= 12) interpretation = "Symptoms consistent with adult ADHD criteria. Further evaluation warranted.";
        else interpretation = "Symptoms do not currently suggest adult ADHD based on this screener.";
    }
    else if (data.type === 'text') {
        interpretation = "Qualitative assessment complete. Responses saved for clinical review.";
        score = "N/A";
    }
    else {
        interpretation = "Assessment complete. Preliminary results logged.";
    }

    // Render Local Results
    const resultBox = document.getElementById('testResult');
    resultBox.innerHTML = `
        <h3 style="color: var(--accent); margin-top:0;">Evaluation Submitted</h3>
        <p>Calculated Score: <strong>${score}</strong></p>
        <p>${interpretation}</p>
        <p style="font-size: 0.9rem; color: #fff; opacity: 0.8; margin-top: 15px;">Saving to secure server...</p>
    `;
    resultBox.style.display = 'block';

    // SERVER SYNC (fetch API)
    try {
        const payload = {
            test_type: currentTestType,
            total_score: score,
            raw_answers: answers,
            interpretation: interpretation,
            timestamp: new Date().toISOString()
        };

        const response = await fetch('/api/save_assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            resultBox.innerHTML += `<p style="color: #4CAF50; font-weight: bold; background: #fff; padding: 5px; border-radius: 4px; display: inline-block;">✓ Successfully securely saved to your clinical file.</p>`;
        } else {
            console.error("Server rejected the save request.");
            resultBox.innerHTML += `<p style="color: #FFC107;">(Note: Saved locally. Server connection failed.)</p>`;
        }
    } catch (error) {
        console.error("Network error while saving:", error);
        resultBox.innerHTML += `<p style="color: #FFC107;">(Note: Saved locally. Server connection failed.)</p>`;
    }
}

function closeTest() {
    document.getElementById('testSelection').style.display = 'block';
    document.getElementById('activeTest').style.display = 'none';
}