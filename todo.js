const tokenuser = localStorage.getItem("token");
const url =
  "https://todo-backend-seven-weld.vercel.app/" || "http://localhost:8080/";

async function addtodo() {
  const title = document.getElementById("title").value;

  const des = document.getElementById("des").value;

  try {
    const res = await fetch(
      "https://todo-backend-seven-weld.vercel.app/api/v1/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenuser}`,
        },
        body: JSON.stringify({
          title,
          des,
        }),
      },
    );

    const result = await res.json();
    console.log(result);

    alert(result.message);
    gettodo();

    document.getElementById("title").value = "";
    document.getElementById("des").value = "";
  } catch (error) {
    console.log("addtodo ka error hii", error);
  }
}

// widow.addtodo = addtodo;

async function gettodo() {
  try {
    const res = await fetch(
      "https://todo-backend-seven-weld.vercel.app/api/v1/get",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenuser}`,
        },
      },
    );

    const result = await res.json();

    const data = (document.getElementById("list").innerHTML = result.data
      .map((item) => {
        return `
        
         <tr>
                      <td>${item.title}</td>
                      <td>${item.des}</td>
                       <td><button onclick="deletes('${item._id}')">delete</button></td>
                       <td><button onclick="edite('${item._id}')">edite</button></td>
                    </tr>
        
        `;
      })
      .join(""));
  } catch (error) {
    console.log("get api error", error);
  }
}
gettodo();

async function deletes(id) {
  try {
    const res = await fetch(
      `https://todo-backend-seven-weld.vercel.app/api/v1/delets/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenuser}`,
        },
      },
    );

    const result = await res.json();
    alert("delete successfully");
    gettodo();
  } catch (error) {
    console.log("delete button err", error);
  }
}

// async function profile(id) {
//   try {
//     const tokenuser = localStorage.getItem("token");

//     const res = await fetch(`http://localhost:8080/api/v1/profile/${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${tokenuser}`,
//       },
//     });

//     const result = await res.json();
//     console.log(result);

//     alert(disply.message);
//     const datas = (document.getElementById("profile").innerHTML =
//       result.data.map((item) => {
//         return `
//        <tr>
//           <td>name${item.name}</td>
//         </tr>

//       `;
//       }));
//   } catch (error) {
//     console.log(error);
//   }
// }
function edite(id) {
  window.location.href = `./edite.html?id=${id}`;
}
async function getEditTodo() {
  const path = new URLSearchParams(window.location.search);
  const id = path.get("id");

  try {
    const res = await fetch(
      "https://todo-backend-seven-weld.vercel.app/api/v1/get",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenuser}`,
        },
      },
    );

    const result = await res.json();

    const todo = result.data.find((item) => item._id === id);

    if (todo) {
      document.getElementById("titles").value = todo.title;
      document.getElementById("dess").value = todo.des;
    }
  } catch (error) {
    console.log(error);
  }
}

// EDIT PAGE PAR CALL HOGA
if (window.location.pathname.includes("edite.html")) {
  getEditTodo();
}

async function save() {
  console.log("welcom");
  const titles = document.getElementById("titles").value;

  // console.log("this is title s forn", titles);

  const dess = document.getElementById("dess").value;
  // console.log(dess);
  const path = new URLSearchParams(window.location.search);

  const id = path.get("id");
  console.log("update id", id);

  const payload = { title: titles, des: dess };

  console.log("this payload", payload);

  try {
    const res = await fetch(
      `https://todo-backend-seven-weld.vercel.app/api/v1/edite/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenuser}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();
    console.log(result);

    alert(result.message);

    if (result.success) {
      document.getElementById("titles").value = result.data.title;

      document.getElementById("dess").value = result.data.title;

      window.location.href = "./todo.html";
    }
  } catch (error) {
    console.log("edite ka error", error);
  }
}
function logout() {
  localStorage.removeItem("token");

  alert("Logout successfully");

  window.location.href = "./index.html";
}
