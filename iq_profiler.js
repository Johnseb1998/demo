async function calculateIQProfile(e) {
    e.preventDefault();
    
    const verbalIQ = parseInt(document.getElementById('verbal_iq').value);
    const perfIQ = parseInt(document.getElementById('perf_iq').value);
    const fullScaleIQ = parseInt(document.getElementById('full_scale_iq').value);
    
    let interpretation = "";
    if (fullScaleIQ < 70) interpretation = "IQ is below 70. Requires developmental training.";
    else if (fullScaleIQ < 85) interpretation = "IQ is between 70-85. SLD Index not indicated.";
    else interpretation = "IQ is 85+. The child meets criteria for SLD Testing.";

    const resultBox = document.getElementById('iqResult');
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <h3 style="margin-top:0;">Evaluation Complete</h3>
        <p><strong>Full Scale IQ:</strong> ${fullScaleIQ}</p>
        <p><strong>Recommendation:</strong> ${interpretation}</p>
    `;

    // Package and send data
    const payload = { test_type: "IQ_Profile", full_scale_iq: fullScaleIQ };
    try {
        await fetch('/api/save_assessment', { method: 'POST', body: JSON.stringify(payload) });
    } catch (err) { console.error(err); }
}