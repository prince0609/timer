let second = 0,
  minute = 0,
  hour = 0,
  ms = 0,
  timeStampCount = 0,
  start_pause = 0,
  timer_is_blinking = 0;

let main = document.getElementById("main");
let milisec = document.getElementById("milisec");
let mainTimeId, blinkingId;

function showButtons() {
  let pause = document.getElementById("pause");
  let stamp = document.getElementById("stamp");
  pause.style.display = "inline";
  stamp.style.display = "inline";
}

function startTimer() {
  start_pause++;

  if (start_pause > 1) {
    start_pause--;
    return;
  }
  document.getElementById("main").style.visibility = "visible";
  showButtons();
  mainTimeId = setInterval(calculatingTime, 10);
  clearInterval(blinkingId);
  timer_is_blinking = 0;
}

function hideButtons() {
  let pause = document.getElementById("pause");
  let stamp = document.getElementById("stamp");
  pause.style.display = "none";
  stamp.style.display = "none";
}

function resetTimer() {
  (second = 0), (minute = 0), (hour = 0), (timeStampCount = 0), (ms = 0);

  main.innerText = `00:00:00`;
  milisec.innerText = `00`;
  clearInterval(mainTimeId);
  clearInterval(blinkingId);
  document.getElementById("main").style.visibility = "visible";
  timer_is_blinking = 0;

  start_pause = 0;
  hideButtons();

  let table = document.getElementsByTagName("table");
  table[0].innerHTML = "";
  //getElementsByTagName returns list of all elements with that tagname
}

function calculatingTime() {
  let currentTime = main.innerText.toString();
  ms = milisec.innerText.toString();
  hour = currentTime.slice(0, 2);
  minute = currentTime.slice(3, 5);
  second = currentTime.slice(6, 8);
  hour = parseInt(hour);
  minute = parseInt(minute);
  second = parseInt(second);
  ms = parseInt(ms);
  ms++;

  second += Math.floor(ms / 100);
  ms = ms % 100;
  minute += Math.floor(second / 60);
  second = second % 60;

  hour = hour.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  second = second.toString().padStart(2, "0");
  ms = ms.toString().padStart(2, "0");

  main.innerText = `${hour}:${minute}:${second}`;
  milisec.innerText = ms;
}

let timer = document.getElementById("main");

function blinking() {
  blinkingId = setInterval(() => {
    let visibility = timer.style.visibility;
    if (visibility == "hidden") {
      timer.style.visibility = "visible";
    } else {
      timer.style.visibility = "hidden";
    }
  }, 450);
}

function pauseTimer() {
  clearInterval(mainTimeId);
  hideButtons();
  let currentTime = main.innerText.toString();
  start_pause = 0;
  if (currentTime != "00:00:00" && timer_is_blinking == 0) {
    timer_is_blinking = 1;
    blinking();
  }
}

function markStamp() {
  if (start_pause == 0) return;
  timeStampCount++;
  let table = document.getElementById("table");
  table.innerHTML += `<tr>
                    <td class="entry"> #${timeStampCount} </td>
                    <td class="entry"> ${main.innerText}.${milisec.innerText}</td>
                    </tr>`;
}

document.getElementById("start").addEventListener("click", startTimer);

document.getElementById("pause").addEventListener("click", pauseTimer);

document.getElementById("reset").addEventListener("click", resetTimer);

document.getElementById("stamp").addEventListener("click", markStamp);
