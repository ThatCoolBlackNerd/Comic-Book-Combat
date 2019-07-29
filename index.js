'use strict';

const apiKey = ['8783397cb5c4676dffcda5c5af5d4c9086a4ae9d','10101046963798377'];
let characterNameOne = "";
let characterNameTwo = "";
let characterCode = "";
let characterCodeTwo = "";

function fightAgain () {
    $('main').on('click','.reset', event => {
        console.log('Im Here');
        document.location.reload();
     });
}

function displayWinner (hPowersOne, hPowersTwo) {
    $('main').on('click', '.fightButton', function () {
        
// For Loop to add the sume of the PowerStats Object
        let charPowerOne = 0;
        for (var x in hPowersOne.powerstats) {
            charPowerOne += hPowersOne.powerstats[x];
        }

        let charPowerTwo = 0;
        for (var x in hPowersTwo.powerstats) {
            charPowerTwo += hPowersTwo.powerstats[x];
        }

//Determines the winner of the fight based on who has the highest combined power score
        if (charPowerOne > charPowerTwo) {
            $('main').empty();
            $('.versusScreen').html(`
            <header class="winning">
                <h2 class="winner">${hPowersOne.name} Wins</h2>
                <img src ="${hPowersOne.image.url}" class="winningImg" alt="${hPowersOne.name}">
            </header>
            <div id="js-characterInfo"></div>
            <nav class="resetContainer">
                <button class="reset">Choose New Characters</button>
            </nav>
                `);
        } else {
            $('main').empty();
            $('.versusScreen').html(`
            <header class="winning">
                <h2 class="winner">${hPowersTwo.name} Wins</h2>
                <img src ="${hPowersTwo.image.url}" class="winningImg" alt="${hPowersTwo.name}">
            </header>
            <div id="js-characterInfo"></div>
            <nav class="resetContainer">
                <button class="reset">Choose New Characters</button>
            </nav>
                `);
        }

//Displays the results of both Characters on a bar graph on the Winner Screen
        let trace1 = {
            x: ['Combat', 'Durabiity', 'Intelligence', 'Power', 'Speed', 'Strength'],
            y: [hPowersOne.powerstats.combat, hPowersOne.powerstats.durability, hPowersOne.powerstats.intelligence, hPowersOne.powerstats.power, hPowersOne.powerstats.speed, hPowersOne.powerstats.strength],
            name: hPowersOne.name ,
            type: 'bar',
            marker: {color: 'rgb(0, 0, 0)'}
          };
          
          let trace2 = {
            x: ['Combat', 'Durabiity', 'Intelligence', 'Power', 'Speed', 'Strength'],
            y: [hPowersTwo.powerstats.combat, hPowersTwo.powerstats.durability, hPowersTwo.powerstats.intelligence, hPowersTwo.powerstats.power, hPowersTwo.powerstats.speed, hPowersTwo.powerstats.strength],
            name: hPowersTwo.name ,
            type: 'bar',
            marker: {color: 'rgb(30, 144, 255)'}
          };
          
          let data = [trace1, trace2];
          
          let layout = {barmode: 'group', title: 'Tale of the Tape'};
          
          Plotly.newPlot('js-characterInfo', data, layout);
    });
    fightAgain();
}

function characterTwoDisplay (heroTwoInfoCv, heroTwoInforSh) {
    $('main').on('click', '.two', function () {
        $('.characterInfo').empty();
        $('.characterInfo').html(`
        <header class="displayBio bioImage">
            <img src="${heroTwoInfoCv.results[0].image["original_url"]}" class="charImgTwo" alt="${heroTwoInforSh.name}">
        </header>
        <section class="displayBio apperance">
            <ul class ="appearanceList">
                <li>Real Name: ${heroTwoInforSh.biography["full-name"]}</li>
                <li>Height: ${heroTwoInforSh.appearance.height[0]}</li>
                <li>Weight: ${heroTwoInforSh.appearance.weight[0]}</li>
                <li>Species: ${heroTwoInforSh.appearance.race}</li>
                <li>Gender: ${heroTwoInforSh.appearance.gender}</li>
                <li>First Appearance: ${heroTwoInforSh.biography["first-appearance"]}</li>
                <li>Publisher: ${heroTwoInforSh.biography.publisher}</li>
                <li>Character Description: ${heroTwoInfoCv.results[0].deck}</li>
            </ul>
        </section>
        `);
    });

}

function characterOneDisplay (heroOneInfoCv, heroOneInforSh) {
    $('main').on('click', '.one', function () {
        $('.characterInfo').empty();
        $('.characterInfo').html(`
        <header class="displayBio bioImage">
            <img src="${heroOneInfoCv.results[0].image["original_url"]}" class="charImgTwo" alt="${heroOneInforSh.name}">
        </header>
        <section class="displayBio apperance">
            <ul class ="appearanceList">
                <li>Real Name: ${heroOneInforSh.biography["full-name"]}</li>
                <li>Height: ${heroOneInforSh.appearance.height[0]}</li>
                <li>Weight: ${heroOneInforSh.appearance.weight[0]}</li>
                <li>Species: ${heroOneInforSh.appearance.race}</li>
                <li>Gender: ${heroOneInforSh.appearance.gender}</li>
                <li>First Appearance: ${heroOneInforSh.biography["first-appearance"]}</li>
                <li>Publisher: ${heroOneInforSh.biography.publisher}</li>
                <li>Character Description: ${heroOneInfoCv.results[0].deck}</li>
             </ul>
        </section>
        `);
    });

}

