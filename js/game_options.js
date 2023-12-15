var modes = Array.from(document.getElementsByClassName("mode_option"));
var themes = Array.from(document.getElementsByClassName("theme_option"));
var start = document.getElementById("start_btn");
var end = document.getElementById("end_btn");
var cells_light = Array.from(document.getElementsByClassName("cell light"));
var cells_dark = Array.from(document.getElementsByClassName("cell dark"));
// const pl1 = sessionStorage.getItem("loggedUser1");
// const pl2 = sessionStorage.getItem("loggedUser1");


function checkPlayer (){
  if(player1 !=null){
    document.getElementsByClassName("user_name")[0].innerHTML = player1;
  }

  if(player2 !=null){
    document.getElementsByClassName("user_name")[1].innerHTML = player2;
  }
}

checkPlayer()

//checks for button click on first mode button and runs a function
modes[0].addEventListener("click", () => {
  setTimeout(function () {
    modes[0].disabled = true;
    modes[1].disabled = false;
    modes[2].disabled = false;
  }, 0);

  modes[0].setAttribute("style", "border: 1px solid #072541;");
  modes[1].setAttribute("style", "border: 0");
  modes[2].setAttribute("style", "border: 0");
});

//checks for button click on second mode button and runs a function
modes[1].addEventListener("click", () => {
  setTimeout(function () {
    modes[1].disabled = true;
    modes[0].disabled = false;
    modes[2].disabled = false;
  }, 0);

  modes[1].setAttribute("style", "border: 1px solid #072541;");
  modes[0].setAttribute("style", "border: 0");
  modes[2].setAttribute("style", "border: 0");
});

//checks for button click on third mode button and runs a function
modes[2].addEventListener("click", () => {
  setTimeout(function () {
    modes[2].disabled = true;
    modes[1].disabled = false;
    modes[0].disabled = false;
  }, 0);

  modes[2].setAttribute("style", "border: 1px solid #072541;");
  modes[1].setAttribute("style", "border: 0");
  modes[0].setAttribute("style", "border: 0");
});

//checks for button click on first theme button and runs a function
themes[0].addEventListener("click", () => {
  setTimeout(function () {
    themes[0].disabled = true;
    themes[1].disabled = false;
    themes[2].disabled = false;
  }, 0);

  themes[0].setAttribute("style", "border: 1px solid #072541;");
  themes[1].setAttribute("style", "border: 0");
  themes[2].setAttribute("style", "border: 0");

  for (i = 0; i < cells_light.length; i++) {
    cells_light[i].setAttribute("style", "background-color: white");
  }

  for (i = 0; i < cells_dark.length; i++) {
    cells_dark[i].setAttribute("style", "background-color: black");
  }
});

//checks for button click on second theme button and runs a function
themes[1].addEventListener("click", () => {
  setTimeout(function () {
    themes[1].disabled = true;
    themes[0].disabled = false;
    themes[2].disabled = false;
  }, 0);

  themes[1].setAttribute("style", "border: 1px solid #072541;");
  themes[0].setAttribute("style", "border: 0");
  themes[2].setAttribute("style", "border: 0");

  for (i = 0; i < cells_light.length; i++) {
    cells_light[i].setAttribute("style", "background-color: #92ef67");
  }

  for (i = 0; i < cells_dark.length; i++) {
    cells_dark[i].setAttribute("style", "background-color: #00682c");
  }

  console.log("Test 100")
});

//checks for button click on third theme button and runs a function
themes[2].addEventListener("click", () => {
  setTimeout(function () {
    themes[2].disabled = true;
    themes[1].disabled = false;
    themes[0].disabled = false;
  }, 0);

  themes[2].setAttribute("style", "border: 1px solid #072541;");
  themes[1].setAttribute("style", "border: 0");
  themes[0].setAttribute("style", "border: 0");

  for (i = 0; i < cells_light.length; i++) {
    cells_light[i].setAttribute("style", "background-color: white");
  }

  for (i = 0; i < cells_dark.length; i++) {
    cells_dark[i].setAttribute("style", "background-color: #ff6699");
  }
});

//checks for button click on start button (start button used to begin the game and start player timer)
start.addEventListener("click", () => {
  start.style.display = "none"
  end.style.display = "block"
});

end.addEventListener("click", ()=>{
  start.style.display = "block"
  end.style.display = "none"
})
