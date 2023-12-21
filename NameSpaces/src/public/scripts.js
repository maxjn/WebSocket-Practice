document.addEventListener("DOMContentLoaded", async function () {
  const socket1 =await io("http://localhost:5000/");
  const socket =await io("http://localhost:5000/admin");

  socket.on("connection", () => {
    console.log("Connected to Admin!");
  });

  // Message Sent
  document
    .querySelector("#message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const textInput = document.querySelector("#user-message");
      let message = textInput.value;
      textInput.value = "";

      socket.to("chat").emit("MessageToServer", { message });
    });

  // Message Recieved
  socket.to("chat").on("MessageToClients", (data) => {
    console.log("check");
    document.querySelector("#messages").innerHTML += `<li>${data.message}</li>`;
  });
});
