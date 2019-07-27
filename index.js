'use strict';

const apiKey = ['8783397cb5c4676dffcda5c5af5d4c9086a4ae9d','10101046963798377'];
let characterNameOne = "";
let characterNameTwo = "";
let characterCode = "";
let characterCodeTwo = "";




function powerChart (heroOne, heroTwo) {
    var data = [{
        x: ['Combat', 'Durabiity', 'Intelligence', 'Power', 'Speed', 'Strength'],
        y: [heroOne.powerstats.combat, heroOne.powerstats.durability, heroOne.powerstats.intelligence, heroOne.powerstats.power, heroOne.powerstats.speed, heroOne.powerstats.strength],
        type: 'bar'
      }];
      
      Plotly.newPlot('js-characterInfo', data, {}, {showSendToCloud:true});

      var dataTwo = [{
        x: ['Combat', 'Durabiity', 'Intelligence', 'Power', 'Speed', 'Strength'],
        y: [heroTwo.powerstats.combat, heroTwo.powerstats.durability, heroTwo.powerstats.intelligence, heroTwo.powerstats.power, heroTwo.powerstats.speed, heroTwo.powerstats.strength],
        type: 'bar'
      }];
      
      Plotly.newPlot('js-characterInfoTwo', dataTwo, {}, {showSendToCloud:true});
   
}

function characterTwoDisplay (heroTwoInfoCv, heroTwoInforSh) {
    $('main').on('click', 'span.two', function () {
        $('characterInfo').empty();
        $('characterInfo').html(`
        <div class="bioInfo">
        <img src="${heroTwoInfoCv.results[0].image["medium_url"]}" class="bioImage">
        <ul class ="bioList">
            <li>Real Name: ${heroTwoInforSh.biography["full-name"]}</li>
            <li>First Apperance: ${heroTwoInforSh.biography["first-appearance"]}</li>
            <li>Publisher: ${heroTwoInforSh.biography.publisher}</li>
            <li>Character Description: ${heroTwoInfoCv.results[0].deck}</li>
        </ul>
    </div>
    <div id="js-characterInfoTwo"></div>   
        `)
    })

}

function characterOneDisplay (heroOneInfoCv, heroOneInforSh) {
    $('main').on('click', 'span.one', function () {
        $('characterInfo').empty();
        $('characterInfo').html(`
        <div class="bioInfo">
        <img src="${heroOneInfoCv.results[0].image["medium_url"]}" class="bioImage">
        <ul class ="bioList">
            <li>Real Name: ${heroOneInforSh.biography["full-name"]}</li>
            <li>First Apperance: ${heroOneInforSh.biography["first-appearance"]}</li>
            <li>Publisher: ${heroOneInforSh.biography.publisher}</li>
            <li>Character Description: ${heroOneInfoCv.results[0].deck}</li>
        </ul>
    </div>
    <div id="js-characterInfo"></div>   
        `)
    })

}

function defaultResults (comicVineOne, comicVineTwo, superHeroOne, superHeroTwo) {
    $('.versusScreen').html(`
    <div class ="versusContainer">
    <div class="inner left">
        <h3 class="supName supNameOne">${superHeroOne.name}</h3>
        <img src ="${superHeroOne.image.url}" class="charImg">
    </div>
    <div class="inner right">
        <h3 class="supName supNameTwo">${superHeroTwo.name}</h3>
        <img src ="${superHeroTwo.image.url}" class="charImg">
    </div>
</div>
    <h3 class="supName supNameVs">${superHeroOne.name} Vs. ${superHeroTwo.name}</h3>
    <div class="heroToggle">
        <span class="heroLabel one">${superHeroOne.name}</span><span class="heroLabel two">${superHeroTwo.name}</span>
        <hr>
    </div>
    <div class ="characterInfo">
        <div class="bioInfo">
            <img src="${comicVineOne.results[0].image["medium_url"]}" class="bioImage">
            <ul class ="bioList">
                <li>Real Name: ${superHeroOne.biography["full-name"]}</li>
                <li>First Apperance: ${superHeroOne.biography["first-appearance"]}</li>
                <li>Publisher: ${superHeroOne.biography.publisher}</li>
                <li>Character Description: ${comicVineOne.results[0].deck}</li>
            </ul>
        </div>
        <div id="js-characterInfo"></div>   
    </div>
    `);
    $('main').removeClass("hidden");
    characterOneDisplay(comicVineOne, superHeroOne);
    characterTwoDisplay(comicVineTwo, superHeroTwo);
    console.log(comicVineOne);
    console.log(comicVineTwo);
    console.log(superHeroOne);
    console.log(superHeroTwo);

}


function newBio (shCharOne, shCharTwo) {

    let comicVineOne = fetch(`https://cors-anywhere.herokuapp.com/https://www.comicvine.com/api/search?api_key=${apiKey[0]}&limit=1&format=json&query=${shCharOne.name}+${shCharOne.biography["full-name"]}&resources=character`);
    let comicVineTwo = fetch(`https://cors-anywhere.herokuapp.com/https://www.comicvine.com/api/search?api_key=${apiKey[0]}&limit=1&format=json&query=${shCharTwo.name}+${shCharTwo.biography["full-name"]}&resources=character`);
    
    Promise.all([comicVineOne, comicVineTwo])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalVals => {
      let cvCharOne = finalVals[0];
      let cvCharTwo = finalVals[1];
    defaultResults(cvCharOne, cvCharTwo, shCharOne, shCharTwo);
    powerChart(shCharOne, shCharTwo);
    })
    .catch(err => {
        console.log(`Something went wrong: ${err.message}`);
    });
}


function getBio () {
    let superHeroOne = fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${apiKey[1]}/${characterCode}`);
    let superHeroTwo = fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${apiKey[1]}/${characterCodeTwo}`);
    
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

    characterNameOne = $("#js-characterOne-search").val();
    characterNameTwo = $("#js-characterTwo-search").val();
    characterCode = Object.keys(characterList).find(key => characterList[key] == characterNameOne);
    characterCodeTwo = Object.keys(characterList).find(key => characterList[key] == characterNameTwo);

    getBio();
});
}

function makeCharacterList(characterNames) {
    // iterates through park list array and displays it in the DOM as a search form
    $("#js-character-list").append(characterNames.reduce((acc, m) => `${acc} <option value="${m}">`, ''));
}

function runAtStart () {
    findCharacter();
}
$(runAtStart);
makeCharacterList(characterNames);
