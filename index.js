const messageDiv = document.getElementById("message");
const content = document.getElementById("content");
const modal = document.getElementById("modal");
const resultMessageRef = document.getElementById("result-message");
const heartSVG = document.getElementById("heartSVG");
const modalcontent = document.getElementById("modal-content");
const messageInput = document.getElementById("message-input");
const heart = document.getElementById("heart");
let loading = false;
let success = false;
let resultMessage = "";

const hearts = () => {
  let heartcount = (messageDiv.offsetWidth / 50) * 5;

  for (let i = 0; i <= heartcount; i++) {
    const size = randomValue(60, 120) / 10;
    let particle = document.createElement("span");
    particle.setAttribute("class", "particle");
    particle.setAttribute(
      "style",
      `top:${randomValue(20, 80)}%; 
        left: ${randomValue(0, 95)}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${randomValue(0, 30) / 10}s;`
    );
    messageDiv.appendChild(particle);
  }

  setTimeout(getMessage, 2000);
};

const randomValue = (m, n) => {
  m = parseInt(m);
  n = parseInt(n);
  return Math.ceil(Math.random() * (n - m + 1)) + m;
};

const getMessage = () => {
  fetch("https://positivity.today/.netlify/functions/randomSaying")
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
  loading = true;
  content.style.filter = "blur(8px)";
  heartSVG.style.display = "flex";
  modalcontent.style.display = "none";

  const sayingToAdd = messageInput.value.trim();
  fetch("https://positivity.today/.netlify/functions/addSaying", {
    method: "POST",
    body: sayingToAdd,
  })
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      resultMessage = message;
      messageInput.value = "";
      sucess = true;
    })
    .catch((error) => {
      resultMessage = "Something went wrong, please try again";
      success = false;
    })
    .finally(() => {
      loading = false;
      resultMessageRef.innerText = resultMessage;
    });
};

const stopLoading = () => {
  loading = false;
};

heart.addEventListener("animationiteration", function () {
  if (!loading) {
    heart.classList.replace("stroke", "fill");
    resultMessageRef.style.display = "block";
    success ? setTimeout(closeModal, 3000) : setTimeout(resetModal, 3000);
  }
});

const openModal = () => {
  modal.style.display = "flex";
  heartSVG.style.display = "none";
  heart.classList.replace("fill", "stroke");
  modalcontent.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
  resultMessageRef.style.display = "none";
  content.style.filter = "none";
};

const resetModal = () => {
  closeModal();
  openModal();
};

// Close modal when clicking outside it
window.onclick = function (event) {
  if (event.target == modal && !loading) {
    closeModal();
  }
};

document.onload = hearts();
