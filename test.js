//opening hand
for(let i=0; i<5; i++){
    drawCard()
}

//sets cards
addCards()

setHand()

ePhase.addEventListener("click", endPhase);

//draws cards by counting down from the top of the array
function drawCard(){
    for(let i = 0; i<player1Hand.length; i++){
        if(player1Hand[i]=="0"){
            player1Hand[i]=newDeck1[cardTotal];
            cardTotal--
            return;
        }
    }
}

function addCards(){
    for(let i = 0; i<player1Hand.length; i++){
        if(player1Hand[i]!="0"){
            cards[i].innerHTML = `<img class="fit ${player1Hand[i][1]} ${player1Hand[i][0]} ${i}" src="images/${player1Hand[i][1]}.png">`
            cards[i].classList.remove("empty")
        }
    }
}

function battlePhase2(){
    alert("it's battle time")
    //disables main phase listeners
    for(let i of cards){
        if(!i.classList.contains("empty")){
            let newImage = i.querySelector("img")
            if(newImage.classList[2]=="m"){
                newImage.removeEventListener("click", summonMonster2)
            }
            if(newImage.classList[2]=="s"){
                newImage.removeEventListener("click", activateSpell2)
            }
            if(newImage.classList[2]=="t"){
                newImage.removeEventListener("click", setTrap2)
            }
        }
    }
    //allows monsters to attack if in ATK position
    for(let i of rightMZActive){
        if(i.querySelector("img").classList.contains("ATK")){
            i.addEventListener('click',declareAttack2)
        } 
    }
    //removes battle phase listener
    bPhase.removeEventListener("click", battlePhase2)
    phase = "battle"
}



//listener ends the turn
function endPhase2(){
    ePhase.removeEventListener("click", endPhase2);
    //disables main phase listeners
    if(phase=="main"){
        for(let i of cards){
            if(!i.classList.contains("empty")){
                let newImage = i.querySelector("img")
                if(newImage.classList[2]=="m"){
                    newImage.removeEventListener("click", summonMonster2)
                }
                if(newImage.classList[2]=="s"){
                    newImage.removeEventListener("click", activateSpell2)
                }
                if(newImage.classList[2]=="t"){
                    newImage.removeEventListener("click", setTrap2)
                }
            }
        }
        bPhase.removeEventListener("click", battlePhase2)
    } else {
        //disables battlephase listeners
        for(let i of leftMZActive){
            if(i.querySelector("img").classList.contains("ATK")){
                i.removeEventListener('click',declareAttack2)
            }
        } 
    }
    //starts next players turn
    phase="main"
    alert("Player 1, it's your turn")
    clearHand()
    drawCard()
    addCards()
    setHand()
    bPhase.addEventListener("click", battlePhase);
    ePhase.addEventListener("click", endPhase);
}

//listener for summoning monsters
function summonMonster2(monster){
    //saves monster name for global
    monsterName=monster.target
    //empties card space
    monster.target.parentElement.classList.add("empty")
    player2Hand[monsterName.classList[3]] = "0"
    //globalizes stats
    monsterStats = monsterSeperator()
    //checks if monster need to be tribute summoned
    if(monsterStats[3]>1){
        //tribute summoned monsters replace old monsters so they become listeners
        if(rightMZActive.length>0 && confirm("Tribute Summon?")){
            for(let j of rightMZActive){
                j.addEventListener("click", tributeMonster2)
            }
        } else {
            //cancels summon if player doesn't want to tribute summon
            return;
        }
    }else{
        //makes every space a place where monsters can be summoned
        for(let j of rightMZEmpty){
            j.addEventListener("click", placeMonster2)
        }
    }
    
    //players can only summon once per turn so this makes sure of that
    for(let i of cards){
        i.querySelector("img").removeEventListener("click", summonMonster2)
    }
}

//checks stats
function monsterSeperator2(){
    for(let i of monsterList){
        if(monsterName.classList[1]==i[0]){
            return i;
        }
    }
}

