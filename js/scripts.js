//create movie Theater object, movies object and film showing time object
function MovieTheater() {
  this.films = [];
  this.showings = [];
  this.createFilmSchedule();
}

// Function creates the films and showings for the movie theater (i.e. adds items
// to the 'films' and 'showings' arrays).
MovieTheater.prototype.createFilmSchedule = function() {
  this.films = [
    new Film(1, "Secret Life of Pets", "A pet story", "G", 120, new Date('December 30, 2018 00:00:00'), "img/secretLifeOfPet.jpg"),
    new Film(2, "A Dog's Way Home", "A Story of a dog finding It's way home", "G", 120, new Date('January 29, 2019 00:00:00'), "img/dog.jpg"),
    new Film(3, "Wonder Woman", "A Super hero movie", "PG-13", 150, new Date('December 30, 2018 00:00:00'), "img/wonderWoman.jpg"),
    new Film(4, "Green Book", "A story of an African-American panist embark on a concert tour in the Deep South", "PG-13", 150, new Date('January 29, 2019 00:00:00'), "img/greenBook.jpg"),
    new Film(5, "Red Sparrow", "An assasin story", "R", 150, new Date('December 30, 2018 00:00:00'), "img/redSparrow.jpg"),
    new Film(6, "Vice", "A politician story", "R", 150, new Date('January 29, 2019 00:00:00'), "img/vice.jpg"),
  ];

  this.showings = [
    //Secret Life of Pets Showings
    new Showing(1, this.films[0], new Date('January 29, 2019 13:00:00'), 1),
    new Showing(2, this.films[0], new Date('January 29, 2019 16:00:00'), 1),
    new Showing(3, this.films[0], new Date('January 29, 2019 19:00:00'), 1),
    //A Dog's Way Home Showings
    new Showing(4, this.films[1], new Date('January 29, 2019 13:00:00'), 2),
    new Showing(5, this.films[1], new Date('January 29, 2019 16:00:00'), 2),
    new Showing(6, this.films[1], new Date('January 29, 2019 19:00:00'), 2),
    //Wonder Woman Showings
    new Showing(7, this.films[2], new Date('January 29, 2019 13:00:00'), 3),
    new Showing(8, this.films[2], new Date('January 29, 2019 16:00:00'), 3),
    new Showing(9, this.films[2], new Date('January 29, 2019 19:00:00'), 3),
    //Green Book showings
    new Showing(10, this.films[3], new Date('January 29, 2019 13:00:00'), 4),
    new Showing(11, this.films[3], new Date('January 29, 2019 16:00:00'), 4),
    new Showing(12, this.films[3], new Date('January 29, 2019 19:00:00'), 4),
    //Red Sparrow showings
    new Showing(13, this.films[4], new Date('January 29, 2019 13:00:00'), 5),
    new Showing(14, this.films[4], new Date('January 29, 2019 16:00:00'), 5),
    new Showing(15, this.films[4], new Date('January 29, 2019 19:00:00'), 5),
    //Vice Showings
    new Showing(16, this.films[5], new Date('January 29, 2019 13:00:00'), 6),
    new Showing(17, this.films[5], new Date('January 29, 2019 16:00:00'), 6),
    new Showing(18, this.films[5], new Date('January 29, 2019 19:00:00'), 6)
  ];
}

// Function returns an array of films that are age-appropriate using the
// film MPAA rating.
MovieTheater.prototype.getFilms = function(age) {
  var appropriateFilm = [];
  var ratings = [];
  if (age >= 17) {
    ratings = ["G", "PG-13", "R"];
  }
  else if (age >=13) {
    ratings = ["G", "PG-13"];
  }
  else {
    ratings = ["G"];
  }

  for (i = 0; i < this.films.length; i++) {
    var film = this.films[i];
    if (ratings.includes(film.mpaaRating)) {
        appropriateFilm.push(film);
    }
  }
    return appropriateFilm;
}

// Function returns all Showing objects for the film provided as a parameter
MovieTheater.prototype.getShowings = function(film) {
  var matchingShowings = [];

  this.showings.forEach(function(showing) {
    if (showing.film.id == film.id) {
      matchingShowings.push(showing);
    }
  });

  return matchingShowings;
}

