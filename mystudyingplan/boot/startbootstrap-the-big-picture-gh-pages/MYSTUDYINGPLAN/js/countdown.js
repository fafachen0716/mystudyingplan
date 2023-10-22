// Set the date we're counting down to
var countDownDate = new Date("Jan 20, 2024 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML ="" + days + "日 " + hours + "小時 "
  + minutes + "分 " + seconds + "秒 ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);



//POMODORO

var gHours = 0;
var gMinutes = 0;
var gSeconds = 0;

var remainingTime;

var countdownHandle;

var audio = new Audio('./sounds/beep.mp3');

$(document).ready(function() {
  onPomodoroTimer();
});

function onPomodoroTimer(){

  stopTimer();

  gHours = 0;
  gMinutes = 50;
  gSeconds = 0;

  resetTimer();

  $('#shortButton').removeClass('btn-success');
  $('#longButton').removeClass('btn-success');
  $('#pomodoroButton').addClass('btn-success');
}

function onShortTimer(){

  stopTimer();

  gHours = 0;
  gMinutes = 5;
  gSeconds = 0;

  resetTimer();

  $('#pomodoroButton').removeClass('btn-success');
  $('#longButton').removeClass('btn-success');
  $('#shortButton').addClass('btn-success');
}

function onLongTimer(){

  stopTimer();

  gHours = 0;
  gMinutes = 15;
  gSeconds = 0;

  resetTimer();

  $('#pomodoroButton').removeClass('btn-success');
  $('#shortButton').removeClass('btn-success');
  $('#longButton').addClass('btn-success');
}

function onStartTimer(){
  stopTimer();
  startTimer();
};

function onStopTimer(){
  stopTimer();

};

function onResetTimer(){
  stopTimer();
  resetTimer();
}

function startAlarm(){
  if(remainingTime<1000)
  {
    audio.play();
  }
}

function startTimer() {
  countdownHandle=setInterval(function() {
    decrementTimer();
  },1000);
}

function stopTimer() {
  clearInterval(countdownHandle);
  startAlarm();

}

function resetTimer(){

  remainingTime = (gHours*60*60*1000)+
  (gMinutes*60*1000)+
  (gSeconds*1000);
  renderTimer();
}

function renderTimer(){


  var deltaTime=remainingTime;

  var hoursValue=Math.floor(deltaTime/(1000*60*60));
  deltaTime=deltaTime%(1000*60*60);

  var minutesValue=Math.floor(deltaTime/(1000*60));
  deltaTime=deltaTime%(1000*60);

  var secondsValue=Math.floor(deltaTime/(1000));

  animateTime(hoursValue, minutesValue, secondsValue);
};


function animateTime(remainingHours, remainingMinutes, remainingSeconds) {

  // position
  $('#hoursValue').css('top', '0em');
  $('#minutesValue').css('top', '0em');
  $('#secondsValue').css('top', '0em');

  $('#hoursNext').css('top', '0em');
  $('#minutesNext').css('top', '0em');
  $('#secondsNext').css('top', '0em');

  var oldHoursString = $('#hoursNext').text();
  var oldMinutesString = $('#minutesNext').text();
  var oldSecondsString = $('#secondsNext').text();

  var hoursString = formatTime(remainingHours);
  var minutesString = formatTime(remainingMinutes);
  var secondsString = formatTime(remainingSeconds);

  $('#hoursValue').text(oldHoursString);
  $('#minutesValue').text(oldMinutesString);
  $('#secondsValue').text(oldSecondsString);

  $('#hoursNext').text(hoursString);
  $('#minutesNext').text(minutesString);
  $('#secondsNext').text(secondsString);

  // set and animate
  if(oldHoursString !== hoursString) {
    $('#hoursValue').animate({top: '-=1em'});
    $('#hoursNext').animate({top: '-=1em'});
  }

  if(oldMinutesString !== minutesString) {
    $('#minutesValue').animate({top: '-=1em'});
    $('#minutesNext').animate({top: '-=1em'});
  }

  if(oldSecondsString !== secondsString) {
    $('#secondsValue').animate({top: '-=1em'});
    $('#secondsNext').animate({top: '-=1em'});
  }
}


function formatTime(intergerValue){

  return intergerValue > 9 ? intergerValue.toString():'0'+intergerValue.toString();

}

function decrementTimer(){

  remainingTime-=(1*1000);

  if(remainingTime<1000){
    onStopTimer();
  }

  renderTimer();
}