//places monster on the field
function placeMonster2(evt){
    //makes space active
    evt.target.classList.remove("empty")
    evt.target.classList.add("active")
    //assigns stats to field stats
    if(evt.target.classList[1]=="1"){
        rightMonsters[0][0]=monsterStats[0];
        rightMonsters[0][1]=monsterStats[1];
        rightMonsters[0][2]=monsterStats[2];
    } else if(evt.target.classList[1]=="2"){
        rightMonsters[1][0]=monsterStats[0];
        rightMonsters[1][1]=monsterStats[1];
        rightMonsters[1][2]=monsterStats[2];
    } else if(evt.target.classList[1]=="3"){
        rightMonsters[2][0]=monsterStats[0];
        rightMonsters[2][1]=monsterStats[1];
        rightMonsters[2][2]=monsterStats[2];
    }
    //sets monster to attack or defense position
    if(confirm("ATK(OK) or DEF(Cancel)?")){
        evt.target.innerHTML = `<img class="fit ${monsterName.classList[1]} ATK" src="images/right/${monsterName.classList[1]}.png"><p class = "stats">${monsterStats[1]}</p>`
    } else {
        evt.target.innerHTML = `<img class="fit ${monsterName.classList[1]} DEF" src="images/${monsterName.classList[1]}.png"><p class = "stats">${monsterStats[2]}</p>`
    }
    //removes card from hand
    monsterName.remove()
    //prevents monster from being summoned more than it should
    for(let i of newRMZ){
        i.removeEventListener("click", placeMonster2)
    }
}

function tributeMonster2(evt){
    //replaces old monster with new monster
    let tribute = evt.target.parentElement
    if(tribute.classList[1]=="1"){
        rightMonsters[0]=monsterStats
    } else if(tribute.classList[1]=="2"){
        rightMonsters[1]=monsterStats
    } else if(tribute.classList[1]=="3"){
        rightMonsters[2]=monsterStats
    }
    //asks for position
    if(confirm("ATK(OK) or DEF(Cancel)?")){
        tribute.innerHTML = `<img class="fit ${monsterName.classList[1]} ATK" src="images/right/${monsterName.classList[1]}.png"><p class = "stats">${monsterStats[1]}</p>`
    } else {
        tribute.innerHTML = `<img class="fit ${monsterName.classList[1]} DEF" src="images/${monsterName.classList[1]}.png"><p class = "stats">${monsterStats[2]}</p>`
    }
    //remove from hand
    monsterName.remove()
    //prevents monster from being summoned more than it should
    for(let i of newRMZ){
        i.removeEventListener("click", tributeMonster2)
    }
}

//makes it so that monster position can be changed
function changablePosition2(){
    for(let i of rightMZActive){
        console.log(i)
        i.querySelector('p').addEventListener('click',changePosition2)
    }
}
//changes monster position
function changePosition2(evt){
    monsterName = evt.target.parentElement.querySelector('img')
    let monsterNumber = evt.target.parentElement.classList[1]-1
    //makes sure
    if(!confirm("Are you sure you want to change position?")){
        return;
    }
    //swaps position and stats
    if(monsterName.classList[2]=="DEF"){
        evt.target.parentElement.innerHTML = `<img class="fit ${monsterName.classList[1]} ATK" src="images/left/${monsterName.classList[1]}.png"><p class = "stats">${leftMonsters[monsterNumber][1]}</p>`
    } else {
        evt.target.parentElement.innerHTML = `<img class="fit ${monsterName.classList[1]} DEF" src="images/${monsterName.classList[1]}.png"><p class = "stats">${leftMonsters[monsterNumber][2]}</p>`
    }
}

//places the cards from hand to spell and trap zone
function activateSpell2(spell){
    //globalizes target
    spellName=spell.target
    //checks the seperator to see if the spell can be activated
    if(spellSeperator1(spellName)){
        //if it passes the seperator then it empties it space
        spell.target.parentElement.classList.add("empty")
        player1Hand[spellName.classList[3]] = "0"
        //ads listener to open spell and trap zones
        for(let j of leftSTZEmpty){
            j.addEventListener("click", placeSpell2)
        }
    }
}

//places spell in spell or trap zone
function placeSpell2(evt){
    spellSound.play()
    //posts image
    evt.target.innerHTML = `<img class="fit ${spellName.classList[1]}" src="images/right/${spellName.classList[1]}.png">`;
    //checks seperator to apply listeners
    spellSeperator2();
    //globalizes target
    temp = evt.target;
    //removes listener
    for(let i of newLSTZ){
        i.removeEventListener("click", placeSpell2)
    }
}

