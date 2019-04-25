document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const init = function() {
  let items = document.querySelectorAll("section");
  for (let i = 0; i < items.length; i++) {
    items[i].style.background = randomColor({ luminosity: "light" });
  }
  cssScrollSnapPolyfill();
};
init();
