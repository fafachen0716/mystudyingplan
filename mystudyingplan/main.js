var gameData = {
    concept: 0,
    conceptPerClick: 1,
    conceptPerClickCost: 100

  }

function buyConceptPerClick() {
if (gameData.concept >= gameData.conceptPerClickCost) {
    gameData.concept -= gameData.conceptPerClickCost
    gameData.conceptPerClick += 1
    gameData.conceptPerClickCost *= 2
    document.getElementById("concept accumulated").innerHTML = gameData.gold + " concept accumulated"
    document.getElementById("perClickUpgrade").innerHTML = "升級閲讀速度 (目前等級 " + gameData.conceptPerClick + ") 花費: " + gameData.conceptPerClickCost + " 概念"
}
}



//biaoyu
$(document).ready(function(){
    setInterval(function(){
      $('#標語 li:first-child').slideUp(function(){      $(this).appendTo($('#標語')).slideDown()
      })       
    },3000)
  })
  
function study() {
    gameData.concept += gameData.conceptPerClick
    document.getElementById("concept accumulated").innerHTML = gameData.concept + " 概念已學習"

  }

//auto study
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
