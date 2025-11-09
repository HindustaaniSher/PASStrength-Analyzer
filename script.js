function analyzePassword() {
  const password = document.getElementById("passwordInput").value;
  const meter = document.getElementById("strengthMeter");
  const text = document.getElementById("strengthText");

  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const strengthLabels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const strengthColors = ["#ff4d4d", "#ff884d", "#ffd633", "#66cc66", "#00cc99"];
  const strengthIcons = ["😵", "😬", "😐", "🙂", "💪"];

  let label = strengthLabels[score - 1] || "";
  let color = strengthColors[score - 1] || "#eee";
  let icon = strengthIcons[score - 1] || "";

  meter.style.width = (score / 5) * 100 + "%";
  meter.style.backgroundColor = color;

  document.getElementById("strengthLabel").textContent = label;
  document.getElementById("strengthIcon").textContent = icon;


  // Checklist validation
  document.getElementById("length").className = password.length >= 8 ? "valid" : "invalid";
  document.getElementById("lower").className = /[a-z]/.test(password) ? "valid" : "invalid";
  document.getElementById("upper").className = /[A-Z]/.test(password) ? "valid" : "invalid";
  document.getElementById("digit").className = /[0-9]/.test(password) ? "valid" : "invalid";
  document.getElementById("symbol").className = /[^A-Za-z0-9]/.test(password) ? "valid" : "invalid";
}

function generateWordlist() {
  const base = document.getElementById("baseWord").value;
  const variations = [];

  const symbols = ["!", "@", "#", "123", "2024"];
  const swaps = { a: "@", s: "$", o: "0", i: "1", e: "3" };

  if (!base) return;

  variations.push(base);
  variations.push(base.toUpperCase());
  variations.push(base.toLowerCase());

  for (let sym of symbols) {
    variations.push(base + sym);
    variations.push(sym + base);
  }

  let swapped = base.split("").map(c => swaps[c] || c).join("");
  variations.push(swapped);

  const blob = new Blob([variations.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Set up download link
  const link = document.getElementById("downloadLink");
  link.href = url;
  link.style.display = "inline-block";

  // Live preview of wordlist
  const preview = document.getElementById("wordlistPreview");
  preview.textContent = variations.join("\n");
  preview.style.display = "block";
}


// Dark Mode Toggle
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");

  // Save preference
  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

// Load saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
};

function exportReport() {
  const password = document.getElementById("passwordInput").value;
  const strength = document.getElementById("strengthLabel").textContent || "N/A";

  const checklist = {
    length: document.getElementById("length").className === "valid" ? "✅" : "❌",
    upper: document.getElementById("upper").className === "valid" ? "✅" : "❌",
    lower: document.getElementById("lower").className === "valid" ? "✅" : "❌",
    digit: document.getElementById("digit").className === "valid" ? "✅" : "❌",
    symbol: document.getElementById("symbol").className === "valid" ? "✅" : "❌",
  };

  const content = `
Password Analysis Report
-------------------------
Password: ${password ? password : "[No input]"}
Strength: ${strength}

Checklist:
- Contained Numbers:  ${checklist.digit}
- Contained Lowercase Letters:  ${checklist.lower}
- Contained Uppercase Letters:  ${checklist.upper}
- Contained Special Characters:  ${checklist.symbol}
- Contained Atleast 8 Characters:  ${checklist.length}

With Love, by @HindustaaniSher 🦁 ✨ 💙...
  `.trim();

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "Password_Analysis_Report.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


