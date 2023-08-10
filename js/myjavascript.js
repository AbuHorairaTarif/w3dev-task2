// ================================Suggestions Input ==================================
const input = document.getElementById('location');
const suggestionsContainer = document.getElementById('suggestions');
let locations = []; // This will hold the location data from the JSON file

// Fetch the JSON data and store it in the 'locations' array
fetch('location.json')
  .then(response => response.json())
  .then(data => {
    locations = data;
  })
  .catch(error => console.error('Error reading JSON file:', error));

// Function to filter and display suggestions based on user input
function showSuggestions(inputValue) {
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  suggestionsContainer.innerHTML = '';

  filteredLocations.forEach(location => {
    const suggestion = document.createElement('div');
    suggestion.textContent = location.name;
    suggestion.classList.add('suggestion');
    suggestionsContainer.appendChild(suggestion);
  });
}

input.addEventListener('input', event => {
  const inputValue = event.target.value;
  suggestionsContainer.innerHTML = '';

  if (inputValue.length >= 3) {
    showSuggestions(inputValue);
  }
});

suggestionsContainer.addEventListener('click', event => {
  const selectedLocation = event.target.textContent;
  input.value = selectedLocation;
  suggestionsContainer.innerHTML = '';
});


// ================================== CheckIn and Checkout Button Modification==========================

const inputField = document.getElementById('inputField');
const inputFieldCheckout = document.getElementById('inputFieldCheckout');
const resultDiv = document.getElementById('result');
const resultDivCheckout = document.getElementById('resultCheckout');
let selectedCheckIn = '';
let selectedCheckOut = '';

inputField.addEventListener('focus', () => {
  inputField.type = 'date';
});

inputField.addEventListener('blur', () => {
  selectedCheckIn = inputField.value;
  inputField.type = 'text';
  displayResult();
});

inputFieldCheckout.addEventListener('focus', () => {
  inputFieldCheckout.type = 'date';
});

inputFieldCheckout.addEventListener('blur', () => {
  selectedCheckOut = inputFieldCheckout.value;
  inputFieldCheckout.type = 'text';
  displayResult();
});

function displayResult() {
  resultDiv.textContent = `Check In:\n${selectedCheckIn ? ' ' + selectedCheckIn : ''}\nCheck Out:\n${selectedCheckOut ? ' ' + selectedCheckOut : ''}`;
  
}



// =================Guest Slider Functionality======================

var slider = document.getElementById("guestRange");
var output = document.getElementById("valueGuestRange");
output.innerHTML = slider.value;

var sliderPrice = document.getElementById("priceRange");
var outputPrice = document.getElementById("valuePriceRange");
outputPrice.innerHTML = sliderPrice.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

sliderPrice.oninput = function() {
    outputPrice.innerHTML = this.value;
}

  const guestInput = document.getElementById('guestInput');
  const guestToast = document.getElementById('guestToast');
  const guestRange = document.getElementById('guestRange');
  const valueGuestRange = document.getElementById('valueGuestRange');
  const decrementGuestBtn = document.getElementById('decrementGuest');
  const incrementGuestBtn = document.getElementById('incrementGuest');
  const guestSubmit = document.getElementById('guestSubmit');

  guestInput.addEventListener('click', () => {
    guestToast.style.display = 'block';
  });

  guestRange.addEventListener('input', () => {
    updateGuestValue();
  });

  decrementGuestBtn.addEventListener('click', () => {
    if (guestRange.value > guestRange.min) {
      guestRange.value = parseInt(guestRange.value) - 1;
      updateGuestValue();
    }
  });

  incrementGuestBtn.addEventListener('click', () => {
    if (guestRange.value < guestRange.max) {
      guestRange.value = parseInt(guestRange.value) + 1;
      updateGuestValue();
    }
  });

  guestSubmit.addEventListener('click', () => {
    const selectedGuests = guestRange.value;
    guestInput.value = `${selectedGuests}`;
    guestToast.style.display = 'none';
  });

  function updateGuestValue() {
    valueGuestRange.textContent = guestRange.value;
  }

// ====================================  price Range  =========================================================

const priceInput = document.getElementById('priceInput');
const priceToast = document.getElementById('priceToast');
const priceRange = document.getElementById('priceRange');
const valuePriceRange = document.getElementById('valuePriceRange');
const priceSubmit = document.getElementById('priceSubmit');

let selectedPriceRange = [1, 1000]; // Initialize with default values

priceSubmit.addEventListener('click', () => {
  selectedPriceRange = priceRange.noUiSlider.get(); // Get the selected price range from the noUiSlider
  const minValue = selectedPriceRange[0];
  const maxValue = selectedPriceRange[1];
  priceInput.value = `${minValue} - ${maxValue}`; // Update the price input field
  valuePriceRange.textContent = `${minValue} - ${maxValue}`; // Update the valuePriceRange span
  priceToast.style.display = 'none';
});

