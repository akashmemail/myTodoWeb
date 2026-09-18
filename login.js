console.log("login page");

async function loginbtns() {
  const email = document.getElementById("email").value;
  console.log(email);

  const password = document.getElementById("password").value;
  console.log(password);

  try {
    const res = await fetch("http://localhost:8080/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();

    // console.log(result);
    if (result.success) {
      localStorage.setItem("token", result.token);

      console.log(result.token);
      alert(result.message);
      window.location.href = "./todo.html";
    }
  } catch (error) {
    console.log("this login forntend error", error);
  }
}
