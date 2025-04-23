const container = document.querySelector("div.container")
const restart = document.querySelector("button.restart");
const buttons = document.querySelectorAll("div.container div.row button");
const winCases = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"]
]

var counter = 0;

function howMany(z) {
  let result = 0;
  Array.from(buttons).forEach(button => {
    if (button.innerText.includes(z)) result++
  })
  return result;
}
function dim(z) {
  Array.from(buttons).forEach(button => {
    if (button.id === z+1) button.classList.add("dim");
  })
}
function remove(z) {
  Array.from(buttons).forEach(button => {
    if (button.id === z+1) {
      button.innerText = "";
      button.classList.remove("dim");
      button.id = "";
    };
    if (button.id === z+2) {
      button.id = z+1;
    };
    if (button.id === z+3) {
      button.id = z+2;
    };
    if (button.id === z+4) {
      button.id = z+3;
    };
  })
  
  if (z === "X") dim("O");
  if (z === "O") dim("X");
}
function check(z) {
  let result = [];
  Array.from(buttons).forEach(button => {
    if (button.innerText === z) {
      result.push(button);
    }
  })
  
  winCases.forEach((_case, index) => {
    if (_case.every(coord => result.map(button => button.dataset.coordinate).includes(coord))) {
      console.log(z + " Wins ", counter + " total moves");
      // restart.innerText = counter + " Moves";
      
      container.classList.add("won");
      clearInterval(play);
      
      result.forEach(button => {
        button.style.transitionDelay = button.id.split("")[1]*.066 + "s";
        
        button.classList.add("wins");
        button.classList.remove("dim");
        
        restart.classList.remove("hide");
        
        counter = z === "X" ? 1 : 0;
      })
    }
  })
}

Array.from(buttons).forEach(button => {
  button.addEventListener("click", event => {
    if (button.innerText) return;
    
    counter++;
    let xTurn = counter%2 ? true : false;
    let Xs = howMany("X")+1;
    let Os = howMany("O")+1;
    
    button.append(xTurn ? "X" : "O");
    button.id = xTurn ? "X" + Xs : "O" + Os;
    
    if (Xs === 4 && xTurn) remove("X");
    if (Os === 4 && !xTurn) remove("O");
    
    if (Xs === 3 && xTurn) dim("X");
    if (Os === 3 && !xTurn) dim("O");
    
    check(xTurn ? "X" : "O");
  })
})

restart.addEventListener("click", event => {
  container.classList.remove("won");
  Array.from(buttons).forEach(button => {
    button.className = "";
    button.id = "";
    button.innerText = "";
    restart.classList.add("hide");
  })
})

function randomClick() {
  Array.from(buttons)[Math.round(Math.random()*8)].click();
}

let play;

// window.addEventListener("dblclick", event => {
//   play = setInterval(randomClick, 20);
// })