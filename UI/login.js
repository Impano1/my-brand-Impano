// const localStorageDatas = localStorage.getItem("userData");

// if (!localStorageDatas) {
//   const initialUserData = [
//     {
//       name: "Impano Chretien Fidel",
//       email: "lechretien200@gmail.com",
//       password: "12345", // This might be hashed in a real-world scenario
//       isAdmin: true,
//     },
//     // other user data...
//   ];

//   localStorage.setItem("userData", JSON.stringify(initialUserData));
// }

// let signinbtn = document.getElementById("signinbtn");
// let title = document.getElementById("title");

// signinbtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   saveData();
// });

// function saveData() {
//   const email = document.getElementById("emailInput").value;
//   const password = document.getElementById("passwordInput").value;

//   const userData = {
//     email: email,
//     password: password,
//   };

//   const datas = JSON.parse(localStorage.getItem("userData"));

//   console.log("userData:", userData); // Log userData

//   const currentUser = datas.find((elt) => elt.email === userData.email);

//   console.log("currentUser:", currentUser); // Log currentUser

//   if (currentUser) {
//     // Fix the comparison to use the correct property name
//     if (currentUser.password === userData.password) {
//       // Check isAdmin in checkAuthentication function
//       if (checkAuthentication(currentUser)) {
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         location.href = "dashboard.html";
//       } else {
//         alert("User is not authorized to access the dashboard");
//       }
//     } else {
//       alert("Wrong email or password");
//     }
//   } else {
//     alert("Wrong email or password");
//   }

//   console.log(userData);
// }

// function checkAuthentication(user) {
//   return user.isAdmin;
// }

const localStorageDatas = localStorage.getItem("userData");

if (!localStorageDatas) {
  const initialUserData = [
    {
      name: "Impano Chretien Fidel",
      email: "winter@gmail.com",
      password: "12345", // This might be hashed in a real-world scenario
      isAdmin: true,
    },
    // other user data...
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
    // Compare hashed or encrypted passwords in a real-world scenario
    if (currentUser.password === password) {
      if (checkAuthentication(currentUser)) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        location.href = "dashboard.html";
      } else {
        alert("User is not authorized to access the dashboard");
      }
    } else {
      alert("Wrong email or password");
    }
  } else {
    alert("User not found");
  }
}

function checkAuthentication(user) {
  return user.isAdmin;
}
