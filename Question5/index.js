let responseObject = {
    actors: [
        {
            Name: "",
            Movies: []
        }
    ],
    Genres: [
        {
            Type: "",
            Movies: []
        }
    ]
}

async function fetchData() {
    try {
        let response = await fetch("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json");
        let data = response.json();
        let Actors = [];
        let Genres = [];
        data.then(res => {
                // console.log(res[2345]);
            for (let i = 0; i < res.length; i++) {
                let castMembersLength = res[i]["cast"].length;
                for (let j = 0; j < castMembersLength; j++) {
                    Actors.push(res[i]["cast"][j]);
                }

                let genresLength = res[i]["genres"].length;
                for (let k = 0; k < genresLength; k++) {
                    Genres.push(res[i]["genres"][k]);
                }
            }

            let uniqueActors = [...new Set(Actors)];
            for (let i = 0; i < uniqueActors.length; i++) {
                let actorObject={
                    Name:"",
                    Movies:[],
                };
                actorObject["Name"]=uniqueActors[i];
                actorObject["Movies"] = movieFinderActor(uniqueActors[i],res);
                responseObject.actors.push(actorObject);
            }

            let uniqueGenres = [...new Set(Genres)];
            for (let i = 0; i < uniqueGenres.length; i++) {
                let genreObject={
                    Type:"",
                    Movies:[],
                };
                genreObject["Type"]=uniqueGenres[i];
                genreObject["Movies"] = movieFinderGenre(uniqueGenres[i],res);
                responseObject.Genres.push(genreObject);
            }
            console.log(responseObject);
        })
    } catch (error) {
        console.log(error.message);
    }
}

function movieFinderActor(actor,Arr){
    let movies = [];
    for (let i = 0; i < Arr.length; i++) {
        if (Arr[i]["cast"].includes(actor)){
            movies.push(Arr[i]["title"]);
        }
    }
    return movies;
}

function movieFinderGenre(genre,Arr){
    let movies = [];
    for (let i = 0; i < Arr.length; i++) {
        if (Arr[i]["genres"].includes(genre)){
            movies.push(Arr[i]["title"]);
        }
    }
    return movies;
}