// Film object represents information/properties of a single film.  A movie theater may
// have multiple films to show per day.
function Film(id, title, description, mpaaRating, runTimeMins, releaseDate, iconPath) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.mpaaRating = mpaaRating;
  this.runTimeMins = runTimeMins;
  this.releaseDate = releaseDate;
  this.iconPath = iconPath;
}

// Showing object represents the information/properties of a single film showing.
// A film showing includes a film, a showtime and a theater number.  A film may
// have multiple showings per day.  A movie theater may have multiple films to
// show per day.
function Showing(id, film, showTime, theaterNumber) {
  this.id = id;
  this.film = film;
  this.showTime = showTime;
  this.theaterNumber = theaterNumber;
  this.ticketPricing = new TicketPricing();
}

// A TicketPricing object represents the different prices for movie tickets based
// upon a person's age.
function TicketPricing() {
  this.seniorPrice = 8.0;
  this.kidPrice = 7.0;
  this.adultPrice = 10.0;
}

TicketPricing.prototype.getPrice = function(showing, age) {
  var price = 0;
  var isMatineeShow = this.isMatineeShow(showing);
  var personTicketPricing = this;

  if (isMatineeShow) {
    personTicketPricing = this.getMatineePricing();
  }

  if (age >= 55) {
    // Senior ticket pricing/discount
    price = personTicketPricing.seniorPrice;
  }
  else if (age >= 17) {
    // Adult ticket pricing
    price = personTicketPricing.adultPrice;
  }
  else {
    // Kid ticket pricing
    price = personTicketPricing.kidPrice;
  }

  return price;
}

// Function returns a TicketPricing object that has prices for movie tickets that
// are showing at matinee times (ex: <= 3:00 PM)
TicketPricing.prototype.getMatineePricing = function() {
  var matineePricing = new TicketPricing();
  matineePricing.seniorPrice = this.seniorPrice - 3;
  matineePricing.kidPrice = this.kidPrice -3;
  matineePricing.adultPrice = this.adultPrice -3;

  return matineePricing;
}

TicketPricing.prototype.isMatineeShow = function(showing) {
  // Matinee showtimes end at 3:00 pm
  var matineeEndingHour = new Date("January 29, 2019 15:00:00").getHours();
  return showing.showTime.getHours() <= matineeEndingHour;
}

// ContentPresentation objects handle ALL presentation logic.  Presentation logic
// is responsible for reading and changing HTML elements on the page.
function ContentPresentation(movieTheater) {
  this.movieTheater = movieTheater;
  this.filmShowingsContainer;
  this.filmShowtimeButtons;
  this.filmDescriptionContainer;
  this.purchaseButtons;
  this.ageSelection;
}

// Function adds 'click' event handlers to the film showtime buttons.  These 'click'
// events cause the full details of a selected movie to be displayed.
ContentPresentation.prototype.addShowtimeEventHandlers = function() {
    this.initializeSelectors();
    var allShowings = this.movieTheater.showings;
    var contentPresentation = this;

    //alert(this.filmShowtimeButtons);
    this.filmShowtimeButtons.click(function(event) {
      var selectedId = $(event.target).attr("id").split("showing:")[1];
      var matchingShowing;

      for (var i = 0; i < allShowings.length; i++) {
        var showing = allShowings[i];
        if (showing.id == selectedId) {
          matchingShowing = showing;
          break;
        }
      }

    contentPresentation.showFilmDescription(matchingShowing);
  });
}

ContentPresentation.prototype.addPurchaseEventHandlers = function(){
  this.initializeSelectors();
  var allShowings = this.movieTheater.showings;
  var contentPresentation = this;

  this.purchaseButtons.click(function(event) {

    var selectedId = $(event.target).attr("id").split("purchase:")[1];
    var matchingShowing;

    for (var i = 0; i < allShowings.length; i++) {
      var showing = allShowings[i];
      if (showing.id == selectedId) {
        matchingShowing = showing;
        break;
      }
    }

    contentPresentation.showFilmTicket(matchingShowing);
  });
}

// Function returns the person's age selected in the drop-down list
// on the webpage.
ContentPresentation.prototype.getMpaaRatingAgeMinimum = function() {
  this.initializeSelectors();

  var age = 17;
  var ticketType = this.ageSelection.children("option:selected"). val();

  if (ticketType == "seniorAge") {
    age = 55;
  }
  else if (ticketType == "kidAge") {
    age = 12;
  }

  return age;
}

