let phase = "main";
let player1 = true;
let lifePoints = [4000,4000];

class monsterCard{
    constructor(name, atk, def, lv){
        this.name=name;
        this.atk=atk;
        this.def=def;
        this.lv=lv;
        this.atkPosition=true;
        this.owner=0;
    }

    defMode(){
        this.atkPosition=false;
    }
}

class spellCard{
    
}

//list of monsters
let beaverWarrior = new monsterCard("Beaver Warrior", 1800, 500, 1)
let mythicalElf = new monsterCard("Mythical Elf", 0, 2000, 1)
let magnetWarrior = new monsterCard("Magnet Warrior", 1400, 1400, 1)
let celticGuard = new monsterCard("Celtic Guardian", 1600, 1000, 1)
let bigShieldGardna = new monsterCard("Big Shield Gardna", 800, 1700, 1)
let silentMagician = new monsterCard("Silent Magician", 1500, 1300, 1)
let summonedSkull = new monsterCard("Summoned Skull", 2500, 1700, 2)
let darkMagician = new monsterCard("darkMagician", 2300, 2000, 2)
let shapeSnatch = new monsterCard("Shape Snatch", 2100, 2400, 2)

//*
function attackResolution(monster, target){
    if(target.atkPosition==false){
        if(target.def>monster.atk){
            
        }
    }
}