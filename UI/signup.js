// const localStorageDatas = localStorage.getItem("userData");
// if (!localStorageDatas) {
//   localStorage.setItem("userData", JSON.stringify([]));
// }
// let signupbtn = document.getElementById("signupbtn");

// signupbtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   saveData();
// });

// function saveData() {
//   const name = document.getElementById("nameInput").value;
//   const email = document.getElementById("emailInput").value;
//   const password = document.getElementById("passwordInput").value;

//   const userData = {
//     name,
//     email,
//     password,
//   };

//   const datas = JSON.parse(localStorage.getItem("userData"));
//   const currentUser = datas.find((elt) => elt.email === userData.email);

//   if (currentUser) {
//     alert("Email currently in user");
//   } else {
//     datas.push(userData);
//     localStorage.setItem("userData", JSON.stringify(datas));
//     location.href = "login.html";
//   }

//   console.log(userData);
// }

const localStorageDatas = localStorage.getItem("userData");
if (localStorageDatas) {
  const currentUser = JSON.parse(localStorageDatas);
  if (currentUser && currentUser.email) {
    location.href = "index.html";
  }
}

let signupbtn = document.getElementById("signupbtn");

signupbtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveData();
});

function saveData() {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  const userData = {
    name,
    email,
    password,
    isAdmin: false,
  };

  const datas = JSON.parse(localStorage.getItem("userData"));
  const currentUser = datas.find((elt) => elt.email === userData.email);

  if (currentUser) {
    alert("Email currently in use");
  } else {
    datas.push(userData);
    localStorage.setItem("userData", JSON.stringify(datas));
    location.href = "login.html";
  }

  console.log(userData);
}
