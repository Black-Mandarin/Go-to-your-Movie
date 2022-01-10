// GO TO THE MOVIES

// Setting variables
// Button variables 
  // var movieBtn = document.querySelector("#movieSearchBtn");
var locationBtn = document.querySelector("#locationSearchBtn");
var aboutUsBtn = document.querySelector("#aboutUsBtn");


// Setting dates
function todaysDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    return [day, month, year].join("/");
    console.log("The current date is " + todaysDate(date));
  };

  
// Addition of event listeners for buttons
  // movieBtn.addEventListener("click",#####);
locationBtn.addEventListener("click",#####);
