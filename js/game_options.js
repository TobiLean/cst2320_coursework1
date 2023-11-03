var modes = Array.from(document.getElementsByClassName("mode_option"));
var themes = Array.from(document.getElementsByClassName("theme_option"));
var start_end = document.getElementById("start_end_btn");
var cells_light = Array.from(document.getElementsByClassName("cell light"));
var cells_dark = Array.from(document.getElementsByClassName("cell dark"));

modes[0].addEventListener("click", ()=>{

    setTimeout(function() {
        modes[0].disabled = true
        modes[1].disabled = false
        modes[2].disabled = false
    }, 0)

    modes[0].setAttribute("style", "border: 1px solid #072541;");
    modes[1].setAttribute("style", "border: 0");
    modes[2].setAttribute("style", "border: 0");
})

modes[1].addEventListener("click", ()=>{
    setTimeout(function() {
        modes[1].disabled = true
        modes[0].disabled = false
        modes[2].disabled = false
    }, 0)

    modes[1].setAttribute("style", "border: 1px solid #072541;");
    modes[0].setAttribute("style", "border: 0");
    modes[2].setAttribute("style", "border: 0");
})

modes[2].addEventListener("click", ()=>{
    setTimeout(function() {
        modes[2].disabled = true
        modes[1].disabled = false
        modes[0].disabled = false
    }, 0)

    modes[2].setAttribute("style", "border: 1px solid #072541;");
    modes[1].setAttribute("style", "border: 0");
    modes[0].setAttribute("style", "border: 0");
})

themes[0].addEventListener("click", ()=>{

    setTimeout(function() {
        themes[0].disabled = true
        themes[1].disabled = false
        themes[2].disabled = false
    }, 0)

    themes[0].setAttribute("style", "border: 1px solid #072541;");
    themes[1].setAttribute("style", "border: 0");
    themes[2].setAttribute("style", "border: 0");

    for(i=0; i<cells_light.length; i++){
        cells_light[i].setAttribute("style", "background-color: white");
    }

    for(i=0; i<cells_dark.length; i++){
        cells_dark[i].setAttribute("style", "background-color: black");
    }
})

themes[1].addEventListener("click", ()=>{
    setTimeout(function() {
        themes[1].disabled = true
        themes[0].disabled = false
        themes[2].disabled = false
    }, 0)

    themes[1].setAttribute("style", "border: 1px solid #072541;");
    themes[0].setAttribute("style", "border: 0");
    themes[2].setAttribute("style", "border: 0");

    for(i=0; i<cells_light.length; i++){
        cells_light[i].setAttribute("style", "background-color: #92ef67");
    }

    for(i=0; i<cells_dark.length; i++){
        cells_dark[i].setAttribute("style", "background-color: #00682c");
    }
})

themes[2].addEventListener("click", ()=>{
    setTimeout(function() {
        themes[2].disabled = true
        themes[1].disabled = false
        themes[0].disabled = false
    }, 0)

    themes[2].setAttribute("style", "border: 1px solid #072541;");
    themes[1].setAttribute("style", "border: 0");
    themes[0].setAttribute("style", "border: 0");

    for(i=0; i<cells_light.length; i++){
        cells_light[i].setAttribute("style", "background-color: white");
    }

    for(i=0; i<cells_dark.length; i++){
        cells_dark[i].setAttribute("style", "background-color: #ff6699");
    }
})

start_end.addEventListener("click", (event)=>{
    if (event.target.style.backgroundColor == "red"){
        event.target.style.backgroundColor = "green";
        start_end.value = "Start";
    }
    else {
        start_end.style.backgroundColor = "red";
        start_end.value = "End";
    }
})
