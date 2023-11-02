var modes = Array.from(document.getElementsByClassName("mode_option"));

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