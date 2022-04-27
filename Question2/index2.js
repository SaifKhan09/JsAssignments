let responseObject = {
    name: "",
    full_name: "",
    private: false,
    owner: {
        login: "",
        name: "",
        followersCount: "",
        followingCount: "",
    },
    licenseName: "",
    score: "",
    numberOfBranch: ""
}

async function fetchData() {
    var inputVal = document.getElementById("myInput").value;

    try {
        let generalUrl = `https://api.github.com/search/repositories?q={${inputVal}}`;
        let generalData = fetchDataFromUrl(generalUrl);
        generalData.then(fetchedData => {
            let data = fetchedData.items[0];
            console.log(data);
            responseObject.name = data.name;
            responseObject.full_name = data.full_name;
            responseObject.owner.login = data.owner.login;
            responseObject.licenseName = data.license.name;
            responseObject.score = data.score;
            let ownerUrl = data.owner.url
            let branchesUrl = data.branches_url;
            let ownerData = fetchDataFromUrl(ownerUrl);
            ownerData.then(response => {
                console.log(response);
                responseObject.owner.name = response["name"];
                responseObject.owner.followersCount = response["followers"];
                responseObject.owner.followingCount = response["following"];
            });
            const branchUrl = branchesUrl.slice(0, -9);
            let branchData = fetchDataFromUrl(branchUrl);
            console.log(branchUrl);
            branchData.then(response => {
                responseObject.numberOfBranch = response.length;
            });
        });
    } catch (error) {
        console.log(error);
    }
}

async function fetchDataFromUrl(url) {
    try {
        let res = await fetch(url);
        let fetchedData = await res.json();
        return fetchedData;
    } catch (error) {
        return error.message;
    }
}
