$(document).ready(function() {
  // Function to update the date and time
  function updateDateTime() {
    const now = new Date();
    $("#datetime").text(now.toLocaleString()); 
  }

  // Call the updateDateTime function to initially display the current date and time
  updateDateTime();

  // Update the date and time every second
  setInterval(updateDateTime, 1000);

  // Listener for click events on the save button
  $(".saveBtn").on("click", function() {
    // Get the user input from the corresponding textarea
    const userInput = $(this).siblings(".description").val();
    // Get the hour-x id of the time-block containing the button that was clicked
    const timeBlockId = $(this).parent().attr("id");
    // Save the user input in local storage using the id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to apply the past, present, or future class to each time block
  function applyTimeBlockClasses() {
    // Get the current hour in 24-hour time using Day.js
    const currentHour = dayjs().hour();
    // Iterate over each time block
    $(".time-block").each(function() {
      // Get the hour from the time-block id and convert it to a number
      const timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
      // Compare the time block's hour to the current hour and add appropriate classes
      if (timeBlockHour < currentHour) {
        $(this).removeClass("present").addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass("past").addClass("present");
      } else {
        $(this).removeClass("past").addClass("future");
      }
    });
  }

  // Listener for click event on the clear button
  $("#clearBtn").on("click", function() {
    // Clear all user input from textareas and local storage
    $(".description").val("");
    localStorage.clear();
  });

  // Call the applyTimeBlockClasses function to apply classes initially
  applyTimeBlockClasses();

  // Get any user input that was saved in localStorage and set the textarea values
  $(".time-block").each(function() {
    const timeBlockId = $(this).attr("id");
    const savedUserInput = localStorage.getItem(timeBlockId);
    if (savedUserInput) {
      $(this).find(".description").val(savedUserInput);
    }
  });

  // Display the current date in the header of the page
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});

  

