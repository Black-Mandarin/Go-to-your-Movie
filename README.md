# Go-to-your-Movie
Movie location Searcher

This site is designed to allow a user to search for movies showing in a given region, such as a city or suburb.
The user enters a location into a text search box, which will return a list of cinemas in the area.  The user selects their preferred cinema from the returned list, and is presented with a list of movies currently playing (complete with thumbnails and a short synopsis).

Previous location searches are stored locally, and presented as a clickable list on the search page.


The site is built using html, CSS (using Semantic) and JavaScript.  Locations are determined using the Google Geocoding API, and movie data is pulled from the MovieGlu API.

The page adapts to different screen sizes by wrapping results containers into a column. 

Further development of the site can include searching by movie through a text box, returning a list of locations and cinemas currently screening the movie.