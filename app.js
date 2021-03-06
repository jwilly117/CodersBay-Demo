// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
// var firebase = require('firebase/app');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCXFsavNw_VLVouWdzOTiu9q3BDPl1MYqc",
    authDomain: "codersbay-test-2be11.firebaseapp.com",
    databaseURL: "https://codersbay-test-2be11.firebaseio.com",
    projectId: "codersbay-test-2be11",
    storageBucket: "codersbay-test-2be11.appspot.com",
    messagingSenderId: "948506290079",
    appId: "1:948506290079:web:3ff2d1c2ea783d7da5ffaa",
    measurementId: "G-2DCZ6HVHTC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  


// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    // highPrice = ...
    highPrice = snapshot.val().highPrice;
    // highBidder = ...
    highBidder = snapshot.val().highBidder;



    // Change the HTML to reflect the stored values
    // id = "highest-bidder"
    // id = "highest-price"
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);


    // Print the data to the console.
    console.log(highPrice);
    console.log(highBidder);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-bidder").text("none");
    $("#highest-price").text("none");

    // Print the data to the console.


  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
    var bidderName = $("#bidder-name").val().trim();
    var bidderPrice = parseInt($("#bidder-price").val().trim());

  // Log the Bidder and Price (Even if not the highest)
    console.log(bidderName);
    console.log(bidderPrice);

  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
        highBidder: bidderName,
        highPrice: bidderPrice
    });

    // Log the new High Price
    console.log("NEW HIGH PRICE: " + bidderPrice);

    // Store the new high price and bidder name as a local variable


    // Change the HTML to reflect the new high price and bidder

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
