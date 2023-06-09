async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.pathname.split("/").pop();
  const title = document.querySelector('input[name="post-title"]')?.value.trim() ?? '';
  const content = document.querySelector('input[name="content"]')?.value.trim() ?? '';

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".edit-post-form")?.addEventListener("submit", editFormHandler);
