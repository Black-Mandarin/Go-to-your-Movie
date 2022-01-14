var search = document.querySelector("#search")
var inputSearch = document.querySelector("#inputSearch")
var sButton = document.querySelector("#submitButton")
var myModal = document.querySelector("#myModal")
var listOfCinemasNearMe;
var listOfRunningFilmsInCinema = [];


var geo;
var GeoStatus = false;
//assigning default header
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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            geo = position.coords
            GeoStatus = true


        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//call method
getGeoLocationByDefault()


function addressToGeoCode(city) {
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


        })
        //////////////////////

    } else {
        console.log('i need to wait')
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
                console.log(element.films);
                var card = $('<div>');
                card.attr('class', 'card');

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
            });
        }
    });

}



sButton.addEventListener('click', (event) => {
    event.preventDefault();
    GeoStatus = false
    //get value from searchbox eg:-Cranbourne



    const city = inputSearch.value
    addressToGeoCode(city)
    inputSearch.value=''

    if (GeoStatus) {
        console.log('i have geo-')

    } else {
        console.log('i need to wait')
        setTimeout(getGeo, 300); // try again in 300 milliseconds
    }







})


$(document).on('click','.cards',(event)=>{

    var text = $(event.target).text();
    console.log(text)

myModal.style.display = "block";
 
$('#header').text('Movie Details at Cineama')
$('#imageTag').attr('src','https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80')
$('#movieName').text('Movie Name will be here')
$('#descriptionMovie').text('Moviee Description here')

    
 
})


$(document).on('click','#go',(event)=>{
    myModal.style.display = "none";
})




autocomplete_city = new google.maps.places.Autocomplete(
    (document.getElementById('inputSearch')), {
      types: ['(cities)'],
      componentRestrictions: {country: 'AU'}
    });


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