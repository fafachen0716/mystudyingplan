var gameData = {
    concept: 0,
    conceptPerClick: 1,
    conceptPerClickCost: 10

  }

function buyConceptPerClick() {
if (gameData.concept >= gameData.conceptPerClickCost) {
    gameData.concept -= gameData.conceptPerClickCost
    gameData.conceptPerClick += 1
    gameData.conceptPerClickCost *= 2
    document.getElementById("concept accumulated").innerHTML = gameData.gold + " concept accumulated"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade reading speed (Currently Level " + gameData.conceptPerClick + ") Cost: " + gameData.conceptPerClickCost + " Concept"
}
}

  
function study() {
    gameData.concept += gameData.conceptPerClick
    document.getElementById("concept accumulated").innerHTML = gameData.concept + " concept accumulated"

  }

var mainGameLoop = window.setInterval(function() {
study()
}, 1000)

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("mystudyingplanSave", JSON.stringify(gameData))
  }, 15000)

  var savegame = JSON.parse(localStorage.getItem("mystudyingplanSave"))
if (savegame !== null) {
  gameData = savegame
}

if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
