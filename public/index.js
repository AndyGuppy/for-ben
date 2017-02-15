
var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
    var jsonString = this.responseText;
    var countries = JSON.parse(jsonString);
    var country = countries[0];
    populateList(countries);
    console.log(country);
}

var populateInfo = function(countries,option){

  var container = document.querySelector('#container');
      container.innerText = "";

      countries.forEach(function(country){
        if (country.name === option){
          console.log(country.name);
          var ul = document.createElement('ul');
          ul.innerText = country.name;

          console.log(country.population);
          var population = document.createElement('li');
          population.innerText = "Population: " + country.population;
          ul.appendChild(population);

          var capital = document.createElement('li');
          capital.innerText = "Capital city: " + country.capital;
          ul.appendChild(capital);

          var borders = document.createElement('ul');
          borders.innerText = "Bordering Countries: ";
          for (border of country.borders) {
            var borderingCountry = document.createElement('li');
            borderingCountry.innerText = border;
            borders.appendChild(borderingCountry);
          }
          ul.appendChild(borders);
          container.appendChild(ul);
          var countrystore = JSON.stringify(country);
          localStorage.setItem('last view',countrystore);
        }
  })
};

var populateList= function(countries){

  var ul = document.getElementById('country-list');
  var select = document.createElement("SELECT");

  countries.forEach( function(country) {
    var option = document.createElement("option");
    option.text = country.name;
    select.add(option);
    ul.appendChild(select);
  })
    var savedcountry = JSON.parse(localStorage.getItem('last view'));
    console.log( "Saved data is pulled back --- "+ savedcountry.name)
    select.value = savedcountry.name;
    populateInfo(countries,savedcountry.name);
    select.onchange = function(){populateInfo(countries,select.value)};
}

var app = function(){

  var url = "https://restcountries.eu/rest/v1";
  makeRequest(url, requestComplete);

 }


window.onload = app;