var fName = document.getElementById("firstname");
var lName = document.getElementById("lastname");
var email = document.getElementById("email");
var uName = document.getElementById("username");
var pWord = document.getElementById("password");

var fNameDiv = document.getElementById("firstname_div");
var lNameDiv = document.getElementById("lastname_div");
var uNameDiv = document.getElementById("username_div");
var pWordDiv = document.getElementById("password_div");
var body = document.getElementsByTagName("body");

var contBtn = document.getElementById("continue_btn");
var loginContBtn = document.getElementById("login_continue_btn");

var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var passwordCheck;
var nameHasNumber;
var name_is_correct;
var username_is_correct;
var allLogged;
var userExist = false;
var newUser = {};
var loggedUserNum = 0;

var navBarSignup = document.getElementById("navbar_signup");
var navProfileName = document.getElementById("nav_profile_name");

function signUp (event){
    event.preventDefault();
    event.stopPropagation();

    checkName(fName, fNameDiv);
    checkName(lName, lNameDiv);
    checkUserName(uNameDiv);
    checkPassword(pWord, pWordDiv);

    if (name_is_correct == true && passwordCheck == true && username_is_correct == true){
        console.log("--trying to store data--");
        storeData();
    }
    else{
        console.log("--Error check data entered--");
    }
}

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

function checkUserName(warningParent) {
    if(uName.value.length >= 8){
        console.log("Correct User name")
        username_is_correct = true;
    }
    else{
        console.log("Wrong User name")
        warningMsg("Must be more than 8 characters", warningParent);
        username_is_correct = false;
    }
}

function checkPassword(x, warningParent) {
    var pWordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    if(pWordRegExp.test(x.value)){
        passwordCheck = true;
        console.log(`Good password: ${passwordCheck}`)


    }
    else {
        passwordCheck = false;
        console.log(`Good password: ${passwordCheck}`)
        warningMsg("Requires: Special character, uppercase, lowercase, at least 8 characters", warningParent);
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
    }, 2000);

}

function checkUserExist(typeOfUser="signup"){

    if(typeOfUser == "login"){
        for (let i = 0; i < JSON.parse(localStorage.getItem("user_details")).length; i++) {

            var tempUser = JSON.parse(localStorage.getItem("user_details"))[i];
            let tempName = tempUser.username;
            let tempPWord = tempUser.password;

            if(tempName == uName.value){
                userExist = true;
                tempUser.logged = true;
                // localStorage.setItem("loggedUser1", tempName);
                if (!sessionStorage.getItem("loggedUser1")){
                    sessionStorage.setItem("loggedUser1", tempName);
                    loggedUserNum++;
                }
                else if(!sessionStorage.getItem("loggedUser2") && uName.value != sessionStorage.getItem("loggedUser1")){
                    sessionStorage.setItem("loggedUser2", tempName);
                    loggedUserNum++;
                }
                else{
                    loggedUserNum = 3;
                    console.log(loggedUserNum);
                }
            }
            else{
                console.log("--check user details--");
                console.log(tempName);

            }

            if(tempPWord == pWord.value){
                userExist = true;
                tempUser.logged = true;
            }
            else{
                console.log("--check user details--");
                console.log(tempPWord);
            }
        }
    }
    else {
        for (let i = 0; i < JSON.parse(localStorage.getItem("user_details")).length; i++) {
            if(JSON.parse(localStorage.getItem("user_details"))[i].userEmail != newUser.userEmail){
                userExist = false;
            }
            else{
                userExist = true;
                console.log("--user exists already--")
            }
    
            if(JSON.parse(localStorage.getItem("user_details"))[i].username != newUser.username){
                userExist = false;
            }
            else{
                userExist = true;
                console.log("--user exists already--")
            }
        }
    }
    
}

function storeData(){

    newUser = {
        firstname: fName.value.trim(), 
        lastname: lName.value.trim(),
        username: uName.value.trim(),
        userEmail: email.value.trim(),
        password: pWord.value.trim(),
    }

    console.log(JSON.stringify(newUser));


    if(JSON.parse(localStorage.getItem("user_details"))==null){

        var users = [];
        
        users.push(newUser);
        localStorage.setItem("user_details", JSON.stringify(users));
        console.log(newUser.userEmail);
        console.log(JSON.parse(localStorage.getItem("user_details"))[0].userEmail);
        console.log("--successfully stored user!--");
        alert("--successfully stored user!--");
    }
    else{

        checkUserExist();

        var users = JSON.parse(localStorage.getItem("user_details"));

        if (userExist==false){
            users.push(newUser);
            localStorage.setItem("user_details", JSON.stringify(users));
            console.log(newUser.userEmail);
            console.log(JSON.parse(localStorage.getItem("user_details"))[0].userEmail);
            console.log("--successfully stored user!--");
            alert("--successfully stored user!--");
        }
        else{
            console.log("--cannot store user!--")
            alert("--cannot store user!--")
        }
    }
}

function login(event){

    event.preventDefault();
    event.stopPropagation();

    checkUserExist("login");

    if(userExist == true){

        if(loggedUserNum < 3){
            console.log("--User Exist in storage!--");
            alert("--Logged in successfully!--");

            navBarSignup.style.display = "none";
            navProfileName.innerHTML = uName.value;
            navProfileName.style.display = "block";

            // logged = true;
            console.log(loggedUserNum);
        }
        else {
            navBarSignup.style.display = "block";
            navProfileName.innerHTML = "";
            navProfileName.style.display = "none";
            alert("--Logged out all users!--");
            sessionStorage.removeItem("loggedUser1");
            sessionStorage.removeItem("loggedUser2");
            loggedUserNum = 0;
        }
    }
}
