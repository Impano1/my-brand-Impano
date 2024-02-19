const localStorageDatas = localStorage.getItem("userData");
if (!localStorageDatas) {
  localStorage.setItem("userData", JSON.stringify([]));
}
let signinbtn = document.getElementById("signinbtn");
let title = document.getElementById("title");

signinbtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveData();
});

function saveData() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  const userData = {
    email: email,
    password: password,
  };

  const datas = JSON.parse(localStorage.getItem("userData"));

  const currentUser = datas.find((elt) => elt.email === userData.email);

  if (currentUser) {
    if (currentUser.password === userData.password) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      location.href = "dashboard.html";
    } else {
      alert("Wrong email or password");
    }
  } else {
    alert("Wrong email or password");
  }

  console.log(userData);
}