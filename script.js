// Get DOM elements for booking and confirmation screens
const bookingScreen = document.getElementById("booking-screen");
const confirmationScreen = document.getElementById("confirmation-screen");
const ridesListScreen = document.getElementById("rides-list-screen");

// Form and Button Elements
const rideForm = document.getElementById("rideForm");
const bookRideButton = document.getElementById("bookRideButton");
const newRideButton = document.getElementById("newRideButton");
const checkRidesButton = document.getElementById("checkRidesButton");
const backToBookingButton = document.getElementById("backToBooking");
const clearAllRidesButton = document.getElementById("clearAllRidesButton");

// Output container for confirmation details
const confirmationName = document.getElementById("confirmation-name");
const confirmationPhone = document.getElementById("confirmation-phone");
const confirmationPickup = document.getElementById("confirmation-pickup");
const confirmationDropoff = document.getElementById("confirmation-dropoff");
const confirmationDate = document.getElementById("confirmation-date");
const confirmationTime = document.getElementById("confirmation-time");
const ridesListBody = document.getElementById("rides-list-body");

// Check for existing customer details in localStorage
function loadCustomerDetails() {
  const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
  if (customerDetails) {
    // Auto-fill name and phone number
    document.getElementById("name").value = customerDetails.name;
    document.getElementById("phone").value = customerDetails.phone;

    // Disable input fields for name and phone if customer exists
    document.getElementById("name").disabled = true;
    document.getElementById("phone").disabled = true;
  }
}

// Save customer details to localStorage
function saveCustomerDetails(name, phone) {
  const customerDetails = { name, phone };
  localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
}

// Save ride details to localStorage
function saveRideDetails(details) {
  let rides = JSON.parse(localStorage.getItem("rides")) || [];
  rides.push(details);
  localStorage.setItem("rides", JSON.stringify(rides));
}

// Remove a ride from localStorage
function deleteRide(index) {
  let rides = JSON.parse(localStorage.getItem("rides")) || [];
  rides.splice(index, 1);
  localStorage.setItem("rides", JSON.stringify(rides));
  displayRidesList();  // Re-render the rides list
}

// Clear all rides from localStorage
function clearAllRides() {
  localStorage.removeItem("rides");
  displayRidesList();  // Re-render the rides list
}

// Format time to 12-hour format with AM/PM
function formatTimeTo12Hour(time) {
  let [hours, minutes] = time.split(":");
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // '0' hours should be '12'
  return `${hours}:${minutes} ${ampm}`;
}

// Display confirmation details
function displayConfirmation(details) {
  confirmationName.innerText = `Name: ${details.name}`;
  confirmationPhone.innerText = `Phone: ${details.phone}`;
  confirmationPickup.innerText = `Pickup: ${details.pickup}`;
  confirmationDropoff.innerText = `Drop-off: ${details.dropoff}`;
  confirmationDate.innerText = `Date: ${details.date}`;
  confirmationTime.innerText = `Time: ${formatTimeTo12Hour(details.time)}`;
}

// Handle the booking process when button is clicked
bookRideButton.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pickup = document.getElementById("pickup").value.trim();
  const dropoff = document.getElementById("dropoff").value.trim();
  const date = document.getElementById("date").value.trim();
  const time = document.getElementById("time").value.trim();

  if (name && phone && pickup && dropoff && date && time) {
    // Save customer details only if it's the first booking
    if (!localStorage.getItem("customerDetails")) {
      saveCustomerDetails(name, phone);
    }

    const rideDetails = { name, phone, pickup, dropoff, date, time };

    // Save the ride details
    saveRideDetails(rideDetails);

    // Display confirmation
    displayConfirmation(rideDetails);

    // Hide booking screen and show confirmation screen
    bookingScreen.classList.remove("active");
    confirmationScreen.classList.add("active");
  } else {
    alert("Please fill in all fields before booking.");
  }
});

// Handle "Book New Ride" button click
newRideButton.addEventListener("click", function () {
  // Hide confirmation screen and show booking screen
  confirmationScreen.classList.remove("active");
  bookingScreen.classList.add("active");

  // Reset form fields
  rideForm.reset();

  // Enable name and phone fields if customer is booking again
  document.getElementById("name").disabled = false;
  document.getElementById("phone").disabled = false;
});

// Show all booked rides in a table
checkRidesButton.addEventListener("click", function () {
  displayRidesList();
  // Hide booking screen and show all rides list
  bookingScreen.classList.remove("active");
  ridesListScreen.classList.add("active");
});

// Back to booking screen from the rides list screen
backToBookingButton.addEventListener("click", function () {
  // Hide all rides list and show booking screen
  ridesListScreen.classList.remove("active");
  bookingScreen.classList.add("active");
});

// Delete all rides from the rides list
clearAllRidesButton.addEventListener("click", function () {
  clearAllRides();
});

// Display all booked rides in the table
function displayRidesList() {
  const rides = JSON.parse(localStorage.getItem("rides")) || [];
  ridesListBody.innerHTML = ''; // Clear previous list

  if (rides.length > 0) {
    rides.forEach((ride, index) => {
      const row = document.createElement("tr");

      // Create table cells for each ride and format time
      Object.keys(ride).forEach((key) => {
        const cell = document.createElement("td");

        if (key === 'time') {
          // Convert time to 12-hour format with AM/PM
          cell.textContent = formatTimeTo12Hour(ride[key]);
        } else {
          cell.textContent = ride[key];
        }

        row.appendChild(cell);
      });

      // Add a "Delete" button for each ride
      const deleteButtonCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        deleteRide(index);  // Delete the specific ride
      });
      deleteButtonCell.appendChild(deleteButton);
      row.appendChild(deleteButtonCell);

      // Append row to table
      ridesListBody.appendChild(row);
    });
  } else {
    alert("No rides booked yet.");
  }
}

// Call the loadCustomerDetails function when the page loads
window.onload = loadCustomerDetails;
