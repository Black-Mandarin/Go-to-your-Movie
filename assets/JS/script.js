var search = document.querySelector("#search")
var inputSearch = document.querySelector("#inputSearch")
var sButton = document.querySelector("#submitButton")

var geo;
//assigning default header
var header=


 {

    "client":"PERS_103",
    "x-api-key":"0hUVmKVwTG63JE1aEUUht6QGZ41W9noO63yBEMIA",
    "authorization":"Basic UEVSU18xMDNfWFg6aENhaUFTY3pUVDd5",
    "territory":"XX",
     "api-version":"v200",
     "geolocation":'-22.0;14.0',
     "device-datetime":moment().format()  


//limited call -75

    //  "client":"PERS_103",
    //  "x-api-key":"Ub09KvJlIF9GWy4qcltVZ4wM7KqV9hul3HFOleim",
    //  "authorization":"Basic UEVSU18xMDM6OEIxVWJudGJsOHhM",
    //  "territory":"AU",
    //   "api-version":"v200",
    //   "geolocation":'-38.09,145.28',
    //   "device-datetime":moment().format()  

 }

 function getGeoLocationByDefault(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
        geo= position.coords
  
        
    });
  } else { 
   alert("Geolocation is not supported by this browser."); 
  }
}

//call method
getGeoLocationByDefault()


function addressToGeoCode(city){
    var url ='https://maps.googleapis.com/maps/api/geocode/json?address='+city+'&key=AIzaSyBi2s5puIfi0U5S0NRdR4NiprHdtQf2JFA'
    fetch(url)
    .then(function (response) {
      if (response.ok) {
       response.json().then( function (data) {
      if (data !=null){
    
      geo= data.results[0].geometry.location
     
    
      
    
          }   
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to google API');
    });
    
    
     
    }

    function getGeo () {
  

        if (geo != null) {
          console.log('i have geo-')
    
          axios.get('https://api-gate2.movieglu.com/cinemasNearby/?n=10', {
            headers: header
          }).then((response)=>{

            response.data.cinemas.map((singledata)=>{

               const{cinema_id,cinema_name,city}=singledata

              
                axios.get('https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id='+cinema_id+'&date=2022-01-12&sort=popularity', {
                    headers: header
                  }).then((response)=>{
                   
                     var data={
                        cinema_name:cinema_name,
                        films:response.data.films

                     }
                     console.log(data)
                   
                  })

            })
              


          
           
          })
          //////////////////////

        } else {
          console.log('i need to wait')
          setTimeout(getGeo, 300); // try again in 300 milliseconds
        }
      }
    
    
      getGeo();

/////////////////////////////////////////////////////////////////////////////////////////////////codeabove mazahim
// About Us

$(document).on('click', '#aboutUs', function (event) {
    event.preventDefault();
    $('#aboutUsContentParent').attr('style', 'display:block');

});

function aboutUsContentCreation() {
    // about US content holder appended just above footer element
    var footer = $('footer')
    var aboutUsContentParent = $('<div>');
    aboutUsContentParent.attr('class', 'ui segment');
    aboutUsContentParent.attr('id', 'aboutUsContentParent');
    aboutUsContentParent.attr('style', 'display:none');

    // aboutUsContent.text("Hello we are here.");

    // Adding Header for About US
    var aboutUsHeader = $('h1');
    aboutUsHeader.attr('class', 'aboutUsContentChild');
    aboutUsHeader.text('Project : Go to your Movie');
    aboutUsContentParent.append(aboutUsHeader);


    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/AlanCherian.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt','Alan Cherian : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Alan Cherian : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/ErinHatherell.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Hatherell : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Erin Hatherell : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/MohammedMazahim.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Mohammed Mazahim : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Mohammed Mazahim : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/SanjeevKumar.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Sanjeev Kumar : Developer');
    aboutUsContentParent.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Sanjeev Kumar : Developer');
    aboutUsContentParent.append(aboutUsGroup);

    // Adding project member in apphabetical order
    var aboutUsWork = $('<h3>');
    aboutUsWork.attr('class', 'aboutUsContentChild');
    aboutUsWork.text('Work');
    aboutUsContentParent.append(aboutUsWork);

    // Adding project project description
    var aboutUsProjectDesc = $('<p>');
    aboutUsProjectDesc.attr('class', 'aboutUsContentChild');
    aboutUsProjectDesc.text('We are group of four developers collaborating on project "Go to your Movies". We intend to make end user life simple by providing a web application which takes minimum input and help him/her go its favourite movie to its nearest choice of theatre.');
    aboutUsContentParent.append(aboutUsProjectDesc);

    // Adding project project appliaction URL and Repository URL 
    var aboutUsProjectRepositoryURL = $('<a>');
    aboutUsProjectRepositoryURL.attr('class', 'aboutUsContentChild');
    aboutUsProjectRepositoryURL.attr('href', 'https://github.com/Black-Mandarin/Go-to-your-Movie');
    aboutUsProjectRepositoryURL.text('Repository URL');
    aboutUsContentParent.append(aboutUsProjectRepositoryURL);

    footer.before(aboutUsContentParent);
};


// Create time scheduler on the fly at when initial page load finished. 
$(document).ready(function (event) {
    aboutUsContentCreation();
});