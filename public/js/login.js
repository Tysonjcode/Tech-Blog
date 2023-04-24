// login submission
async function loginFormHandler(event) {
  event.preventDefault();

  // get form values using destructuring
  const [username, password] = Array.from(
    event.currentTarget.querySelectorAll("input")
  ).map((input) => input.value.trim());

  // send login request
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    // redirect to dashboard if login is successful
    document.location.replace("/dashboard");
  } catch (err) {
    alert(err.message);
  }
}

const loginForm = document.querySelector("#login-form");

if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);
}
