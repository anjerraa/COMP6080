decrement = document.getElementById("decrement");
counter = document.getElementById("counter");
increment = document.getElementById("increment");

counter.innerText = "0";

increment.addEventListener("click", () => {
  number = parseInt(counter.innerText);
  if (number < 10) {
    counter.innerText = number + 1;
  } else {
    alert("You cannot go past 10!");
  }
})

decrement.addEventListener("click", () => {
  number = parseInt(counter.innerText);
  if (number > 10) {
    counter.innerText = number - 1;
  } else {
    alert("You cannot go below 0!");
  }
})