const display = document.getElementById('display');
/*function play() {
    const clearaudio = document.getElementById("clear-audio");
    clearaudio.play();
}*/

const buttons = document.querySelectorAll(".buttons > input");

for(let button of buttons) {
  button.addEventListener('click', (e) => {
      let sound;
      if (e.target.id == "clear") 
      {
        sound = document.querySelector("#clear-audio");
        sound.currenttime = 0;
        sound.play();
        display.innerText = '';
      }
      else if (e.target.id == "divide") 
      {
        sound = document.querySelector("#divide-audio");
        sound.currenttime = 0;
        sound.play();
        display.innerText += '/';
      }
      else if (e.target.id == "backspace") 
      {
        sound = document.querySelector("#backspace-audio");
        sound.currenttime = 0;
        sound.play();
        if(display.innerText){
            display.innerText = display.innerText.slice(0, -1);
        }
      }
      else if (e.target.id == "multiply") 
      {
        const sound1 = document.querySelector("#multiply-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += '*';
      }
      else if (e.target.id == "nine") 
      {
        const sound1 = document.querySelector("#nine-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 9;
      }
      else if (e.target.id == "eight") 
      {
        const sound1 = document.querySelector("#eight-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 8;
      }
      else if (e.target.id == "seven") 
      {
        const sound1 = document.querySelector("#seven-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 7;
      }
      else if (e.target.id == "subtract") 
      {
        const sound1 = document.querySelector("#subtract-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += '-';
      }
      else if (e.target.id == "six") 
      {
        const sound1 = document.querySelector("#six-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 6;
      }
      else if (e.target.id == "five") 
      {
        const sound1 = document.querySelector("#five-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 5;
      }
      else if (e.target.id == "four") 
      {
        const sound1 = document.querySelector("#four-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 4;
      }
      else if (e.target.id == "add") 
      {
        const sound1 = document.querySelector("#add-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += '+';
      }
      else if (e.target.id == "three") 
      {
        const sound1 = document.querySelector("#three-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 3;
      }
      else if (e.target.id == "two") 
      {
        const sound1 = document.querySelector("#two-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 2;
      }
      else if (e.target.id == "one") 
      {
        const sound1 = document.querySelector("#one-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 1;
      }
      else if (e.target.id == "left-bracket") 
      {
        const sound1 = document.querySelector("#left-bracket-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += '(';
      }
      else if (e.target.id == "right-bracket") 
      {
        const sound1 = document.querySelector("#right-bracket-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += '(';
      }
      else if (e.target.id == "zero") 
      {
        const sound1 = document.querySelector("#zero-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += 0;
      }
      else if (e.target.id == "period") 
      {
        const sound1 = document.querySelector("#period-audio");
        sound1.currenttime = 0;
        sound1.play();
        display.innerText += '.';
      }
      else if (e.target.id == "equal") 
      {
        const sound1 = document.querySelector("#equal-audio");
        sound1.currenttime = 0;
        sound1.play();
        try{
            display.innerText = eval(display.innerText);
        } catch {
            display.innerText = 'Error!';
        } 
    }
  })
}

//using an array
/*const buttons = Array.from(document.getElementsByClassName('button'));

// to add the content a clicked button the display
buttons.map( buttons => {
    buttons.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                break;
            case '←':
                if(display.innerText){
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            case '=':
                try{
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = 'Error!';
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});*/


