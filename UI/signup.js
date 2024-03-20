const form = document.getElementById("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

// Function to display error messages

// Retrieving input elements
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
// const dateInput = document.getElementById('date');

// Getting trimmed values from input fields
const username = usernameInput ? usernameInput.value.trim() : "";
const email = emailInput ? emailInput.value.trim() : "";
const password = passwordInput ? passwordInput.value.trim() : "";

const handleUser = (e) => {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passToggleBtn = document.getElementById("passToggleBtn");

  // if (!usernameInput || !emailInput || !passwordInput || !passToggleBtn) {
  //   console.error("Missing required input element(s)");
  //   return;
  // }

  const username = usernameInput ? usernameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  document.querySelectorAll(".form-group .error").forEach((field) => {
    field.classList.remove("error");
  });
  document.querySelectorAll(".error-text").forEach((errorText) => {
    errorText.remove();
  });

  // if (username === "") {
  //   showError(usernameInput, "Enter your full name");
  //   return;
  // }
  // if (!emailPattern.test(email)) {
  //   showError(emailInput, "Enter a valid email address");
  //   return;
  // }
  // if (password === "") {
  //   showError(passwordInput, "Enter your password");
  //   return;
  // }

  let role = "user";
  if (email === "admin@gmail.com") {
    role = "admin";
  }

  let user_records = JSON.parse(localStorage.getItem("users")) || [];
  if (!Array.isArray(user_records)) {
    user_records = [];
  }

  // passToggleBtn.addEventListener("click", () => {
  //   passToggleBtn.className =
  //     passwordInput.type === "password"
  //       ? "fa-solid fa-eye-slash"
  //       : "fa-solid fa-eye";
  //   passwordInput.type =
  //     passwordInput.type === "password" ? "text" : "password";
  // });

  sendData();
};
// Handling form submission event
form.addEventListener("submit", handleUser);
function sendData() {
  alert("sending info");
  let userdata = {
    username: usernameInput?.value ?? "",
    email: emailInput?.value ?? "",
    password: passwordInput?.value ?? "",
  };
  console.log(userdata);
  fetch("https://mybrand-api-backend.onrender.com/signup", {
    method: "POST",
    body: JSON.stringify(userdata),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.message == "User registered successfully") {
        window.location.href = "./login.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
