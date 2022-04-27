async function fetchData() {
    let url = "https://api.nobelprize.org/v1/prize.json";
    try {
        let res = await fetch(url);
        let data = await res.json();
        let prizeList = data["prizes"];
        let validPrizes = [];
        for (let prize = 0; prize < prizeList.length; prize++) {
            if(parseInt(prizeList[prize].year)>=2000 && parseInt(prizeList[prize].year)<=2019 && prizeList[prize].category==="chemistry"){
                validPrizes.push(prizeList[prize]);
            }
        }
        console.log(validPrizes);
    } catch (error) {
        console.log(error);
    }
}