//readies trap from hand
function setTrap2(trap){
    //globalizes target
    trapName=trap.target
    //empties space
    trap.target.parentElement.classList.add("empty")
    player2Hand[trapName.classList[3]] = "0"
    //adds listener to potential locations
    for(let j of leftSTZEmpty){
        j.addEventListener("click", placeTrap)
    }
}

//places trap in spell and trap zones
function placeTrap2(evt){
    trapSound.play()
    //places card back to hide trap
    evt.target.innerHTML = `<img class="fit ${trapName.classList[1]}" src="images/right/cardback.png">`;
    //makes space active
    evt.target.classList.remove("empty")
    evt.target.classList.add("active")
    //checks what trap it is
    if(trapName.classList[1]=="magicCylinder"){
        magicCylinder2++
    }
    if(trapName.classList[1]=="negateAttack"){
        negateAttack2++
    }
    //remove listeners to prevent adding more traps
    for(let i of newRSTZ){
        i.removeEventListener("click", placeTrap2)
    }
    trapName.remove()
}

//attack listener to your monsters
function declareAttack2(evt){
    //globalizes target
    monsterName = evt.target
    //saves attack value
    attackingValue = evt.target.parentElement.querySelector("p").innerText
    //monsters can only attack once
    evt.target.parentElement.removeEventListener('click',declareAttack2)
    //check if your opponent has a trap
    let trapActivation = confirm("Does your opponent have a response?")
    if(trapActivation){
        if(negateAttack1+magicCylinder1>0){
            trapSeperator();
            return 
        }else{
            alert("No they don't")
        }
    } else{
        alert("No they don't")
    }
    attackSound.play()
    //check if opponent has monsters on the field
    if(leftMZActive.length==0){
        alert("you attack directly")
        document.querySelector(".p1").innerText-=attackingValue
        //checks if you won
        if (document.querySelector(".p1").innerText<0){
            player2Wins()
        }
        return;
    }
    //adds listener to opponent's monsters
    for(let i of leftMZActive){
        i.addEventListener("click", attackResolution2)
    }
}


//listener for attack target
function attackResolution2(evt){
    let holder = evt.target.parentElement
    let damage = attackingValue-holder.querySelector("p").innerText
    //check if attack will destroy monster
    if(damage>0){
        //damage is dealt if it's in attack position
        if(evt.target.classList.contains("ATK")){
            alert(`Player 2 takes ${damage} points of damage`)
            document.querySelector(".p1").innerText-=damage;
            //check if player wins
            if (document.querySelector(".p1").innerText<0){
                player1Wins()
            }
        } else {
            alert(`You destroyed their monster`)
        }
        //clears space
        holder.innerHTML = "";
        holder.classList.remove("active")
        holder.classList.add("empty")
        
    } else {
        //removes your monster if your monster is weaker
        alert('Your monster is destroyed')
        monsterName.parentElement.innerHTML = "";
        monsterName.parentElement.classList.remove("active")
        monsterName.parentElement.classList.add("empty")
    }
    //removes listener from targets
    for(let i of leftMZActive){
        i.removeEventListener("click", attackResolution2)
    }
}

//player 1 wins
function player2Wins(){
    for(let i of rightMZActive){
        if(i.querySelector("img").classList.contains("ATK")){
            i.removeEventListener('click',declareAttack2)
        }
    }
    ePhase.removeEventListener("click", endPhase2);
    alert("Congratulations Player 2")
}

//checks is spells can be activated
function spellSeperator1right(spellTitle){
    let sCardName = spellTitle.classList[1]
    //checks if enemy has traps
    if(sCardName==="MST"){
        if(leftSTZEmpty.length<3){
            return true;
        }
    }
    //checks if enemy has attack position monsters
    if(sCardName==="Fissure"){
        for(let i of leftMZActive){
            if(i.querySelector('img').classList[2]=="ATK"){
                return true;
            }
        }
    }
    //checks if enemy has defense position monsters
    if(sCardName==="shieldCrush"){
        for(let i of leftMZActive){
            if(i.querySelector('img').classList[2]=="DEF"){
                return true;
            }
        }
    }
    //checks if you have a monster
    if(sCardName==="egoBoost"){
        if(rightMZEmpty.length<3){
            return true;
        }
    }
    return false
}

