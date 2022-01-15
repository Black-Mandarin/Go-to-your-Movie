var search = document.querySelector("#search")
var inputSearch = document.querySelector("#inputSearch")
var sButton = document.querySelector("#submitButton")

var main = document.querySelector("#main")
var loader = document.querySelector("#loader")
var ol_listItem = document.querySelector("#olList")
var modal = document.getElementById('myModal');

var video = document.getElementById("myVideo"); 
var parentvideo = document.getElementById("parentvideo"); 

var listOfCinemasNearMe;
var listOfRunningFilmsInCinema = [];

main.style.display="none"
var geo;
var GeoStatus = false;

var recentLists=[];
//assigning default header
var cloneHeaders;
var header =


{

    "client": "PERS_103",
    "x-api-key": "0hUVmKVwTG63JE1aEUUht6QGZ41W9noO63yBEMIA",
    "authorization": "Basic UEVSU18xMDNfWFg6aENhaUFTY3pUVDd5",
    "territory": "XX",
    "api-version": "v200",
    "geolocation": '',
    "device-datetime": moment().format()


    //limited call -75

    //  "client":"MONA_6",
    //  "x-api-key":"jCQ5tHVY0y7uW79EmhGDR9ZkBycNTLUeaEbKqCSf",
    //  "authorization":"Basic TU9OQV82OkczWlJLVllNcGFjRA==",
    //  "territory":"AU",
    //   "api-version":"v200",
    //   "geolocation":'',
    //   "device-datetime":moment().format()  

}

function getGeoLocationByDefault() {


    navigator.geolocation.watchPosition(function(position) {


            geo = position.coords
            GeoStatus = true

      },
      function(error) {
        if (error.code == error.PERMISSION_DENIED)
        alertify.warning('Please allow GeoLOcation inorder to get best user experience')

        addressToGeoCode('Melbourne VIC, Australia')

        if (GeoStatus) {
            console.log('i have geo-')
    
        } else {
            console.log('i need to wait')
            setTimeout(getGeo, 300); // try again in 300 milliseconds
        }
   
      });



}

//call method
getGeoLocationByDefault()




var retrievedData = localStorage.getItem("movie-data");
if(retrievedData!=null){
    var myData = JSON.parse(retrievedData);
    myData.forEach((data)=>{
        recentLists.push(data)
    })
    
}

function create_recentLists(myArray){
    $('#olList').empty();
    var index=0
    myArray.forEach((list)=>{
        
      
const li= document.createElement('li')
li.setAttribute('style','color:black')
ol_listItem.appendChild(li)
li.textContent=list

       li.addEventListener('click',(event)=>{
        GeoStatus=false

          console.log(list)
          addressToGeoCode(list)


          if (GeoStatus) {
            console.log('i have geo-')
    
        } else {
            console.log('i need to wait')
            setTimeout(getGeo, 300); // try again in 300 milliseconds
        }
      
       })  
           
     
     
    })
    
}

create_recentLists(recentLists)

