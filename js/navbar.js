//initializing some variables to store DOM nodes
const navPl1 = document.getElementById("nav_pl1");
const navPl2 = document.getElementById("nav_pl2");
const dropDownBtn = document.getElementsByClassName("drop_down_btn");
const dropDownDivider = document.getElementsByClassName("drop_down_divider");
const logoutBtn = document.getElementsByClassName("logout_btn");
const pl1 = sessionStorage.getItem("loggedUser1");
const pl2 = sessionStorage.getItem("loggedUser2");

var subtlePink = "#ffa1f5";

//sets the bg color of dropdown divider on all pages
dropDownDivider[0].style.backgroundColor = subtlePink;

//displays the dropdown menu for users if both are logged in
if (pl1 != null && pl2 != null) {
  dropDownBtn[0].style.display = "block";
  dropDownBtn[0].style.cursor = "pointer";
  dropDownBtn[0].style.backgroundColor = subtlePink;
  navPl1.innerHTML = pl1;
  navPl2.innerHTML = pl2;
}
