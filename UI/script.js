
const download = document.querySelector("#download");

download.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "./Impano.pdf";
    link.download = "Impano";
    link.click();
})