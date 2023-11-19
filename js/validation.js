var fName = document.getElementById("firstname");
var lName = document.getElementById("lastname");
var email = document.getElementById("email");
var uName = document.getElementById("username");
var pWord = document.getElementById("password");
var fNameDiv = document.getElementById("firstname_div");
var lNameDiv = document.getElementById("lastname_div");
var contBtn = document.getElementById("continue_btn");
var body = document.getElementsByTagName("body");
var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var passwordCheck;
var nameHasNumber;


contBtn.addEventListener("click", ()=>{
    checkName(fName, fNameDiv);
    checkName(lName, lNameDiv);
    checkPassword(pWord);
    checkUserName();
})

function checkName(x, warningParent) {
    if(x.value != "" && x.value != " "){
        for (let i = 0; i < x.value.length; i++) {
            let tempArr = [];
            tempArr[i] = x.value[i];
            for (let j = 0; j < numberArray.length; j++) {
                if(numberArray[j] == tempArr[i]){
                    console.log("cannot contain a number")
                    warningMsg("cannot contain a number", warningParent)
                }
                else{
                    nameHasNumber = false;
                }
            }
        }

        if(nameHasNumber == false){
            console.log(`Correct ${x.value} name`);
        }
    }
    else {
        console.log(`Wrong ${x.value} name`)
    }
}

function checkUserName() {
    if(uName.value.length >= 8){
        console.log("Correct User name")
    }
    else{
        console.log("Wrong User name")
    }
}

function checkPassword(x) {
    var pWordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if(pWordRegExp.test(x.value)){
        passwordCheck = true;
        console.log(`${passwordCheck}`)
    }
    else {
        passwordCheck = false;
        console.log(`${passwordCheck}`)
    }

    return passwordCheck;
}

function warningMsg(message, parent) {
    let warnTag = document.createElement("div");
    let warningText = document.createTextNode(message);
    warnTag.appendChild(warningText);
    warnTag.style.color = "red";
    warnTag.style.width = "max-content";
    warnTag.style.height = "30px";
    warnTag.style.position = "relative";
    warnTag.style.top = "10px";
    warnTag.style.left = "0px";
    warnTag.style.fontSize = "10px";
    parent.appendChild(warnTag);
}