// Function to initialize the price range slider
// Function to initialize the price range slider
function initializePriceRangeSlider() {
  noUiSlider.create(priceRange, {
    start: [1, 1000],
    connect: true,
    range: {
      'min': 1,
      'max': 1000
    },
    // Display integer values in the slider handles and tooltips
    format: {
      to: value => Math.round(value), // Convert to integer
      from: value => value
    },
    tooltips: [true, true] // Display tooltips for both handles
  });

  priceRange.noUiSlider.on('update', (values, handle) => {
    valuePriceRange.textContent = `${Math.round(values[0])} - ${Math.round(values[1])}`;
  });
}


priceInput.addEventListener('click', () => {
  priceToast.style.display = 'block';
  priceRange.style.display = 'block'; // Show the price range slider
  initializePriceRangeSlider(); // Initialize the price range slider
  // Show the tooltips
  const tooltips = document.getElementsByClassName('noUi-tooltip');
  for (let i = 0; i < tooltips.length; i++) {
    tooltips[i].style.display = 'block';
  }
});


// Show Result when clicked in Search Button into div
function updateResultDiv() {
  const locationResult = document.getElementById('locationResult');
  const checkInResult = document.getElementById('checkInResult');
  const checkOutResult = document.getElementById('checkOutResult');
  const guestNumberResult = document.getElementById('guestNumberResult');
  const priceRangeResult = document.getElementById('priceRangeResult');

  locationResult.textContent = `Location: ${input.value}`;
  checkInResult.textContent = `Check-In: ${selectedCheckIn}`;
  checkOutResult.textContent = `Check-Out: ${selectedCheckOut}`;
  guestNumberResult.textContent = `Guests: ${guestRange.value}`;
  priceRangeResult.textContent = `Price Range: ${priceInput.value}`;
}


// Get the "Search" button element
const searchButton = document.getElementById('search');

// Add event listener to the "Search" button
searchButton.addEventListener('click', () => {
  updateResultDiv();
  searchHotels();
});



// Add event listeners to the elements that affect search criteria
input.addEventListener('input', () => {
  // ... (your existing input event listener code) ...
  updateSearchCriteria();
});

inputField.addEventListener('blur', () => {
  // ... (your existing blur event listener code) ...
  updateSearchCriteria();
});

inputFieldCheckout.addEventListener('blur', () => {
  // ... (your existing blur event listener code) ...
  updateSearchCriteria();
});



// ================================     Map Initialization Using Leaflet    =====================================================================


document.addEventListener('DOMContentLoaded', function () {
  
  const mapButton = document.getElementById('mapButton');
  const mapContainer = document.getElementById('map');
  const formContainer = document.getElementById('formContainer'); // Adjust the selector based on your HTML structure
  const resultTextContainer = document.getElementById('resultTextContainer'); // Adjust the selector based on your HTML structure

  let isMapVisible = false;
  let hotels = [];

  mapButton.addEventListener('click', () => {
    if (!isMapVisible) {
      mapContainer.style.display = 'block';
      document.body.style.overflow = 'hidden';
      mapButton.innerText = 'Hide Map';
      mapButton.style.color = 'white';
      mapButton.style.background = 'black'

      isMapVisible = true;
      initializeMap();

      // Hide the form and result-text containers
      formContainer.style.display = 'none';
      resultTextContainer.style.display = 'none';
    } else {
      mapContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
      mapButton.innerText = 'Show Map';
      isMapVisible = false;

      // Show the form and result-text containers
      formContainer.style.display = 'block';
      resultTextContainer.style.display = 'block';
    }
  });

  
  async function initializeMap() {
    const response = await fetch('hotelPrice.json');
    hotels = await response.json();
    const locationResponse = await fetch('location.json');
    const locations = await locationResponse.json();
  
    const map = L.map('map').setView([40, -100], 4);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    locations.forEach(location => {
      const nearestHotel = findNearestHotel(location.latitude, location.longitude);
      if (nearestHotel && isPriceInRange(nearestHotel.price)) {
        const marker = L.marker([location.latitude, location.longitude]).addTo(map);
        marker.bindPopup(`<b>${nearestHotel.name}</b><br>Price: $${nearestHotel.price}`).openPopup();
      }
    });
  }
  
  function isPriceInRange(price) {
    return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
  }

  function findNearestHotel(latitude, longitude) {
    let nearestHotel = null;
    let minDistance = Number.MAX_VALUE;

    hotels.forEach(hotel => {
      const distance = calculateDistance(latitude, longitude, hotel.latitude, hotel.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestHotel = hotel;
      }
    });

    return nearestHotel;
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
});


