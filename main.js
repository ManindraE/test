// constants
const singleRoomPrice = 25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;
const bedCost = 8000;
const kidMeals = 5000;
const localAdultCharge = 5000;
const localKidCharge = 2000;
const foreignAdultCharge = 10000;
const foreignKidCharge = 5000;
const adultGuideCost = 1000;
const kidsGuideCost = 500;

// variables of the code
let roomCost;
let advCost;
let totalCost;
let guideCost = 0;
let adultcost = 0;
let childrencost = 0;
let duration = 0;
let loyaltyPoints = 0;



// references for room form
const txtFirstName = document.getElementById("firstname");
const txtLastName = document.getElementById("lastname");
const contactInput = document.getElementById('contact');
const emailInput = document.getElementById("email");
const SingleRooms = document.getElementById("single");
const DoubleRooms = document.getElementById("double");
const TripleRooms = document.getElementById("triple");
const checkInDate = document.getElementById("checkin");
const checkOutDate = document.getElementById("checkout");
const numBeds = document.getElementById("beds");
const kidsabovefive = document.getElementById("kids");
const extraRequests = document.getElementsByName("extra");
const txtPromo = document.getElementById("promo");
const txtCurrentRooms = document.getElementById("current-room-booking");
const bookRoomForm = document.getElementById("booking");
const txtOverallRoomBooking=document.getElementById("overallbooking");

// Adding event listeners to input fields and checkboxes in the room booking form
const roomInput = document.querySelectorAll("#booking input");

// References for the adventure form
const Local = document.getElementById("localad");
const LocalKids = document.getElementById("localk");
const Foreign = document.getElementById("foreignad");
const ForeignKids = document.getElementById("foreignk");
const hours = document.getElementById("duration");
const guideReq = document.getElementsByName("guide");
const txtCurrentAdv = document.getElementById("current-adv-booking");
const bookAdveForm = document.getElementById("adventure-form");
const adultGuide = document.getElementById("adultguide");
const kidGuide = document.getElementById("kidguide");

// Adding event listeners to input fields and checkboxes in adventure booking form
const adventureInput = document.querySelectorAll("#adventure-form input");



// Buttons in both forms
const btnBookNow = document.getElementById("bookrooms");
const btnAdventure = document.getElementById("bookadventure");
const btnFavorite = document.getElementById("favourite");
const btnLoyalty = document.getElementById("loyalty");



// Calculating room booking cost
function roomCostCalculation(){
    numofSingleRooms = parseInt(SingleRooms.value);
    numofDoubleRooms = parseInt(DoubleRooms.value);
    numOfTripleRooms = parseInt(TripleRooms.value);
    numofKidsAboveFive = parseInt(kidsabovefive.value);
    extraBeds = parseInt(numBeds.value);
    kidMealCost = numofKidsAboveFive*kidMeals;
    extraBedCost = extraBeds*bedCost;
    days = Math.round(Math.abs((new Date(checkOutDate.value) - new Date(checkInDate.value)) / (24 * 60 * 60 * 1000)));
    totalRoomCost = ((numofSingleRooms * singleRoomPrice) + (numofDoubleRooms * doubleRoomPrice) + (numOfTripleRooms * tripleRoomPrice))*days;
    roomCost = totalRoomCost +(kidMealCost + extraBedCost);
}


//Calculate loyalty points
function calculateLoyalty(){
    const roomTotal = parseInt(SingleRooms.value) + parseInt(DoubleRooms.value) + parseInt(TripleRooms.value);

    if(roomTotal >=3){
        loyaltyPoints += roomTotal * 20;
    }
}


// Function to display loyalty points
btnLoyalty.addEventListener('click', displayLoyalty);

function displayLoyalty() {
    if(loyaltyPoints === 0 || loyaltyPoints === null){
        alert("You do not have Loyalty Points")
    }else{
        alert(`You have ${loyaltyPoints} loyalty points.`);
    }
}

//Event listner for room upgrades
extraRequests.forEach(checkbox => checkbox.addEventListener('change', updateCurrentBooking));
roomInput.forEach(input => input.addEventListener('input', updateCurrentBooking ));


// Function to update the current room booking details
function updateCurrentBooking(){
    roomCostCalculation();

    txtCurrentRooms.innerHTML = `
    <h1> Current Booking </h1>
    <p> First Name  :  ${txtFirstName.value}</p>
    <br>
    <p> Last Name  :  ${txtLastName.value}</p>
    <br>
    <p> Contact  :  ${contactInput.value}</p>
    <br>
    <p> Email  :  ${emailInput.value}</p>
    <br>
    <p> Single Rooms  :  ${SingleRooms.value}</p>
    <br>
    <p> Double Rooms  :  ${DoubleRooms.value}</p>
    <br>
    <p> Triple Rooms  :  ${TripleRooms.value}</p>
    <br>
    <p> Check in date  :  ${checkInDate.value}</p>
    <br>
    <p> Check out Date  :  ${checkOutDate.value}</p>
    <br>
    <p> Extra Beds  :  ${numBeds.value}</p>
    <br>
    <p> Number of Kids  :  ${kidsabovefive.value}</p>
    <br>
    <p> Room upgrades  :  ${getSelectedExtraRequirements()}</p>
    <br>
    <p> Cost  :  ${roomCost}LKR</p>`;
}

//Function to get selected room upgrades
function getSelectedExtraRequirements(){
    const selectedExtras = [];
    extraRequests.forEach(checkbox => {if (checkbox.checked){
        selectedExtras.push(checkbox.id);
    }});
    return selectedExtras.join(' / ');
    
}

