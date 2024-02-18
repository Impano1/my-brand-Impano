const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  location.href = "login.html";
}

console.log(currentUser);
