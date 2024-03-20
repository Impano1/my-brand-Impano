const localStorageDatas = localStorage.getItem("userData");

if (!localStorageDatas) {
  const initialUserData = [
    {
      name: "Impano Chretien Fidel",
      email: "winter@gmail.com",
      password: "12345",
      isAdmin: true,
    },
  ];

  localStorage.setItem("userData", JSON.stringify(initialUserData));
}

document.getElementById("signinbtn").addEventListener("click", (e) => {
  e.preventDefault();
  saveData();
});

function saveData() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  const datas = JSON.parse(localStorage.getItem("userData"));
  const currentUser = datas.find((elt) => elt.email === email);

  if (currentUser) {
    if (currentUser.password === password) {
      if (checkAuthentication(currentUser)) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        location.href = "dashboard.html";
      } else {
        location.href = "findmore.html";
      }
    } else {
      alert("Wrong email or password");
    }
  } else {
    alert("User not found");
  }
}

// document.addEventListener("DOMContentLoaded", function () {

// });

function checkAuthentication(user) {
  return user.isAdmin;
}