//adds listeners for targets
function spellSeperator2right(){
    let newSCardName = spellName.classList[1]
    if(newSCardName==="MST"){
        if(leftSTZEmpty.length<3){
            MST();
        }
    }
    if(newSCardName==="Fissure"){
        for(let i of leftMZActive){
            if(i.querySelector('img').classList[2]=="ATK"){
                i.querySelector('img').addEventListener("click",destroyMonster2);
            }
        }
            
    }
    if(newSCardName==="shieldCrush"){
        for(let i of leftMZActive){
            if(i.querySelector('img').classList[2]=="DEF"){
                i.querySelector('img').addEventListener("click",destroyMonster2);
            }
        }
    }
    if(newSCardName==="egoBoost"){
        if(rightMZEmpty.length<3){
            egoBoost();
        }
        
    }
}

//adds listeners to traps
function MST2(){
    for(let i of leftSTZActive){
        i.querySelector("img").addEventListener("click", MSTright)
    } 
}

//listener for MST targets
function MSTright(evt){
    //empties space
    evt.target.parentElement.classList.remove("active")
    evt.target.parentElement.classList.add("empty")
    evt.target.remove();
    //remove original
    spellName.remove();
    temp.querySelector("img").remove()
    //removes listeners from targets
    for(let i of leftSTZActive){
        i.querySelector("img").removeEventListener("click", MSTright)
    } 
}

//listener for fissure and shield crush
function destroyMonster2(evt){
    //empties space
    evt.target.parentElement.classList.remove("active")
    evt.target.parentElement.classList.add("empty")
    evt.target.parentElement.innerHTML = "";
    //removes original
    spellName.remove();
    temp.querySelector("img").remove()
    //removes listeners from targets
    for(let i of leftMZActive){
        i.querySelector("img").removeEventListener("click", destroyMonster2)
    }
}

//adds listeners to applicable targets
function egoBoost2(title){
    for(let i of rightMZActive){
        console.log(monsterList)
        i.querySelector("img").addEventListener("click",egoBoostBoost2)
    } 
}

//listener for egoBoost target
function egoBoostBoost2(evt){
    //remove original
    spellName.remove();
    temp.querySelector("img").remove()
    //removes listeners
    for(let i of rightMZActive){
        i.querySelector("img").removeEventListener("click",egoBoostBoost2)
    }
    //increases attack in both dom and array
    evt.target.parentElement.querySelector("p").innerText=(evt.target.parentElement.querySelector("p").innerText *1) + 500;
    rightMonsters[evt.target.parentElement.classList[1]-1][1] += 500
}

//checks traps for activation
function trapSeperator2(){
    //asks what trap to activate
    let trapDivider = confirm("Negate Attack(OK) or Magic Cylinder(Cancel)?")
    //checks if you can/want to activate negate attack
    if((negateAttack1>0&&magicCylinder1>0&&trapDivider)||(negateAttack1>0&&magicCylinder1<=0)){
        //looks for the trap to reveal
        for(let i of leftSTZActive){
            if(i.querySelector("img").classList.contains("negateAttack")){
                i.innerHTML=`<img class="fit negateAttack" src="images/left/negateAttack.png">`
                setTimeout(() => {
                    document.querySelector(".p2").innerText-=attackingValue;
                  }, 3000)
                //empties space
                i.classList.remove('active')
                i.classList.add('empty')
                i.innerHTML= ""
            }
        }
    } else {
        //look for the magicCylinder to activate
        for(let i of leftSTZActive){
            if(i.querySelector("img").classList.contains("magicCylinder")){
                i.innerHTML=`<img class="fit magicCylinder" src="images/left/magicCylinder.png">`
                setTimeout(() => {
                    endPhase();
                  }, 3000)
                i.classList.remove('active')
                i.classList.add('empty')
                i.innerHTML= ""
            }
        }
    }
}