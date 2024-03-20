// view_blog.js

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the blogId parameter from the URL
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogId");

  // Fetch the details of the blog using the blogId parameter
  fetchBlogDetails(blogId);
});

// Function to fetch the details of the blog
function fetchBlogDetails(blogId) {
  fetch(`https://mybrand-api-backend.onrender.com/blogs/${blogId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display the details of the blog
      const blogDetailsElement = document.getElementById("blogDetails");
      blogDetailsElement.innerHTML = `
                <div class="blog-content-container">
                    <p class="blog-title"> ${data.title}</p>
                    <div class="blog-image"><img src="https://mybrand-api-backend.onrender.com/images/${data.image}" alt="Blog Image"></div>
                    <p class="blog-description"> ${data.description}</p>
                </div>
                <div class="blog-reaction">
                <button id="likeButton" onclick="toggleLike('${blogId}')">
                <i class='bx bx-like'></i>
        </button>
        <h4 id="viewCounter">${data.likesNo}</h4>
        <button id="commentButton" onclick="toggleCommentSection()">
        <i class='bx bxs-comment'></i>
        </button>
        <h4 id="commentCounter">${data.commentsNo}</h4>
      
      
      </div>
     
      <div class="comment-form">
        <span>Add Comment Here</span><br />
        <input type="text" id="commentInput" name="comment" /><br />
        <button onclick="addComment('${blogId}')">Submit</button>
        
      </div>
      <div class="commentList" id="commentList"></div>
      
                <!-- Add more details as needed -->
            `;
    })
    .catch((error) => {
      console.error("Error fetching blog details:", error);
    });
}

// Function to handle liking and unliking a blog post
function toggleLike(blogId) {
  // Check if the user has already liked the blog post
  const likeButton = document.getElementById("likeButton");
  const isLiked = likeButton.classList.contains("liked");

  // Send request to like or unlike the blog post based on current state
  if (isLiked) {
    unlikeBlog(blogId);
  } else {
    likeBlog(blogId);
  }
}

// Function to like a blog post
function likeBlog(blogId) {
  console.log(blogId);
  fetch(`https://mybrand-api-backend.onrender.com/likes/${blogId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      likeButton.classList.add("liked"); // Add the 'liked' class to indicate the post is liked
      likeButton.innerHTML = "<i class='bx bxs-like'></i>"; // Change button color to black
      updateLikesCount(blogId);
    })
    .catch((error) => {
      console.error("Error liking blog:", error);
    });
}

// Function to unlike a blog post
function unlikeBlog(blogId) {
  fetch(`https://mybrand-api-backend.onrender.com/likes/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      likeButton.classList.remove("liked"); // Remove the 'liked' class to indicate the post is unliked
      likeButton.innerHTML = "<i class='bx bx-like'></i>"; // Reset button color
      updateLikesCount(blogId);
    })
    .catch((error) => {
      console.error("Error unliking blog:", error);
    });
}

// Function to update the likes count displayed on the page
function updateLikesCount(blogId) {
  fetch(`https://mybrand-api-backend.onrender.com/likes/${blogId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const likesCounter = document.getElementById("viewCounter");
      likesCounter.textContent = data.likesNumber;
    })
    .catch((error) => {
      console.error("Error updating likes count:", error);
    });
}

// Function to add a comment
function addComment(blogId) {
  const commentInput = document.getElementById("commentInput");
  const text = commentInput.value.trim(); // Trim to remove leading and trailing spaces

  if (!text) {
    alert("Please enter a comment");
    return;
  }

  fetch(`https://mybrand-api-backend.onrender.com/comments/${blogId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ text: text }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      commentInput.value = ""; // Clear the input field
      fetchComments(blogId); // Fetch and display all comments again
    })
    .catch((error) => {
      console.error("Error adding comment:", error);
    });
}

// Function to fetch and display comments
function fetchComments(blogId) {
  fetch(`https://mybrand-api-backend.onrender.com/comments/${blogId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((comments) => {
      const commentListElement = document.getElementById("commentList");
      commentListElement.innerHTML = ""; // Clear the previous comments
      comments.forEach((comment) => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item"); // Add a class for styling

        // Create a span for the username
        const usernameSpan = document.createElement("span");
        usernameSpan.textContent = `${comment.user} `;
        usernameSpan.classList.add("username"); // Add a class for styling

        // Create a span for the comment text
        const commentTextSpan = document.createElement("span");
        commentTextSpan.textContent = comment.text;
        commentTextSpan.classList.add("comment-text"); // Add a class for styling

        // Append username span and comment text span to the comment item
        commentItem.appendChild(usernameSpan);
        commentItem.appendChild(commentTextSpan);

        // Append the comment item to the comment list
        commentListElement.appendChild(commentItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("blogId");
  fetchComments(blogId);
});
