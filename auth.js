// auth.js - Shared across all pages

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

// Chat Widget Logic
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
        let aiResponse = "I hear you. Can you tell me a little more about how that makes you feel?";
        body.innerHTML += `<p style="background: var(--bg-light); padding: 8px; border-radius: 4px; margin: 8px 0;"><strong>Healing Mind AI:</strong> ${aiResponse}</p>`;
        body.scrollTop = body.scrollHeight;
    }, 1200);
}