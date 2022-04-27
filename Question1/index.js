let dataObject;

let responseObject={
    most_active:{
        attacker_king:null,
        defender_king:null,
        region:null,
        name:null
    },
    attacker_outcome:{
        win:null, 
        loss:null 
    },
    battle_type:null, 
    defender_size:{
        average:null,
        min:null,
        max:null
        }
    }    

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        dataObject = JSON.parse(xhttp.responseText);

        responseObject.most_active.attacker_king = getAttackerKing(dataObject);
        responseObject.most_active.defender_king = getDefenderKing(dataObject);
        responseObject.most_active.region = getRegion(dataObject);
        responseObject.most_active.name = getBattleName(dataObject,responseObject.most_active.attacker_king,responseObject.most_active.defender_king,responseObject.most_active.region);
        responseObject.attacker_outcome.win = getWinOfKing(dataObject,responseObject.most_active.attacker_king);
        responseObject.attacker_outcome.loss = getLossOfKing(dataObject,responseObject.most_active.attacker_king);
        responseObject.battle_type = getUniqueBattleTypes(dataObject);
        responseObject.defender_size.average = getAverageDefenderSize(dataObject);
        responseObject.defender_size.max = getMaxDefenderSize(dataObject);
        responseObject.defender_size.min = getMinDefenderSize(dataObject);
        
        document.getElementById("demo").innerHTML = "Check the Console";
        console.log(responseObject);
    }
    xhttp.open("GET", "./battles.json", true);
    xhttp.send();
}

function getAttackerKing(obj) {
    let ak = [];
    for (const data in obj) {
        ak.push(obj[data].attacker_king);
    }
    return mode(ak);
}

function getBattleName(obj,attacker_king , defender_king , region){
    let battleName;
    for (const data in obj){
        if (obj[data].attacker_king == attacker_king && obj[data].defender_king == defender_king && obj[data].region == region){
            battleName=obj[data].name;        }
    }
    return battleName;
}

function getDefenderKing(obj){
    let dk = [];
    for (const data in obj){
        dk.push(obj[data].defender_king);
    }
    return mode(dk);
}

function getRegion(obj){
    let region = [];
    for (const data in obj){
        region.push(obj[data].region);
    }
    return mode(region);
}

function getWinOfKing (obj ,attacker_king){
    let count = 0;
    for (const data in obj){
        if (obj[data].attacker_outcome=="win"&&obj[data].attacker_king==attacker_king){
            count++;
        }
    }
    return count;
}

function getLossOfKing (obj ,attacker_king){
    let count = 0;
    for (const data in obj){
        if (obj[data].attacker_outcome=="loss"&&obj[data].attacker_king==attacker_king){
            count++;
        }
    }
    return count;
}

function getUniqueBattleTypes (obj){
    let battles = [];
    for (const data in obj){
        battles.push(obj[data].battle_type);
    }
    let uniqueChars = [...new Set(battles)];
    uniqueChars.pop();
    return uniqueChars;
}

function getAverageDefenderSize(obj){
    let total = 0; 
    let count = 0;
    for (const data in obj){
        total+=obj[data].defender_size;
        count++;
    }
    return Math.round(total/count);
}

function getMinDefenderSize(obj){
    let defSize = [];
    for (const data in obj){
        defSize.push(obj[data].defender_size);
    }
    const results = defSize.filter(element => {
        return element !== null;
      });
    let minValue = Math.min(...results);
    return minValue;
}

function getMaxDefenderSize(obj){
    let defSize = [];
    for (const data in obj){
        defSize.push(obj[data].defender_size);
    }
    let maxValue = Math.max(...defSize);
    return maxValue;
}

function mode(array) {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}
