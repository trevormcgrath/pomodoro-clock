$(document).ready(function() {

  var sessionValue = 25;
  var clockValue = sessionValue;
  var restValue = 5;
  var seconds = 60;

  var masterRest = restValue;
  var masterSession = sessionValue;

  var timeSwitch = true;

  // the intial values on page load & pre clock start
  $('#work-settings').html(sessionValue);
  $('#time').html(clockValue);
  $('#rest-settings').html(restValue);

  // a function to update values when called
  function clockChanger() {
    $('#work-settings').html(sessionValue);
    $('#time').html(clockValue);
    $('#rest-settings').html(restValue);
  };

  // subtracting minutes from the clock's value
  $('#session-minus').click(function() {
    if (sessionValue <= 1) {
      alert("Come on, you can be productive for at least a minute!");
      sessionValue = 1;
    } else {
      clockValue--;
      sessionValue--;
      masterSession--;
      clockChanger();
    }
  });

  // adding minutes to the session value
  $('#session-plus').click(function() {
    sessionValue++;
    clockValue++;
    masterSession++;
    clockChanger();
  });

  // subtracting minutes from the rest value
  $('#rest-minus').click(function() {
    if (restValue <= 1) {
      alert("You need to rest for at least a minute!");
      restValue = 1;
    } else {
      restValue--;
      masterRest--;
      clockChanger();
    }
  });

  // adding minutes to the rest value
  $('#rest-plus').click(function() {
    restValue++;
    masterRest++;
    clockChanger();
  });

  // Play audio sound
  function sound() {
    var sound = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
    var audio = new Audio(sound);
    audio.play();
  };

  // displaying the minutes & seconds in the clock
  function clockDisplay() {
    if (seconds === 60) {
      $('#time').html(clockValue + ':00');
    } else if (seconds < 10) {
      $('#time').html(clockValue + ':' + '0' + seconds);
    } else {
      $('#time').html(clockValue + ':' + seconds);
    }
  };

  // change the clock over to the rest timer
  function resetTimer() {

    if (timeSwitch === true) {
      clockValue = masterRest;
      sessionValue = masterRest;
      timeSwitch = false;
    } else {
      clockValue = masterSession;
      sessionValue = masterSession;
      timeSwitch = true;
    }

  };

  // function to handle clock functionality
  function clockHandler() {
    if (clockValue === 0 && seconds === 0) {
      sound();
      resetTimer();
    } else if (clockValue === sessionValue) {
      clockValue--;
      seconds = 60;
      seconds--;
      clockDisplay();
    } else if (seconds === 0) {
      clockValue--;
      seconds = 60;
      seconds--;
      clockDisplay();
    } else {
      seconds--;
      clockDisplay();
    }
  };

  // button functionality to start, pause, or reset
  $('.start').click(function() {

    $(".start").prop('disabled', true);
    $("#session-minus").prop('disabled', true);
    $("#session-plus").prop('disabled', true);
    $("#rest-minus").prop('disabled', true);
    $("#rest-plus").prop('disabled', true);

    //starts the clock on start button click
    var stoppingVar = setInterval(clockHandler, 1000);

    // stop the clock from ticking
    $('.stop').click(function() {
      clearInterval(stoppingVar);
      $(".start").prop('disabled', false);
    });

    // reset Session and Rest to origin values
    $('.reset').click(function() {
      clearInterval(stoppingVar);
      sessionValue = 25;
      clockValue = sessionValue;
      restValue = 5;
      seconds = 60;
      $(".start").prop('disabled', false);
      $("#session-minus").prop('disabled', false);
      $("#session-plus").prop('disabled', false);
      $("#rest-minus").prop('disabled', false);
      $("#rest-plus").prop('disabled', false);

      clockChanger();
    });

  });

});