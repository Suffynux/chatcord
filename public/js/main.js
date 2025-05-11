

const leaveBtn = document.getElementById("leave-btn");
const chatForm = document.getElementById("chat-form");
const messgae = document.getElementById("msg");
const sendBtn = document.getElementsByClassName("btn");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

function outputMessage(message) {
    console.log("work");
  
    const div = document.createElement("div");
    div.classList.add("message");
  
    // Format the date and time for Pakistan
    const pakTime = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  
    div.innerHTML = `
      <p class="meta">${message.username} <span>${pakTime}</span></p>
      <p class="text">
        ${message.text}
      </p>
    `;
  
    document.querySelector(".chat-messages").appendChild(div);
  }

  // Get username and roomname from the Url
  const {username , room} = Qs.parse(location.search , {
      ignoreQueryPrefix: true
  })
  
  socket.on("message", (message) => {
    outputMessage(message);
    console.log(message);
    console.log("fdfd",username , room);
  

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
  // clear input
  messgae.value = "";

});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get the message from the input
  const msg = e.target.elements.msg.value;

  // emit the message to the server
  socket.emit("chatMessage", msg);
});

