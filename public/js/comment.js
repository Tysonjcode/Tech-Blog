const commentForm = document.querySelector(".comment-form");

async function postComment(comment_text, post_id) {
  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      post_id,
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    alert(response.statusText);
    document.querySelector("#comment-form").style.display = "block";
  }
}

function handleCommentSubmit(event) {
  event.preventDefault();

  const commentInput = document.querySelector('input[name="comment-body"]');
  const comment_text = commentInput.value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    postComment(comment_text, post_id).then(() => {
      document.location.reload();
    });
  }
}

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentSubmit);
}
