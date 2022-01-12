var search = document.querySelector("#search")
var inputSearch = document.querySelector("#inputSearch")
var sButton = document.querySelector("#submitButton")

var geo;
var GeoStatus=false;
//assigning default header
var header=


 {

    "client":"PERS_103",
    "x-api-key":"0hUVmKVwTG63JE1aEUUht6QGZ41W9noO63yBEMIA",
    "authorization":"Basic UEVSU18xMDNfWFg6aENhaUFTY3pUVDd5",
    "territory":"XX",
     "api-version":"v200",
     "geolocation":'',
     "device-datetime":moment().format()  


//limited call -75

    //  "client":"PERS_105",
    //  "x-api-key":"4PF77SR5m599ztIgl662r1dWZ3GCCYMo42JBRmn9",
    //  "authorization":"Basic UEVSU18xMDU6bVBaNWp2RmpMbnJi",
    //  "territory":"AU",
    //   "api-version":"v200",
    //   "geolocation":'',
    //   "device-datetime":moment().format()  

 }

 function getGeoLocationByDefault(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
        geo= position.coords
        GeoStatus=true
  
        
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
    
      mygeo= data.results[0].geometry.location

        geo={...geo}
        geo.latitude=mygeo.lat
        geo.longitude=mygeo.lng
        GeoStatus=true
        
              
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
  

        if (GeoStatus) {
          console.log('i have geo-')
    
            cloneHeaders={...header};
            //for real api
            // cloneHeaders.geolocation=geo.latitude.toFixed(2).toString()+';'+geo.longitude.toFixed(2).toString()
         
            //for sandbox api
                cloneHeaders.geolocation='-22.0;14.0'

          axios.get('https://api-gate2.movieglu.com/cinemasNearby/?n=10', {
            headers: cloneHeaders
          }).then((response)=>{

            response.data.cinemas.map((singledata)=>{

               const{cinema_id,cinema_name,city}=singledata

              
                axios.get('https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id='+cinema_id+'&date='+moment().format("YYYY-MM-DD")+'&sort=popularity', {
                    headers: cloneHeaders
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


      sButton.addEventListener('click',(event)=>{
        event.preventDefault();
        GeoStatus=false
        //get value from searchbox eg:-Cranbourne
        
    

        const city=inputSearch.value
         addressToGeoCode(city)
        
       
         if (GeoStatus) {
          console.log('i have geo-')
    
        } else {
          console.log('i need to wait')
          setTimeout(getGeo, 300); // try again in 300 milliseconds
        }


     



    
      })
/////////////////////////////////////////////////////////////////////////////////////////////////codeabove mazahim
// About Us

$(document).on('click', '#aboutUs', function (event) {
    event.preventDefault();
    $('#aboutUsContentParent').attr('style', 'display:block');

});

function aboutUsContentCreation() {
    // about US content holder appended just above footer element
    var mainContainer = $('#mainContainer')
    var aboutUsContentParent = $('<div>');
    aboutUsContentParent.attr('class', 'sixteen wide column');
    aboutUsContentParent.attr('id', 'aboutUsContentParent');
    aboutUsContentParent.attr('style', 'display:none');

    // ui segment under parent
    
    var aboutUsContentParentUISegment = $('<div>');
    aboutUsContentParentUISegment.attr('class', 'ui segment');
    aboutUsContentParent.append(aboutUsContentParentUISegment);
    
    
    // grid under ui segment

    var aboutUsContentParentUIGrid = $('<div>');
    aboutUsContentParentUIGrid.attr('class', 'ui grid');
    aboutUsContentParentUISegment.append(aboutUsContentParentUIGrid);

    
    // first column
    var aboutUsContentParentUIGridColumnsFirst = $('<div>');
    aboutUsContentParentUIGridColumnsFirst.attr('class', 'sixteen wide column');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsFirst);

    
    // second column and further subdivision
    var aboutUsContentParentUIGridColumnsSecond = $('<div>');
    aboutUsContentParentUIGridColumnsSecond.attr('class', 'sixteen wide column');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsSecond);

    var aboutUsContentParentSecondColUISegment = $('<div>');
    aboutUsContentParentSecondColUISegment.attr('class', 'ui segment');
    aboutUsContentParentUIGridColumnsSecond.append(aboutUsContentParentSecondColUISegment);

    var aboutUsContentParentSecondColUIGrid = $('<div>');
    aboutUsContentParentSecondColUIGrid.attr('class', 'ui grid');
    aboutUsContentParentSecondColUISegment.append(aboutUsContentParentSecondColUIGrid);

    var aboutUsContentParentSecondColSubCol1 = $('<div>');
    aboutUsContentParentSecondColSubCol1.attr('class', 'four wide column');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol1);

    var aboutUsContentParentSecondColSubCol2 = $('<div>');
    aboutUsContentParentSecondColSubCol2.attr('class', 'four wide column');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol2);

    var aboutUsContentParentSecondColSubCol3 = $('<div>');
    aboutUsContentParentSecondColSubCol3.attr('class', 'four wide column');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol3);

    var aboutUsContentParentSecondColSubCol4 = $('<div>');
    aboutUsContentParentSecondColSubCol4.attr('class', 'four wide column');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol4);


    // third column
    
    var aboutUsContentParentUIGridColumnsThird = $('<div>');
    aboutUsContentParentUIGridColumnsThird.attr('class', 'sixteen wide column');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsThird);

    // fourth column
    
    var aboutUsContentParentUIGridColumnsFourth = $('<div>');
    aboutUsContentParentUIGridColumnsFourth.attr('class', 'sixteen wide column');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsFourth);

    

    // Adding Header for About US
    var aboutUsHeader = $('h1');
    aboutUsHeader.attr('class', 'aboutUsContentChild');
    aboutUsHeader.text('Project : Go to your Movie');
    aboutUsContentParentUIGridColumnsFirst.append(aboutUsHeader);


    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/AlanCherian.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt','Alan Cherian : Developer');
    aboutUsContentParentSecondColSubCol1.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Alan Cherian : Developer');
    aboutUsContentParentSecondColSubCol1.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/ErinHatherell.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Hatherell : Developer');
    aboutUsContentParentSecondColSubCol2.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Erin Hatherell : Developer');
    aboutUsContentParentSecondColSubCol2.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/MohammedMazahim.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Mohammed Mazahim : Developer');
    aboutUsContentParentSecondColSubCol3.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Mohammed Mazahim : Developer');
    aboutUsContentParentSecondColSubCol3.append(aboutUsGroup);

    // Adding project member profile image
    var aboutUsGroupImage = $('<img>');
    aboutUsGroupImage.attr('class', 'aboutUsContentChild');
    aboutUsGroupImage.attr('src', './assets/Images/SanjeevKumar.png');
    aboutUsGroupImage.attr('style', 'width:30px; height:30px; border-radius: 50%;');
    aboutUsGroupImage.attr('alt', 'Sanjeev Kumar : Developer');
    aboutUsContentParentSecondColSubCol4.append(aboutUsGroupImage);

    // Adding project member in apphabetical order
    var aboutUsGroup = $('<h4>');
    aboutUsGroup.attr('class', 'aboutUsContentChild');
    aboutUsGroup.text('Sanjeev Kumar : Developer');
    aboutUsContentParentSecondColSubCol4.append(aboutUsGroup);

    // Adding project member in apphabetical order
    var aboutUsWork = $('<h3>');
    aboutUsWork.attr('class', 'aboutUsContentChild');
    aboutUsWork.text('Work');
    aboutUsContentParentUIGridColumnsThird.append(aboutUsWork);

    // Adding project project description
    var aboutUsProjectDesc = $('<p>');
    aboutUsProjectDesc.attr('class', 'aboutUsContentChild');
    aboutUsProjectDesc.text('We are group of four developers collaborating on project "Go to your Movies". We intend to make end user life simple by providing a web application which takes minimum input and help him/her go its favourite movie to its nearest choice of theatre.');
    aboutUsContentParentUIGridColumnsThird.append(aboutUsProjectDesc);

    // Adding project project appliaction URL and Repository URL 
    var aboutUsProjectRepositoryURL = $('<a>');
    aboutUsProjectRepositoryURL.attr('class', 'aboutUsContentChild');
    aboutUsProjectRepositoryURL.attr('href', 'https://github.com/Black-Mandarin/Go-to-your-Movie');
    aboutUsProjectRepositoryURL.text('Repository URL');
    aboutUsContentParentUIGridColumnsFourth.append(aboutUsProjectRepositoryURL);

    mainContainer.append(aboutUsContentParent);
};


// Create about us content on fly
$(document).ready(function (event) {
    aboutUsContentCreation();
});