// Array to store booked rides
let bookedRides = [];

// Add an event listener to the "Book Ride" button
document.getElementById('bookRideButton').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const ampm = document.getElementById('am-pm').value;

  // Check if any required field is empty
  if (!name || !phone || !pickup || !dropoff || !date || !time || !ampm) {
    // Show an alert or custom modal asking the user to fill in all fields
    alert("Please fill in all the required fields.");
    return; // Stop the execution if any field is missing
  }
  
  // Add the new ride to the bookedRides array
  const ride = {
    name: name,
    phone: phone,
    pickup: pickup,
    dropoff: dropoff,
    date: date,
    time: `${time} ${ampm}`
  };
  bookedRides.push(ride);

  // Display the ride details in the confirmation modal
  document.getElementById('confirmation-name').textContent = `Name: ${name}`;
  document.getElementById('confirmation-phone').textContent = `Phone: ${phone}`;
  document.getElementById('confirmation-pickup').textContent = `Pickup: ${pickup}`;
  document.getElementById('confirmation-dropoff').textContent = `Drop-off: ${dropoff}`;
  document.getElementById('confirmation-date').textContent = `Date: ${date}`;
  document.getElementById('confirmation-time').textContent = `Time: ${time} ${ampm}`;

  // Show the confirmation modal
  document.getElementById('confirmation-modal').style.display = 'block';
});

// Close the modal and reset the form
document.getElementById('newRideButton').addEventListener('click', function() {
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('rideForm').reset(); // Reset the form
});

// Show the list of all booked rides
document.getElementById('checkRidesButton').addEventListener('click', function() {
  const ridesListBody = document.getElementById('rides-list-body');
  
  // Clear any existing content
  ridesListBody.innerHTML = '';

  // Populate the rides list with the booked rides from the array
  bookedRides.forEach(ride => {
    const row = document.createElement('tr');
    
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

  // Show the rides list screen and hide the booking screen
  document.getElementById('rides-list-screen').classList.remove('hidden');
  document.getElementById('booking-screen').classList.add('hidden');
});

// Go back to the booking screen
document.getElementById('backToBooking').addEventListener('click', function() {
  document.getElementById('rides-list-screen').classList.add('hidden');
  document.getElementById('booking-screen').classList.remove('hidden');
});
