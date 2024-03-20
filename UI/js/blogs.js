// JavaScript code

document.addEventListener("DOMContentLoaded", () => {
  const loadMoreButton = document.getElementById("load-more");
  let skip = 0; // Variable to track how many blogs have been loaded

  // Function to fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `https://mybrand-api-backend.onrender.com/blogs?skip=${skip}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Function to render blogs on the frontend
  const renderBlogs = async () => {
    const blogsContainer = document.getElementById("blogs-container");
    const blogsData = await fetchBlogs();

    if (blogsData.length === 0) {
      loadMoreButton.style.display = "none";
      return;
    }

    blogsData.forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog");
      var title = blog.title;
      var description = blog.description;
      var date = new Date(blog.createdAt);
      description = description.substring(0, 100) + "...";
      date = date.toLocaleString();
      blogElement.innerHTML = `
      <article class="blog-post">
      <img src="https://mybrand-api-backend.onrender.com/images/${blog.image}"
      alt="" srcset="">
      <h2>${title}</h2>
      <p>
        ${description}
      </p>
      <button onclick="viewBlog('${blog._id}')">View</button>
      <div class="post-ratings-container">
        <div class="post-rating post-rating-selected">
          <span class="post-rating-button material-icons">thumb_up</span>
          <span class="post-rating-count">${blog.likesNo}</span>
        </div>
        <div class="post-ratings-container">
        <div class="post-rating post-rating-selected">
        <i class='bx bxs-comment'></i>
          <span class="post-rating-count">${blog.commentsNo}</span>
        </div>
       
      </div>
     
    </article>
                </article>
            `;

      blogsContainer.appendChild(blogElement);
    });

    skip += blogsData.length;
  };
  // Function to handle click on the "View" button for a blog

  // Initial render
  renderBlogs();
});
function viewBlog(blogId) {
  // Redirect the user to viewblog.html with the blogId parameter
  window.location.href = `viewblog.html?blogId=${blogId}`;
}
