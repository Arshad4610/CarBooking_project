// Get references to form and modal elements
const bookRideButton = document.getElementById("bookRideButton");
const errorPopup = document.getElementById("error-popup");
const closeErrorButton = document.getElementById("close-error-btn");
const confirmationModal = document.getElementById("confirmation-modal");
const rideForm = document.getElementById("rideForm");
const errorMessage = document.getElementById("error-message");
const checkRidesButton = document.getElementById("checkRidesButton");
const ridesListScreen = document.getElementById("rides-list-screen");
const backToBookingButton = document.getElementById("backToBooking");
const ridesListBody = document.getElementById("rides-list-body");

// Function to show the error popup with a specific message
function showErrorPopup(message) {
  errorMessage.textContent = message; // Set the error message
  errorPopup.style.display = "block"; // Show the error popup
}

// Function to hide the error popup
function hideErrorPopup() {
  errorPopup.style.display = "none"; // Hide the error popup
}

// Add event listener to close the error popup
closeErrorButton.addEventListener("click", hideErrorPopup);

// Add event listener to the "Book Ride" button
bookRideButton.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pickup = document.getElementById("pickup").value.trim();
  const dropoff = document.getElementById("dropoff").value.trim();
  const date = document.getElementById("date").value.trim();
  const time = document.getElementById("time").value.trim();
  const ampm = document.getElementById("am-pm").value.trim();

  // Initialize an empty array to collect missing fields
  const missingFields = [];

  // Check each field and add its label to the array if empty
  if (!name) missingFields.push("Name");
  if (!phone) missingFields.push("Phone Number");
  if (!pickup) missingFields.push("Pickup Location");
  if (!dropoff) missingFields.push("Drop-off Location");
  if (!date) missingFields.push("Date");
  if (!time) missingFields.push("Time");
  if (!ampm) missingFields.push("AM/PM Selection");

  // If there are missing fields, show the error popup with the specific message
  if (missingFields.length > 0) {
    const errorMessageText = `Please fill in the following required fields: ${missingFields.join(", ")}`;
    showErrorPopup(errorMessageText); // Show error popup with the missing fields message
    return; // Stop further execution if there are missing fields
  }

  // Proceed to add the ride details to the confirmation modal
  document.getElementById("confirmation-name").textContent = `Name: ${name}`;
  document.getElementById("confirmation-phone").textContent = `Phone: ${phone}`;
  document.getElementById("confirmation-pickup").textContent = `Pickup: ${pickup}`;
  document.getElementById("confirmation-dropoff").textContent = `Drop-off: ${dropoff}`;
  document.getElementById("confirmation-date").textContent = `Date: ${date}`;
  document.getElementById("confirmation-time").textContent = `Time: ${time} ${ampm}`;

  confirmationModal.style.display = "block"; // Show the confirmation modal

  // Save the ride to local storage
  const ride = {
    name,
    phone,
    pickup,
    dropoff,
    date,
    time: `${time} ${ampm}`,
  };

  // Retrieve existing rides from localStorage
  const rides = JSON.parse(localStorage.getItem("rides")) || [];
  rides.push(ride);
  localStorage.setItem("rides", JSON.stringify(rides)); // Save updated rides to localStorage
});

// Reset the form for a new ride after booking
document.getElementById("newRideButton").addEventListener("click", function () {
  confirmationModal.style.display = "none"; // Close the confirmation modal
  rideForm.reset(); // Reset the form for a new ride
});

// Function to load and display the booked rides
function loadRides() {
  const rides = JSON.parse(localStorage.getItem("rides")) || [];
  ridesListBody.innerHTML = '';

  if (rides.length === 0) {
    const noRidesMessage = document.createElement("tr");
    noRidesMessage.innerHTML = "<td colspan='6'>No booked rides available.</td>";
    ridesListBody.appendChild(noRidesMessage);
  } else {
    rides.forEach(ride => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ride.name}</td>
        <td>${ride.phone}</td>
        <td>${ride.pickup}</td>
        <td>${ride.dropoff}</td>
        <td>${ride.date}</td>
        <td>${ride.time}</td>
      `;
      ridesListBody.appendChild(row);
    });
  }
}

// Event listener to show the booked rides screen
checkRidesButton.addEventListener("click", function () {
  document.getElementById("booking-screen").classList.add("hidden");
  ridesListScreen.classList.remove("hidden");
  loadRides();
});

// Event listener to go back to the booking screen
backToBookingButton.addEventListener("click", function () {
  ridesListScreen.classList.add("hidden");
  document.getElementById("booking-screen").classList.remove("hidden");
});








