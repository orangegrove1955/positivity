let messageDiv = document.getElementById("message");

const hearts = () => {
  let hearts = messageDiv;

  let heartcount = (hearts.offsetWidth / 50) * 5;
  for (let i = 0; i <= heartcount; i++) {
    const size = rnd(60, 120) / 10;
    let particle = document.createElement("span");
    particle.setAttribute("class", "particle");
    particle.setAttribute(
      "style",
      `top:${rnd(20, 80)}%; 
        left: ${rnd(0, 95)}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${rnd(0, 30) / 10}s;`
    );
    hearts.appendChild(particle);
  }

  setTimeout(getMessage, 2000);
};

const rnd = (m, n) => {
  m = parseInt(m);
  n = parseInt(n);
  return Math.ceil(Math.random() * (n - m + 1)) + m;
};

const getMessage = () => {
  fetch("https://positivity-today.netlify.com/.netlify/functions/randomSaying")
    .then((response) => {
      return response.json();
    })
    .then((saying) => {
      messageDiv.innerHTML = saying;
    })
    .catch((error) => {
      messageDiv.innerHTML =
        "Uh oh, something went wrong. That's not your fault though, just try refreshing the page!";
    });
};

const addMessage = () => {
  const messageInput = document.getElementById("message-input");
  const sayingToAdd = messageInput.value;
  fetch("https://positivity-today.netlify.com/.netlify/functions/addSaying", {
    method: "POST",
    body: sayingToAdd,
  })
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.log(error);
    });
};

const modal = document.getElementById("modal");

const openModal = () => {
  modal.style.display = "flex";
};

const closeModal = () => {
  modal.style.display = "none";
};

// Close modal when clicking outside it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

document.onload = hearts();