// Function initializes/sets the jQuery selectors to important HTML elements
// and containers on the page where HTML content will be added, removed append
// displayed.
ContentPresentation.prototype.initializeSelectors = function() {
  this.filmShowingsContainer = $("#filmShowings");
  this.filmShowtimeButtons = $("#filmShowings button")
  this.filmDescriptionContainer = $("#filmDescription");
  this.purchaseButtons = $(".purchaseButtonContainer button");
  this.ageSelection = $("#ageSelection");
}

// Function displays the list of films on the webpage.
ContentPresentation.prototype.showFilmShowings = function(films) {
  this.initializeSelectors();

  var htmlContent = "";
  var theater = this.movieTheater;

  for (var i = 0; i < films.length; i++) {
    var film = films[i];
    var filmShowings = theater.getShowings(film);
    console.log(filmShowings);

    var buttonHtml = "";
    filmShowings.forEach(function(showing){
      buttonHtml +=
        `<button id='showing:${showing.id}' class='btn btn-success' type='button'>${showing.showTime.toLocaleTimeString()}</button>`
    });

    htmlContent +=
      `<div class='container showing'>
         <div class='col-sm-2'>
           <img class='movieIcon' src='${film.iconPath}' />
         </div>
         <div class='col-sm-10'>
           <div class='movieTitle'>${film.title}</div>
           <div class='movieRating'>${film.mpaaRating},${film.runTimeMins} mins</div>
           <div class='horizontalRule'></div>
           <div>
             ${buttonHtml}
           </div>
         </div>
        </div>`;
    }

  this.filmDescriptionContainer.hide();
  this.filmShowingsContainer.html(htmlContent);
  this.filmShowingsContainer.show();

  this.addShowtimeEventHandlers();
}

// Function displays the film showing detail/description on the webpage.
ContentPresentation.prototype.showFilmDescription = function(showing) {
  this.initializeSelectors();

  var film = showing.film;
  var htmlContent =
    `<div class='container showing'>
       <div class='col-sm-4'>
         <img class='movieIcon2' src='${film.iconPath}' />
       </div>
       <div class='col-sm-8'>
         <div class='movieTitle'>${film.title}</div>
         <div class='movingDescription'>${film.description}</div>
         <div>${showing.showTime.toLocaleTimeString()}</div>
         <div class='movieRating'>${film.mpaaRating},${film.runTimeMins} mins</div>
         <div class='purchaseButtonContainer'>
            <button id='purchase:${showing.id}' class='btn btn-success' type='button'>Purchase</button>
         </div>
       </div>
      </div>`

      this.filmShowingsContainer.hide();
      this.filmDescriptionContainer.html(htmlContent);
      this.filmDescriptionContainer.show();

      this.addPurchaseEventHandlers();
}

// Function displays the film showing detail/description on the webpage.
ContentPresentation.prototype.showFilmTicket = function(showing) {
  this.initializeSelectors();

  var personMinimumAge = this.getMpaaRatingAgeMinimum();
  var ticketPrice = showing.ticketPricing.getPrice(showing, personMinimumAge);

  var film = showing.film;
  var htmlContent =
    `<div class='container showing'>
       <div class='col-sm-4'>
         <img class='movieIcon2' src='${film.iconPath}' />
       </div>
       <div class='col-sm-8'>
         <div class='filmDescriptionLabel'>Ticket Purchase Summary</div>
         <div>Film: ${film.title}</div>
         <div>Showtime: ${showing.showTime.toLocaleTimeString()}</pre></div>
         <div>Theater Number: ${showing.theaterNumber}</div>
         <div>Length(in mins): ${film.runTimeMins} mins</div>
         <div class='horizontalRule'></div>
         <div class='filmDescriptionLabel'>Purchase Total:  $${ticketPrice}</div>
       </div>
      </div>`

      this.filmShowingsContainer.hide();
      this.filmDescriptionContainer.html(htmlContent);
      this.filmDescriptionContainer.show();
}

$(document).ready(function() {
  var movieTheater = new MovieTheater();
  var contentPresentation = new ContentPresentation(movieTheater);

  $("#ageSelection").change(function(event) {
      var age = 17;
      var ticketType = this.value;
      if (ticketType == "kidAge") {
        age = 12;
    }

    var ageAppropriateFilms = movieTheater.getFilms(age);
    contentPresentation.showFilmShowings(ageAppropriateFilms);
  });

});
