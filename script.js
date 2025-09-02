// --- Smooth Scroll ---
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- Challenge Logic ---
const CORRECT_CODE = "found_it"; // <-- Change this to your real code!
const form = document.getElementById('ctf-form');
const feedback = document.getElementById('feedback');
const rewardSection = document.getElementById('reward');
const confettiCanvas = document.getElementById('confetti-canvas');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const code = document.getElementById('ctf-code').value.trim();
  if (code.toLowerCase() === CORRECT_CODE) {
    feedback.textContent = "Access granted! 🎉";
    showReward();
  } else {
    feedback.textContent = "Incorrect code. Try again!";
    feedback.style.color = "#ff3860";
  }
});

// --- Show Reward Section ---
function showReward() {
  document.getElementById('challenge').classList.add('hidden');
  rewardSection.classList.remove('hidden');
  launchConfetti();
  scrollToSection('reward');
}

// --- Confetti Animation ---
function launchConfetti() {
  const canvas = confettiCanvas;
  canvas.width = rewardSection.offsetWidth;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  let pieces = [];
  for (let i = 0; i < 60; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height / 2,
      r: 6 + Math.random() * 8,
      d: Math.random() * 2 * Math.PI,
      color: `hsl(${Math.random()*360},100%,60%)`
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += 2 + Math.sin(frame/10 + p.d)*2;
      p.x += Math.sin(frame/15 + p.d)*2;
      if (p.y > canvas.height) p.y = 0;
      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
    }
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
  }
  draw();
}

// --- Hacker Console Animation ---
const consoleLines = [
  "Initializing Level 5 CTF...",
  "Verifying previous levels...",
  "Accessing final gate...",
  "Decrypting challenge...",
  "Ready. Awaiting input."
];
let consoleIndex = 0, charIndex = 0;
const consoleDiv = document.getElementById('console-animation');
function typeConsole() {
  if (consoleIndex < consoleLines.length) {
    if (charIndex < consoleLines[consoleIndex].length) {
      consoleDiv.textContent += consoleLines[consoleIndex][charIndex];
      charIndex++;
      setTimeout(typeConsole, 40);
    } else {
      consoleDiv.textContent += "\n";
      consoleIndex++;
      charIndex = 0;
      setTimeout(typeConsole, 400);
    }
  }
}
typeConsole();

// --- WhatsApp Link Placeholder ---
// Replace '#' with your real WhatsApp group link in both places!
document.getElementById('whatsapp-link').href = "#";
document.getElementById('whatsapp-link-final').href = "#";