function addressToGeoCode(city) {
    console.log('test')
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyBi2s5puIfi0U5S0NRdR4NiprHdtQf2JFA'
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data != null) {

                        mygeo = data.results[0].geometry.location

                        geo = { ...geo }
                        geo.latitude = mygeo.lat
                        geo.longitude = mygeo.lng
                        GeoStatus = true


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

function getGeo() {


    if (GeoStatus) {
        console.log('i have geo-')
       


        cloneHeaders = { ...header };
        //for real api
       //  cloneHeaders.geolocation=geo.latitude.toFixed(2).toString()+';'+geo.longitude.toFixed(2).toString()

        //for sandbox api
       cloneHeaders.geolocation = '-22.0;14.0'

        axios?.get('https://api-gate2.movieglu.com/cinemasNearby/?n=10', {
            headers: cloneHeaders
        }).then((response) => {
            listOfCinemasNearMe = response.data.cinemas;
            listOfRunningFilmsInCinema.length = 0;

            response.data.cinemas.map((singledata) => {

                const { cinema_id, cinema_name, city } = singledata

                axios.get('https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=' + cinema_id + '&date=' + moment().format("YYYY-MM-DD") + '&sort=popularity', {
                    headers: cloneHeaders
                }).then((response) => {

              
         

                    var data = {
                        cinema_name: cinema_name,
                        films: response.data.films

                    }
                    listOfRunningFilmsInCinema.push(data);

                    // console.log(data);
                })

            })
            // console.log(listOfCinemasNearMe, listOfRunningFilmsInCinema);
            displayListOfCinemasNearMe();
            loader.style.display="none"
            main.style.display="block"
            alertify.success('Connected to Saver');

        })
        //////////////////////

    } else {
      





        setTimeout(getGeo, 300); // try again in 300 milliseconds
    }
}


getGeo();

// display list of cinemas with short address 
function displayListOfCinemasNearMe() {

    $('#listOfCinemas').empty();
    listOfCinemasNearMe.forEach(function (element) {
        var listItem = $('<li>');
        listItem.attr('class', 'eachCinemas');
        listItem.attr('id', element.cinema_id);
        listItem.attr('name', element.cinema_name);
        listItem.attr('style', 'color:black');
        listItem.text(element.cinema_name + ' : ' + element.address);
        $('#listOfCinemas').append(listItem);
    });

}

$(document).on('click', '.eachCinemas', function (event) {
    event.preventDefault();
    displaylistOfFilmsRunningNow(event.target.getAttribute('name'));
});

// display list of running films as per selected cinemas 

function displaylistOfFilmsRunningNow(cinemaName) {
    
    $('#listOfFilms').empty();
    listOfRunningFilmsInCinema.forEach(function (element) {
        if (element.cinema_name === cinemaName) {
            element.films.forEach(function (film) {
                console.log(film);
                var card = $('<div>');
                card.attr('class', 'card');
                card.attr('style', 'width:215px');
                card.attr('id', film.film_id);
                var image = $('<div>');
                image.attr('class', 'image');
                var imageTag = $('<img>');
                imageTag.attr('src', film.images?.poster["1"]?.medium?.film_image);
                image.append(imageTag);
                card.append(image);

                var content = $('<div>');
                content.attr('class', 'content');
                var filmName = $('<div>');
                filmName.attr('class', 'center aligned header');
                filmName.text(film.film_name);
                content.append(filmName);
                var filmDesc = $('<div>');
                filmDesc.attr('class', 'description');
                filmDesc.text(film.film_name);
                content.append(filmDesc);
                card.append(content);

                var extra_content = $('<div>');
                extra_content.attr('class', 'extra content');
                var filmReleaseYear = $('<span>');
                filmReleaseYear.attr('class', 'right floated');
                filmReleaseYear.text('Release Year 2022');
                extra_content.append(filmReleaseYear);
                card.append(extra_content);
                $('#listOfFilms').append(card);

$('#'+film.film_id).on('click',()=>{

    //i am trying to remove video and load new
    video.pause();
    video.removeChild(video.childNodes[0]);    
  

   axios.get('https://api-gate2.movieglu.com/filmDetails/?film_id='+film.film_id, {
    headers: cloneHeaders
}).then((response) => {
const {synopsis_long,show_dates,cast,directors,producers,writers}=response.data

 
var source = document.createElement('source');

source.setAttribute('src', response?.data?.trailers?.high[0]?.film_trailer);
source.setAttribute('type', 'video/mp4');
video.appendChild(source);

$('#movieName').text(film.film_name)
$('#descriptionMovie').text(synopsis_long)
$("#myModal").modal('show');


show_dates.map((element)=>{


var item=$('<div>')
item.attr('class', 'item')
$('#horizontalList').append(item)

var content=$('<div>')
content.attr('class', 'content')
item.append(content)
content.text(element.date)

})


cast.map((cast)=>{

var item1=$('<div>')
item1.attr('class','item')
$('#cast').append(item1)

var content1=$('<div>')
content1.attr('class', 'content')
item1.append(content1)

var header1=$('<div>')
header1.attr('class', 'header')
content1.append(header1)
header1.text(cast.cast_name)
})

directors.map((director)=>{
    var item2=$('<div>')
    item2.attr('class','item')
    $('#dir').append(item2)
    
    var content2=$('<div>')
    content2.attr('class', 'content')
    item2.append(content2)
    
    var header2=$('<div>')
    header2.attr('class', 'header')
    content2.append(header2)
    header2.text(director.director_name)
})

producers.map((producer)=>{
    var item3=$('<div>')
    item3.attr('class','item')
    $('#pro').append(item3)
    
    var content3=$('<div>')
    content3.attr('class', 'content')
    item3.append(content3)
    
    var header3=$('<div>')
    header3.attr('class', 'header')
    content3.append(header3)
    header3.text(producer.producer_name)
})

})





   

})

            });
        }
    });

}



sButton.addEventListener('click', (event) => {
    event.preventDefault();
    if(inputSearch.value!="")
    {

        GeoStatus = false
        //get value from searchbox eg:-Cranbourne
    
    
        const city = inputSearch.value
        addressToGeoCode(city)
    
        recentLists.push(city)
    
    
        let uniquerecentList = recentLists.filter((c, index) => {
            return recentLists.indexOf(c) === index;
        });
    
    
        create_recentLists(recentLists)
    
        localStorage.setItem("movie-data", JSON.stringify(uniquerecentList));
        inputSearch.value=''
    
        if (GeoStatus) {
            console.log('i have geo-')
    
        } else {
            console.log('i need to wait')
            setTimeout(getGeo, 300); // try again in 300 milliseconds
        }
    }
    else{
        alertify.message("Please enter a city...")
    }

})



autocomplete_city = new google.maps.places.Autocomplete(
    (document.getElementById('inputSearch')), {
      types: ['(cities)'],
      componentRestrictions: {country: 'AU'}
    });


    function pauseVideo(){
        console.log('end')
        video.pause();
    }   

/////////////////////////////////////////////////////////////////////////////////////////////////codeabove mazahim
// About Us

// about us display container

$(document).on('click', '#aboutUs', function (event) {
    event.preventDefault();
    $('#aboutUsContentParent').attr('style', 'display:block');
    $('#searchContainer').attr('style', 'display:none');
    $('#resultsContainer').attr('style', 'display:none');

});

// about us display container hiding and main container on display

$(document).on('click', '#searchByLocationLink', function (event) {
    event.preventDefault();
    $('#aboutUsContentParent').attr('style', 'display:none');
    $('#searchContainer').attr('style', 'display:block');
    $('#resultsContainer').attr('style', 'display:block');

});

// about us content creator

function aboutUsContentCreation() {
    var mainContainer = $('#mainContainer');
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
    aboutUsContentParentUIGridColumnsFirst.attr('class', 'sixteen wide column teal');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsFirst);


    // second column and further subdivision
    var aboutUsContentParentUIGridColumnsSecond = $('<div>');
    aboutUsContentParentUIGridColumnsSecond.attr('class', 'sixteen wide column');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsSecond);

    var aboutUsContentParentSecondColUISegment = $('<div>');
    aboutUsContentParentSecondColUISegment.attr('class', 'ui segment');
    aboutUsContentParentUIGridColumnsSecond.append(aboutUsContentParentSecondColUISegment);

    var aboutUsContentParentSecondColUIGrid = $('<div>');
    aboutUsContentParentSecondColUIGrid.attr('class', 'ui grid doubling stackable container');
    aboutUsContentParentSecondColUISegment.append(aboutUsContentParentSecondColUIGrid);

    var aboutUsContentParentSecondColSubCol1 = $('<div>');
    aboutUsContentParentSecondColSubCol1.attr('class', 'four wide column olive');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol1);

    var aboutUsContentParentSecondColSubCol2 = $('<div>');
    aboutUsContentParentSecondColSubCol2.attr('class', 'four wide column green');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol2);

    var aboutUsContentParentSecondColSubCol3 = $('<div>');
    aboutUsContentParentSecondColSubCol3.attr('class', 'four wide column teal');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol3);

    var aboutUsContentParentSecondColSubCol4 = $('<div>');
    aboutUsContentParentSecondColSubCol4.attr('class', 'four wide column blue');
    aboutUsContentParentSecondColUIGrid.append(aboutUsContentParentSecondColSubCol4);


    // third column

    var aboutUsContentParentUIGridColumnsThird = $('<div>');
    aboutUsContentParentUIGridColumnsThird.attr('class', 'sixteen wide column orange');
    aboutUsContentParentUIGrid.append(aboutUsContentParentUIGridColumnsThird);

    // fourth column

    var aboutUsContentParentUIGridColumnsFourth = $('<div>');
    aboutUsContentParentUIGridColumnsFourth.attr('class', 'sixteen wide column teal');
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
    aboutUsGroupImage.attr('alt', 'Alan Cherian : Developer');
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

    // header.after(aboutUsContentParent);
    mainContainer.prepend(aboutUsContentParent);
    // footer.before(aboutUsContentParent);
};


// Create about us content on fly
$(document).ready(function (event) {
    aboutUsContentCreation();
});