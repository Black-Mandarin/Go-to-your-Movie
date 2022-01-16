# Go To Your Movie

Go To Your Movie is a website that gives the user a list of local cinemas (either through geolocation or by location search) and lists the movies currently playing at these cinemas.


## Site requirements
To fulfil the project criteria, the site contains the following:

 - the use of two serverside APIs, namely Google Maps (https://maps.googleapis.com/) and MovieGlu (https://developer.movieglu.com/)
 - the use of a CSS framework other than BootStrap, in this case Semantic UI (https://semantic-ui.com/)
 - local storage of persistent data, with a list of previous location searches listed on the page
 - the page does not use alerts, confirms or prompts
 - The page is interactive, accepting search criteria and returning tailored search results
 

## Site function
Google geolocation can estimate the location of the user, and generate a list of local cinemas.  
Alternatively, the user can enter a location (suburb, town or state), and the pages uses the Google API to determine latitude and longitude, and return a list of ten local cinemas through the MovieGlu API.  Selecting a preferred cinema returns a list of movies currently playing, again through the MovieGlu API.

The page adapts to different screen sizes by wrapping results containers into a column, using doubling and stacking within Semantic grids and containers. 


## Future developments
Further development of the site can include searching by movie through a text box, returning a list of locations and cinemas currently screening the movie.


## Relevant links
Active site -  https://Black-Mandarin.github.io/Go-to-your-Movie/

github repository - https://github.com/Black-Mandarin/Go-to-your-Movie/
