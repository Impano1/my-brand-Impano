
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
    const link = findmore.createElement("a");
    link.href = "./findmore.html";
    link.findmore = "blogs";
    link.click();
})