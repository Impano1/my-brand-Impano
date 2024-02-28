document.querySelectorAll(".post").forEach((post) => {
  const postId = post.dataset.postId;
  const ratings = post.querySelectorAll(".post-rating");
  const likeRating = ratings[0];

  ratings.forEach((rating) => {
    const button = rating.querySelector(".post-rating-button");
    const count = rating.querySelector(".post-rating-count");

    button.addEventListener("click", async () => {
      if (rating.classList.contains("post-rating-selected")) {
        return;
      }

      count.textContent = Number(count.textContent) + 1;

      ratings.forEach((rating) => {
        if (rating.classList.contains("post-rating-selected")) {
          const count = rating.querySelector(".post-rating-count");
          count.textContent = Math.max(0, Number(count.textContent) - 1);
          rating.classList.remove("post-rating-selected");
        }
      });

      rating.classList.add("post-rating-selected");
      const likeOrDislike = likeRating === rating ? "like" : "dislike";
      const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
      const body = await response.json();
    });
  });
});

button.addEventListener("click", async () => {
  if (rating.classList.contains("post-rating-selected")) {
    return;
  }

  count.textContent = Number(count.textContent) + 1;

  ratings.forEach((rating) => {
    if (rating.classList.contains("post-rating-selected")) {
      const count = rating.querySelector(".post-rating-count");
      count.textContent = Math.max(0, Number(count.textContent) - 1);
      rating.classList.remove("post-rating-selected");
    }
  });

  rating.classList.add("post-rating-selected");
  const likeOrDislike = likeRating === rating ? "like" : "dislike";
  const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
  const body = await response.json();
});
const count = rating.querySelector(".post-rating-count");
count.textContent = Number(count.textContent) + 1;

ratings.forEach((rating) => {
  if (rating.classList.contains("post-rating-selected")) {
    const count = rating.querySelector(".post-rating-count");
    count.textContent = Math.max(0, Number(count.textContent) - 1);
    rating.classList.remove("post-rating-selected");
  }
});

rating.classList.add("post-rating-selected");
const likeOrDislike = likeRating === rating ? "like" : "dislike";
const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
const body = await response.json();

const newPost = await createPost("New Post", "This is a new post.");
console.log(newPost);

const updatedPost = await updatePost(
  newPost.id,
  "Updated Post",
  "This is an updated post."
);
console.log(updatedPost);

const deletedPostId = await deletePost(newPost.id);
console.log(deletedPostId);
