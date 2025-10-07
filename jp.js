function showForm(formId) {
  document.querySelectorAll(".form").forEach(form => {
    form.classList.remove("active");
  });
  document.getElementById(formId).classList.add("active");
  document.getElementById("message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const forgotForm = document.getElementById("forgotForm");
  const message = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const response = await fetch('http://localhost:5000/check-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      message.textContent = "Login successful!";
      message.style.color = "green";
    } else {
      message.textContent = "Email or password is incorrect.";
      message.style.color = "red";
    }
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const response = await fetch('http://localhost:5000/save-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      message.textContent = "Signup successful!";
      message.style.color = "green";
    } else {
      message.textContent = "Signup failed.";
      message.style.color = "red";
    }
  });

  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "If this email exists, a reset link will be sent.";
    message.style.color = "blue";
  });
});