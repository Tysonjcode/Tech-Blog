const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    document.location.replace("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Failed to create post.");
  }
};

document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);