function defaultResults (comicVineOne, comicVineTwo, superHeroOne, superHeroTwo) {
    $('.versusScreen').html(`
    <header class ="versusContainer">
        <div class="inner left">
            <h3 class="supName supNameOne">${superHeroOne.name}</h3>
            <img src ="${superHeroOne.image.url}" class="charImg" alt="${superHeroOne.name}">
        </div>
        <div id='split-pane'>
            <div>
                <p class="superVs">Vs.</p>
            </div>
        </div>
        <div class="inner right">
            <h3 class="supName supNameTwo">${superHeroTwo.name}</h3>
            <img src ="${superHeroTwo.image.url}" class="charImg" alt="${superHeroTwo.name}">
        </div>
    </header>
    <nav class="buttonContainer">
    <button class="heroLabel one">${superHeroOne.name}</button><button class="heroLabel two">${superHeroTwo.name}</button><button class="heroLabel fightButton">Fight</button>
    </nav>
    <div class ="characterInfo">
        <header class="bioImage">
            <img src="${comicVineOne.results[0].image["original_url"]}" class="charImgTwo" alt="${superHeroOne.name}">
        </header>
        <section class="apperance">
            <ul class ="appearanceList">
                <li>Real Name: ${superHeroOne.biography["full-name"]}</li>
                <li>Height: ${superHeroOne.appearance.height[0]}</li>
                <li>Weight: ${superHeroOne.appearance.weight[0]}</li>
                <li>Species: ${superHeroOne.appearance.race}</li>
                <li>Gender: ${superHeroOne.appearance.gender}</li>
                <li>First Appearance: ${superHeroOne.biography["first-appearance"]}</li>
                <li>Publisher: ${superHeroOne.biography.publisher}</li>
                <li>Character Description: ${comicVineOne.results[0].deck}</li>
             </ul>
        </section>
    </div>
    `);
    $('main').removeClass("hidden");
    console.log(comicVineOne);
    console.log(comicVineTwo);
    console.log(superHeroOne);
    console.log(superHeroTwo);

}

function newBio (shCharOne, shCharTwo) {

    let comicVineOne = fetch(`https://cors-anywhere.herokuapp.com/https://www.comicvine.com/api/search?api_key=${apiKey[0]}&limit=1&format=json&query=${shCharOne.biography["full-name"]}&query=${shCharOne.name}&resources=character`);
    let comicVineTwo = fetch(`https://cors-anywhere.herokuapp.com/https://www.comicvine.com/api/search?api_key=${apiKey[0]}&limit=1&format=json&query=${shCharTwo.biography["full-name"]}&query=${shCharTwo.name}&resources=character`);

// Fetches information from the ComicVine API using the real name of the Character which was a response from the SuperHero API
    Promise.all([comicVineOne, comicVineTwo])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalVals => {
      let cvCharOne = finalVals[0];
      let cvCharTwo = finalVals[1];
//Displays the initial results with Character One as default
    defaultResults(cvCharOne, cvCharTwo, shCharOne, shCharTwo);
//Makes the Character one button display the information for Character One
    characterOneDisplay(cvCharOne, shCharOne);
//Makes the Character two button display the information for Character Two
    characterTwoDisplay(cvCharTwo, shCharTwo);
//Displays the winner of the fight between the Two Characters 
    displayWinner(shCharOne, shCharTwo);
    })
    .catch(err => {
        console.log(`Something went wrong: ${err.message}`);
    });
}


function getBio () {
    let superHeroOne = fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${apiKey[1]}/${characterCode}`);
    let superHeroTwo = fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${apiKey[1]}/${characterCodeTwo}`);

// Fetches both Characters from the SuperHero API using the Character ID 
    Promise.all([superHeroOne, superHeroTwo])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalVals => {
      let shInfoOne = finalVals[0];
      let shInfoTwo = finalVals[1];
      newBio(shInfoOne, shInfoTwo);
    })
    .catch(err => {
        console.log(`Something went wrong: ${err.message}`);
    });
}

function findCharacter () {
$('form').submit(event => {
    event.preventDefault();

//Grabs the name of Character one and Character Two
    characterNameOne = $("#js-characterOne-search").val();
    characterNameTwo = $("#js-characterTwo-search").val();

//Iterates through the Character List to match the Name with the Character ID to send to the API
    characterCode = Object.keys(characterList).find(key => characterList[key] == characterNameOne);
    characterCodeTwo = Object.keys(characterList).find(key => characterList[key] == characterNameTwo);

//Hides the Landing Page
    $('header').addClass('hidden');
    getBio();
});
}

function makeCharacterList(characterNames) {
    // iterates through character list array and displays it in the DOM as a search form
    $("#js-character-list").append(characterNames.reduce((acc, m) => `${acc} <option value="${m}">`, ''));
}

function runAtStart () {
    findCharacter();
}
$(runAtStart);
makeCharacterList(characterNames);
