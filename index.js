const addMessage = () => {
  console.log("adding message");
};

const hearts = () => {
  let hearts = document.getElementById("message");

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
};

const rnd = (m, n) => {
  m = parseInt(m);
  n = parseInt(n);
  return Math.ceil(Math.random() * (n - m + 1)) + m;
};

const getMessage = () => {
  let message = fetch(
    "https://positivity-today.netlify.com/.netlify/functions/randomSaying"
  ).then((response) => {
    console.log(response.saying);
  });
};

document.onload = hearts();
