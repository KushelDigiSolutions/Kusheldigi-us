let correctAnswer = 0;
let isCaptchaVerified = false; 
 
function generateCaptcha() {
    const firstNo = Math.floor(Math.random() * 10);
    const secondNo = Math.floor(Math.random() * 10);
    correctAnswer = firstNo + secondNo;
    document.getElementById("captchaQuestion").innerText = `${firstNo} + ${secondNo} =`;
    document.getElementById("captchaAnswer").value = "";
}
 
function verifyCaptcha() {
    const userAnswer = parseInt(document.getElementById("captchaAnswer").value);
    if (userAnswer !== correctAnswer) {
        alert("Wrong Captcha! Try again.");
        generateCaptcha();
        return false;
    }
    alert('Captcha Verified!!');
    isCaptchaVerified = true;
    return true;
}
 
const captchaBtn = document.querySelector('.captcha-btn');
captchaBtn.addEventListener('click', () => {
    if (verifyCaptcha()) {
        captchaBtn.disabled = true;  
    }
});