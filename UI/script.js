
const download = document.querySelector("#download");

download.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "./Impano.pdf";
    link.download = "Impano";
    link.click();
})

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    })
    let header = document.querySelector('header');

    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
}
 
const findmore = document.querySelector("#findmore");

findmore.addEventListener("click", () => {
    window.location.href= "./findmore.html";
})

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('show');
})

const form = document.getElementById("contactform");
form.addEventListener("submit", (e) => {
    e.preventDefault();
     validateForm()
})

function validateForm() {
    console.log("working")
    const fullName = document.getElementById("fullName").value.trim();
    console.log(fullName)
    const email = document.getElementById("email").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const emailSubject = document.getElementById("emailSubject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (fullName === "") {
        alert("Please enter your full name");
        return false;
    }

    if (email === "" || !validateEmail(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    if (isNaN(mobileNumber) || mobileNumber.length !== 10) {
        alert("Please enter a valid 10-digit mobile number");
        return false;
    }

    if (emailSubject === "") {
        alert("Please enter the email subject");
        return false;
    }

    if (message === "") {
        alert("Please enter your message");
        return false;
    }

    return true;
}