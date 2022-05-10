const square_class ='square'
const circle_class ='circle'
const win_comb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winnerDisplayTextElement = document.querySelector('[data-winner-message-display-text]')
const winnerDisplayElement = document.getElementById('winner-display')
const reset = document.getElementById
const tileElements = document.querySelectorAll('[box-tile]')
const box = document.getElementById('box')

 let circleTurn

 startGame()
 reset.addEventListener('click', startGame)



function startGame(){
     circleTurn = false 
 tileElements.forEach(tile => {
     tile.addEventListener('click', handleClick,{once:true})
 })
setBoxHoverClass()
winnerDisplayElement.classList.remove('show')
}

function handleClick(e){
    const tile = e.target
    const currentClass = circleTurn ? circle_class : square_class
    placeShape(tile, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)

    } else if (isTied()){
        endGame(true)
    } else {
        switchTurns()
        setBoxHoverClass()
    }

    //place shapes
    //check for win
    //check for draw
    //switch turns
    
}

function placeShape(tile, currentClass){
    tile.classList.add(currentClass)
} 
 function switchTurns(){
     circleTurn = !circleTurn
 }
 function setBoxHoverClass(){
 box.classList.remove(square_class)
 box.classList.remove(circle_class)
 if (circleTurn) { 
     box.classList.add(circle_class)
 } else{
     box.classList.add(square_class)
 }
 }

 function checkWin(currentClass) {
      return win_comb.some(comb =>{
          return  comb.every(index =>{
              return tileElements[index].classList.contains(currentClass)
          })
      })
 }
 function endGame(tie) {
     if (tie){
         winnerDisplayTextElement.innerText = 'Its A Tie!'

     } else{
         winnerDisplayTextElement.innerText = `${circleTurn ? "Circle" : "Square"} Wins!`
     }
     winnerDisplayElement.classList.add('show')
 }
 function isTied(){
     return [...tileElements].every(tile => {
         return tile.classList.contains(square_class) || tile.classList.contains(circle_class)
     })
 }
