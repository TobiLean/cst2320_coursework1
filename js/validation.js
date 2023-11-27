var fName = document.getElementById("firstname");
var lName = document.getElementById("lastname");
var email = document.getElementById("email");
var uName = document.getElementById("username");
var pWord = document.getElementById("password");
var fNameDiv = document.getElementById("firstname_div");
var lNameDiv = document.getElementById("lastname_div");
var contBtn = document.getElementById("continue_btn");
var loginContBtn = document.getElementById("login_continue_btn");
var body = document.getElementsByTagName("body");
var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// var users = [];
var passwordCheck;
var nameHasNumber;
var name_is_correct;
var username_is_correct;
var logged;
var userExist;
var newUser = {};

// contBtn.addEventListener("click", ()=>{
//     checkName(fName, fNameDiv);
//     checkName(lName, lNameDiv);
//     checkPassword(pWord);
//     checkUserName();

//     if (name_is_correct == true && passwordCheck == true && username_is_correct == true){
//         storeData();
//     }
//     else{
//         console.log("baddd")
//     }
    
// })

contBtn.addEventListener("click", (event)=>{

    event.preventDefault();
    event.stopPropagation();

    checkName(fName, fNameDiv);
    checkName(lName, lNameDiv);
    checkPassword(pWord);
    checkUserName();

    if (name_is_correct == true && passwordCheck == true && username_is_correct == true){
        console.log("-----everything working!!!");
        storeData();
    }
    else{
        console.log("baddd");
    }

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
            name_is_correct = true
        }
    }
    else {
        console.log(`Wrong ${x.value} name`)
        name_is_correct = false
    }
}

function checkUserName() {
    if(uName.value.length >= 8){
        console.log("Correct User name")
        username_is_correct = true;
    }
    else{
        console.log("Wrong User name")
        username_is_correct = false;
    }
}

function checkPassword(x) {
    var pWordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if(pWordRegExp.test(x.value)){
        passwordCheck = true;
        console.log(`Good password: ${passwordCheck}`)


    }
    else {
        passwordCheck = false;
        console.log(`Good password: ${passwordCheck}`)
    }
}

function warningMsg(message, parent) {
    let warnTag = document.createElement("div");
    let warningText = document.createTextNode(message);
    warnTag.classList.add("warning_div");

    //displaying and styling the warning text
    warnTag.appendChild(warningText);
    warnTag.style.color = "red";
    warnTag.style.width = "max-content";
    warnTag.style.height = "30px";
    warnTag.style.position = "relative";
    warnTag.style.top = "5px";
    warnTag.style.left = "0px";
    warnTag.style.fontSize = "10px";
    parent.appendChild(warnTag);

    setTimeout(()=>{
        setTimeout(warnTag.remove(), 300);
    }, 1000);

}

function checkUserExist(){
    for (let i = 0; i < JSON.parse(localStorage.getItem("user_details")).length; i++) {
        if(JSON.parse(localStorage.getItem("user_details"))[i].userEmail != newUser.userEmail){
            userExist = false;
        }
        else{
            userExist = true;
            console.log("user exists already")
        }
    }
}

function storeData(){

    newUser = {
        firstname: fName.value.trim(), 
        lastname: lName.value.trim(),
        username: uName.value.trim(),
        userEmail: email.value.trim(),
        password: pWord.value.trim()
    }

    console.log(JSON.stringify(newUser));


    if(JSON.parse(localStorage.getItem("user_details"))==null){

        // localStorage.setItem("user_details", users);
        var users = [];
        
        users.push(newUser);
        localStorage.setItem("user_details", JSON.stringify(users));
        console.log(newUser.userEmail);
        console.log(JSON.parse(localStorage.getItem("user_details"))[0].userEmail);
    }
    else{

        checkUserExist();

        var users = JSON.parse(localStorage.getItem("user_details"));

        if (userExist==false){
            users.push(newUser);
            localStorage.setItem("user_details", JSON.stringify(users));
            console.log(newUser.userEmail);
            console.log(JSON.parse(localStorage.getItem("user_details"))[0].userEmail);
        }
    }
}

// function login(){
//     // if (uName.value == localStorage.getItem())
// }
