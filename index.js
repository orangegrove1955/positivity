let messageDiv = document.getElementById("message");
let loading = false;

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
  loading = true;
  const heartSVG = document.getElementById("heartSVG");
  const modalcontent = document.getElementById("modal-content");
  const modal = document.getElementById("modal");
  document.getElementById("content").style.filter = "blur(8px)";
  heartSVG.style.display = "block";
  modalcontent.style.display = "none";

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

      loading = false;
    })
    .catch((error) => {
      console.log(error);
      heartSVG.style.display = "block";
      modalcontent.style.display = "none";
    });

  //   setTimeout(stopLoading, 1200);
};

// const stopLoading = () => {
//   loading = false;
// };

const heart = document.getElementById("heart");
heart.addEventListener("animationiteration", function () {
  if (loading == false) {
    heart.classList.replace("stroke", "fill");
    setTimeout(closeModal, 3000);
  }
});

const modal = document.getElementById("modal");

const openModal = () => {
  modal.style.display = "flex";
  const heartSVG = document.getElementById("heartSVG");
  const modalcontent = document.getElementById("modal-content");
  heartSVG.style.display = "none";
  heart.classList.replace("fill", "stroke");
  modalcontent.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
  document.getElementById("content").style.filter = "none";
};

// Close modal when clicking outside it
window.onclick = function (event) {
  if (event.target == modal && !loading) {
    closeModal();
  }
};

document.onload = hearts();
