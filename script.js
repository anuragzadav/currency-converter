const baseURL = "https://api.frankfurter.app/latest?base=USD";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let opt of dropdowns) {
    for (let currCodes in countryList) {
        //console.log(currCodes, countryList[currCodes]); // Log currency codes and country codes for debugging
        let newOption = document.createElement("option");
        newOption.innerText = currCodes; // Set the display text to the currency code
        newOption.value = currCodes; // Set the value attribute to the currency code
        if (opt.name === "from" && currCodes === "USD") {
            newOption.selected = "selected";
        } else if (opt.name === "to" && currCodes === "INR") {
            newOption.selected = "selected";
        }
        opt.append(newOption);
    }

    // Add event listener to update flag when a dropdown value changes
    opt.addEventListener("change", (evt) => {
        updateFlag(evt.target); // Update the flag for the selected currency
    });
}

const updateFlag = (element) => {
    let crrncyCode = element.value; // Get the selected currency code
    let cntryCode = countryList[crrncyCode]; // Get the corresponding country code
    let newSrce = `https://flagsapi.com/${cntryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img"); // Find the image element in the same container
    img.src = newSrce; // Update the image source to the new URL
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amntVal = amount.value; // Get the entered amount
    if (amntVal === "" || amntVal < 1) {
        amntVal = 1;
        amount.value = "1";
    }

    const URL = `${baseURL}&symbols=${toCurr.value.toUpperCase()}`; // Construct the API URL with the 'to' currency
    let response = await fetch(URL);
    let data = await response.json();
    rate = data.rates[toCurr.value.toUpperCase()]; // Extract the exchange rate for the selected 'to' currency
    //console.log(rate); // Log the exchange rate for debugging
    let finalAmount = rate * amntVal;
    //console.log(finalAmount); // Log the converted amount for debugging
    msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); // Prevent form submission
    updateExchangeRate();
});

// Trigger the exchange rate update when the page loads
window.addEventListener("load", () => {
    updateExchangeRate();
});
