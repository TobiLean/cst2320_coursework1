//initializing some variables to store DOM nodes
const leaderboard_table = document.getElementById("leaderboard_table");
const user_details = JSON.parse(localStorage.getItem("user_details"));
const tbody = document.getElementsByTagName("tbody");
const player1 = sessionStorage.getItem("loggedUser1");
const player2 = sessionStorage.getItem("loggedUser2");
var player1Data = user_details.find((obj) => obj.username === player1);
var player2Data = user_details.find((obj) => obj.username === player2);

//player titles/accolades
const accolades = ["Novice", "Expert", "Master", "Oga for Chess"];

user_details_sorted = user_details.sort((a, b) => b.points - a.points);

//setting data for players through match results
function setData(player_data) {
  player_data.points = 0;

  if (player_data.win != null) {
    player_data.points += Number(player_data.win) * 30;
    player_data.rank = 1;
  }

  if (player_data.draw != null) {
    player_data.points += Number(player_data.draw) * 10;
  }

  if (player_data.loss != null) {
    player_data.points -= Number(player_data.loss) * 20;
  }

  if (player_data.points < 0) {
    player_data.points = 0;
  }

  if (player_data.points <= 40) {
    player_data.title = accolades[0];
  } else if (player_data.points <= 70) {
    player_data.title = accolades[1];
  } else if (player_data.points <= 100) {
    player_data.title = accolades[2];
  } else if (player_data.points <= 200) {
    player_data.title = accolades[3];
  }

  user_details_sorted.forEach((obj, i) => {
    obj.rank = i + 1;
  });

  localStorage.setItem("user_details", JSON.stringify(user_details));
}

//Setting data for player 1 and 2 after on leaderboard load
setData(player1Data);
setData(player2Data);

//creating function to make leaderboard with game data
function setLeaderboard(arr) {
  arr.forEach((element) => {
    tr = document.createElement("tr");

    var dataValueName = [
      element.rank,
      element.username,
      element.points ? element.points : 0,
      element.matches ? element.matches : 0,
      element.title,
      element.win ? element.win : 0,
      element.draw ? element.draw : 0,
      element.loss ? element.loss : 0,
    ];

    for (let i = 0; i < dataValueName.length; i++) {
      let td = document.createElement("td");
      let dataText = document.createTextNode(dataValueName[i]);
      td.appendChild(dataText);
      tr.appendChild(td);
    }

    tbody[0].appendChild(tr);
  });
}

// //Creating the leaderboard, updates each page load
setLeaderboard(user_details_sorted);

//function to set table range
function filterAmount(arr, slice1, slice2) {
  if (tbody[0].firstChild) {
    tbody[0].innerHTML = "";
  }

  if (slice1 == 0 && slice2 == 3) {
    filterName = document.getElementById("filter_btn_1_name");
    filterName.innerHTML = "Top 3";
  }
  if (slice1 == 0 && slice2 == 5) {
    filterName = document.getElementById("filter_btn_1_name");
    filterName.innerHTML = "Top 5";
  }
  if (slice1 == 0 && slice2 == "all") {
    filterName = document.getElementById("filter_btn_1_name");
    filterName.innerHTML = "All";
  }

  if (slice2 == "all") {
    setLeaderboard(arr);
  } else {
    tempArr = arr.slice(slice1, slice2);
    setLeaderboard(tempArr);
  }
}
