const url =
  "https://todo-backend-seven-weld.vercel.app/" || "http://localhost:8080/";

async function submitbtn() {
  const fullname = document.getElementById("fullname").value;
  console.log(fullname);

  const email = document.getElementById("email").value;
  console.log(email);

  const phone = document.getElementById("phone").value;
  console.log(phone);

  const password = document.getElementById("password").value;
  console.log(password);

  try {
    const res = await fetch(
      "https://todo-backend-seven-weld.vercel.app/api/v1/reg",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          password,
        }),
      },
    );

    const result = await res.json();

    alert(result.message);
    if (result.success) {
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.log("this is registion frontend error", error);
  }
}