//saving to local storage
btnFavorite.addEventListener("click",savingToFav);


function savingToFav(event){
    event.preventDefault();

    localStorage.removeItem("Favourites");

    const Favourites = {
        firstName:txtFirstName.value,
        lastName:txtLastName.value,
        contact:contactInput.value,
        email:emailInput.value,
        singlerooms:SingleRooms.value,
        doublerooms:DoubleRooms.value,
        triplerooms:TripleRooms.value,
        checkindate:checkInDate.value,
        checkoutdate:checkOutDate.value,
        extrabeds:numBeds.value,
        kidsover:kidsabovefive.value,
        roomUpgrades:getSelectedExtraRequirements(),
        total:roomCost,
    };

    const FavouritesJSON = JSON.stringify(Favourites);
    localStorage.setItem("Favourites",FavouritesJSON);

    alert("Added to Favourites");
}












//Adding event listener to book now button
btnBookNow.addEventListener("click", updateOverallbooking);

// Function for overall booking
function updateOverallbooking(event) {
    event.preventDefault();

//Calculation for the promo code
    roomCostCalculation();
    if (txtPromo.value === "promo123") {
        roomCost *= 0.95;
    }
    calculateLoyalty();
    txtOverallRoomBooking.innerHTML = `
        <h1> Overall Booking </h1>
        <p> Number of Single Rooms  :  ${SingleRooms.value}</p>
        <p> Number of Double Rooms  :  ${DoubleRooms.value}</p>
        <p> Number of Triple Rooms  :  ${TripleRooms.value}</p>
        <p> Check-in Date  :  ${checkInDate.value}</p>
        <p> Check-out Date  :  ${checkOutDate.value}</p>
        <p> Total Room Cost  :  ${roomCost} LKR</p>
    `;

    bookRoomForm.reset();
    txtCurrentRooms.innerHTML="<h3>Current Room Booking</h3>";
}

// Calculating Total Adventure Booking Cost
function calculateAdventureCost() {
    numOfLocalAdults = parseInt(Local.value);
    numOfForeignAdults = parseInt(Foreign.value);
    numOfLocalKids = parseInt(LocalKids.value);
    numOfForeignKids = parseInt(ForeignKids.value);

    adultcost = (numOfLocalAdults * localAdultCharge) + (numOfForeignAdults * foreignAdultCharge);

    childrencost = (numOfLocalKids * localKidCharge) + (numOfForeignKids * foreignKidCharge);
    duration = parseInt(hours.value);

    advCost = ((adultcost + childrencost) * duration) + guideCost;
}

guideReq.forEach(item => item.addEventListener("change", guideCheck));

adultGuide.addEventListener('change',guideCheck);
kidGuide.addEventListener('change',guideCheck);


// Adding guide  charges
// Adding guide charges
function guideCheck(event) {
    const checkbox = event.target;

    if (checkbox.id === "adultguide") {
        if (checkbox.checked) {
            guideCost = guideCost + adultGuideCost;
        } else {
            guideCost = guideCost - adultGuideCost;
        }
    } else if (checkbox.id === "kidguide") {
        if (checkbox.checked) {
            guideCost = guideCost + kidsGuideCost;
        } else {
            guideCost = guideCost - kidsGuideCost;
        }
    }

    advCost = ((adultcost + childrencost) * duration) + guideCost;
    updateCurrentAdventureBooking();
}



adventureInput.forEach(input => input.addEventListener('input', updateCurrentAdventureBooking));




// Updating the Current Adventure Booking With User Inputs
function updateCurrentAdventureBooking(){
    calculateAdventureCost();

    txtCurrentAdv.innerHTML= `
    <h1> Current Adventure </h1>
    <br>
    <p>No: of Adults (Local)  :  ${Local.value}</p>
    <br>
    <p>No: of Kids (Local)  :  ${LocalKids.value}</p>
    <br>
    <p>No: of Adults (Foreign)  :  ${Foreign.value}</p>
    <br>
    <p>No: of Kids (Foreign)  :  ${ForeignKids.value}</p>
    <br>
    <p>Duration  :  ${hours.value}</p>
    <br>
    <p>Guide for Adults  :  ${adultguide.checked ? "Yes":"No"}</p>
    <br>
    <p>Guide for Kids  :  ${kidguide.checked ? "Yes":"No"}</p>
    <br>
    <p>Adventure Cost  :  ${advCost}LKR</p>`;
}

//Adding event listeners to book adventure button
btnAdventure.addEventListener("click",bookAdventure);

//Function for adventure button
function bookAdventure(event){
    event.preventDefault();

    const bookAdventure = `
    Details  :
    No: of Adults (Local)  :  ${Local.value}
    No: of Kids (Local)  :  ${LocalKids.value}
    No: of Adults (Foreign)  :  ${Foreign.value}
    No: of Kids (Foreign)  :  ${ForeignKids.value}
    Duration  :  ${hours.value}
    Guide for Adults  :  ${adultguide.checked ? "Yes":"No"}
    Guide for Kids  :  ${kidguide.checked ? "Yes":"No"}
    Adventure Cost  :  ${advCost}LKR`;

    alert(`You Adventure has been booked!\n${bookAdventure}`);

    bookAdveForm.reset();
    txtCurrentAdv.innerHTML="<h3>Current Adventure Booking</h3>";
    txtOverallRoomBooking.innerHTML=" ";
}

















