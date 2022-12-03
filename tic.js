const cont= document.querySelector('.cont'),
selectX = cont.querySelector('.x'),
selectO = cont.querySelector('.o'),
playboard = document.querySelector('.playboard'),
allbox =  document.querySelectorAll('section span'),
player =  document.querySelector('.player'),
resultbox =  document.querySelector('.resultbox'),
wontext =  document.querySelector('.wontext'),
replay =  document.querySelector('.btn')
  
window.onload =()=>{
for(let i=0 ; i<allbox.length; i++){
    allbox[i].setAttribute('onclick' , 'clickedbox(this)')
}
     selectX.onclick=()=>{
        cont.classList.add('hide')
        playboard.classList.add('show')
      //   player.setAttribute('class' , 'player active Player')
     }
     selectO.onclick=()=>{
        cont.classList.add('hide')
        playboard.classList.add('show')
        player.setAttribute('class' , 'player active Player')
     }
}

let playerXicon= 'fas fa-times';
let playerOicon= 'far fa-circle';
let playersign = 'X';
let runbot = true;

function clickedbox(element){
   if(player.classList.contains('Player')){
      element.innerHTML= `<i class="fa-regular fa-circle"></i>`;
      player.classList.add('active')
      playersign= 'O';
      element.setAttribute('id' , playersign)

   }
   else{
      element.innerHTML=`<i class="${playerXicon}"> </i>`;
      player.classList.add('active')
      element.setAttribute('id' , playersign)
   }
   winner();
   element.style.pointerEvents = "none";
   playboard.style.pointerEvents = 'none'
   let randomDelaytime = ((Math.random() * 1000) + 200).toFixed()
   setTimeout(()=>{
      bot(runbot);
   }, randomDelaytime)
}


function bot(runbot){
   if(runbot){
      playersign='O';
   let array=[];
   for(let i=0; i<allbox.length; i++){
      if(allbox[i].childElementCount==0){
         array.push(i)
      }
   }
   let randombox= array[Math.floor(Math.random()* array.length)]
   if(array.length > 0){
      if(player.classList.contains('Player')){
         allbox[randombox].innerHTML= `<i class="${playerXicon}"></i>`;
         player.classList.add('active')
         playersign='X'
         allbox[randombox].setAttribute('id' , playersign)
      }
      else{
         allbox[randombox].innerHTML=`<i class="${playerOicon}"> </i>`;
         player.classList.add('active')
         player.classList.remove('active')
         allbox[randombox].setAttribute('id' , playersign)
      }
      winner();
   }
   playersign='X'
   allbox[randombox].style.pointerEvents = 'none'
   playboard.style.pointerEvents = 'auto'
   }
}

// winner

function getclass(idname){
   return document.querySelector('.box'+ idname).id
}
function checkclass(val1 , val2 , val3 , sign){
        if(getclass(val1)==sign && getclass(val2)==sign && getclass(val3)==sign){
         return true;
        }
      
}
function winner (){
   if(checkclass(1,2,3,playersign) || checkclass(4,5,6,playersign) || checkclass(6,8,7,playersign) || checkclass(1,4,7,playersign) || checkclass(2,5,8,playersign) || checkclass(4,5,6,playersign) || checkclass(3,6,9,playersign) || checkclass(1,5,9,playersign) || checkclass(3,5,7,playersign)){
      console.log(playersign + 'is the winner')
      runbot=false
      bot(runbot);
      setTimeout(()=>{
         playboard.classList.remove('show');
         resultbox.classList.add('show');
      }, 700)
      wontext.innerHTML=`Player <p>${playersign}</p> win the game!`
   }
   else{
      if(getclass(1) != "" && getclass(2) != "" && getclass(3) != "" && getclass(4) != "" && getclass(5) != "" && getclass(6) != "" && getclass(7) != "" && getclass(8) != "" && getclass(9) != ""){
         runbot=false
         bot(runbot);
         setTimeout(()=>{
            playboard.classList.remove('show');
            resultbox.classList.add('show');
         }, 700)
         wontext.textContent=`Match has been drawn!`;
      }
   }
}

replay.onclick=()=>{
    window.location.reload();
}