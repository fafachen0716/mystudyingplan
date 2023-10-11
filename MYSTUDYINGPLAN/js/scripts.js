// Initial game data
var gameData = {
    concept: 0,
    conceptPerClick: 1,
    conceptPerClickCost: 100,
    PodcastCost:25,
    PodcastOn:0,
    name:"學測戰士"

  }

var lastSaveTime = Math.round(Date.now() / 100) * 100;


// Function to reset the game data
function resetGameData() {
  gameData = {
    concept: 0,
    conceptPerClick: 1,
    conceptPerClickCost: 100,
    PodcastCost: 25,
    PodcastOn: 0
  };
  CheckUpgrades("Podcast");
  // You can also reset any additional properties here if needed
}

// Event listener for the reset button using jQuery
$(document).ready(function() {
  $("#resetButton").on("click", function() {
    resetGameData();
    // Additional code to update the UI as needed, e.g., hiding/showing buttons
    //CheckUpgrades("Podcast"); // Example update for checking button visibility
  });
});


function buyConceptPerClick() {
if (gameData.concept >= gameData.conceptPerClickCost) {
    gameData.concept -= gameData.conceptPerClickCost
    gameData.conceptPerClick += 1
    gameData.conceptPerClickCost *= 2
    document.getElementById("concept accumulated").innerHTML = gameData.gold + " concept accumulated"
    document.getElementById("perClickUpgrade").innerHTML = "升級閲讀速度 (目前等級 " + gameData.conceptPerClick + ") <br>花費:  " + gameData.conceptPerClickCost + " 概念"
}
}


function buyPodcast() {
    if (gameData.concept >= gameData.PodcastCost) {
        gameData.concept -= gameData.PodcastCost
        removeButton("buyPodcast");
        var learnedButtonID = "learned" + "Podcast";
        addLearnedButton(learnedButtonID);
        gameData.PodcastOn= 1
    }

    }

//biaoyu
$(document).ready(function(){
    setInterval(function(){
      $('#biaoyu li:first-child').slideUp(function(){      $(this).appendTo($('#biaoyu')).slideDown()
      })       
    },4000)
  })
  
function study() {
    gameData.concept += gameData.conceptPerClick
    document.getElementById("concept accumulated").innerHTML = gameData.concept + " 概念已學習"

  }



//CHECK ALL UPGRADES!!
$(document).ready(function() {
  // Example call for a specific update (e.g., "Podcast")
  CheckUpgrades("Podcast");
});
  
//CHECK ALL UPGRADES!!
function CheckUpgrades(upgradeName) {
  var buyButtonID = "buy" + upgradeName;
  var learnedButtonID = "learned" + upgradeName;

  if (gameData[upgradeName + "On"] == 1) {
    removeButton(upgradeName);
    //ADD BUTTONS
    // Create and append the new button

    // Call the addButton function
    addLearnedButton(learnedButtonID);
    } else {
    // Remove the learnedButton if it exists
    var learnedButton = document.getElementById(learnedButtonID);
    if (learnedButton) {
      learnedButton.parentNode.removeChild(learnedButton);
    }
    // Call the addButton function
    addBuyButton(upgradeName);

  }
}

/**/ 
// Function to add a button to the .btn-group
function addLearnedButton(buttonID) {
  var element = document.getElementById("buyskills");
  if (document.getElementById(buttonID)) {
  console.log(buttonID+" already exists.")
  } else {
  var btnGroup = document.querySelector(".btn-group");
  var newButton = document.createElement("button");
  newButton.setAttribute("type", "button");
  newButton.setAttribute("class", "btn btn-dark");
  newButton.setAttribute("id", buttonID);
  newButton.innerHTML = '<i class="fa fa-headphones"></i> | ' + buttonID;
  btnGroup.appendChild(newButton);     
  }


}

// Function to add a button to the specified element
function addBuyButton(buttonID) {
  var ID = "buy"+buttonID;
  if (document.getElementById(ID)) {
  console.log(ID+" already exists.")
  } else {  
  var element = document.getElementById("buyskills");
  var newButton = document.createElement("button");
  newButton.setAttribute("type", "button");
  newButton.setAttribute("class", "btn btn-light");
  newButton.setAttribute("id", ID);
  newButton.setAttribute("onclick", ID+"()");
  newButton.innerHTML = "購買 "+buttonID+"<br> 花費:"+gameData[buttonID + "Cost"] +" 概念";

  element.appendChild(newButton);  
  }
}


// Function to remove a button with the given ID
function removeButton(buttonID) {
  var button = document.getElementById(buttonID);
  if (button) {
    button.parentNode.removeChild(button);
  }
}

//to do 
function WorkUpgrades(upgradeName) {
  if (gameData[upgradeName + "On"] == 1) {
  console.log("you've learned"+upgradeName)

  } else {
  console.log("you haven't learned"+upgradeName)
  }
}


//auto study
var mainGameLoop = window.setInterval(function() {

if (gameData["PodcastOn"] == 1) {
  console.log("you've learned "+"Podcast")
  study()
  } else {
  console.log("you haven't learned"+" Podcast")
  }

document.getElementById("concept accumulated").innerHTML = gameData.concept + " 概念已學習"
document.getElementById("perClickUpgrade").innerHTML = "升級閲讀速度 (目前等級 " + gameData.conceptPerClick + ") <br>花費: " + gameData.conceptPerClickCost + " 概念"
}, 1000)


// Function to save the game
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("mystudyingplanSave", JSON.stringify(gameData))
    console.log("game saved")
    lastSaveTime = Math.round(Date.now() / 100) * 100; // Update lastSaveTime in 0.1-second increments
  }, 10000)

// Function to update the last save time text
var updateSaveGameLoop = window.setInterval(function() {
  updateLastSaveText(); // Update the "lastsaving" text
  console.log("game save time updated")
},500)

function updateLastSaveText() {
  var currentTime = Math.round(Date.now() / 100) * 100; // Round to the nearest 0.1 second
  var timeSinceLastSave = (currentTime - lastSaveTime) / 1000; // Convert to seconds
  document.getElementById("lastsaving").textContent = "上次存檔：" + timeSinceLastSave + " 秒前 ，目前【10】秒進行一次存檔。";
}


var savegame = JSON.parse(localStorage.getItem("mystudyingplanSave"))
if (savegame !== null) {
  gameData = savegame
}



if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;


//NAVIGATION

// Set the default section to 自習室
showSection('自習室');

// Add event listeners to the navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetSection = this.getAttribute('href').substr(1); // Get the section ID
    showSection(targetSection);
  });
});

// Function to show the specified section and hide others
function showSection(sectionID) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.display = 'none'; // Hide all sections
  });
  document.getElementById(sectionID).style.display = 'block'; // Show the selected section
}



