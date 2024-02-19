const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  location.href = "login.html";
}

console.log(currentUser);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  loadBlogs();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const blogName = document.getElementById("blog-name").value;
    const blogDescription = document.getElementById("blog-description").value;
    const blogLink = document.getElementById("blog-link").value;

    const blogId = Date.now().toString();

    const blogData = {
      id: blogId,
      name: blogName,
      description: blogDescription,
      link: blogLink,
    };

    localStorage.setItem(blogId, JSON.stringify(blogData));

    addBlogToUI(blogData);

    form.reset();
  });

  function loadBlogs() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const blogData = JSON.parse(localStorage.getItem(key));
      addBlogToUI(blogData);
    }
  }

  function addBlogToUI(blogData) {
    const recentBlogsBox = document.querySelector(".recent-blogs-box");

    const blogEntry = document.createElement("div");
    blogEntry.classList.add("blog-entry");
    blogEntry.dataset.blogId = blogData.id;

    blogEntry.innerHTML = `
      <h3>${blogData.name}</h3>
      <p>Description: ${blogData.description}</p>
      <p>Link: <a href="${blogData.link}" target="_blank">${blogData.link}</a></p>
      <button class="edit-btn"><i class="bx bxs-edit-alt"></i></button>
      <button class="delete-btn"><i class="bx bx-trash"></i></button>
    `;

    blogEntry
      .querySelector(".delete-btn")
      .addEventListener("click", function () {
        localStorage.removeItem(blogData.id);
        blogEntry.remove();
      });

    blogEntry.querySelector(".edit-btn").addEventListener("click", function () {
      alert("Editing in progress");
    });

    recentBlogsBox.appendChild(blogEntry);
  }
});
