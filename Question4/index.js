async function fetchData() {
    try {
        let response = await fetch("https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json");
        let data = response.json();
        data.then(res => {
            // console.log(res[0]["Statistics"]["Flights"]);
            let faults = [];
            let corrects = [];
            for (let i = 0; i < res.length; i++) {
                let checkingTotal = res[0]["Statistics"]["Flights"]["Cancelled"]+res[0]["Statistics"]["Flights"]["Delayed"]+res[0]["Statistics"]["Flights"]["Diverted"]+res[0]["Statistics"]["Flights"]["On Time"];
                let givenTotal = res[0]["Statistics"]["Flights"]["Total"];
              if(checkingTotal!=givenTotal){
                faults.push(res[i]);
              }else{
                  corrects.push(res[i]);
              }  
            }
            console.log(faults); 
            console.log(corrects); 
            });
    } catch (error) {
        return (error.message);
    }

}