const baseURL = "https://api.frankfurter.app/latest";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// Populate dropdowns
for (let opt of dropdowns) {
    for (let currCodes in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCodes;
        newOption.value = currCodes;

        if (opt.name === "from" && currCodes === "USD") {
            newOption.selected = "selected";
        } 
        else if (opt.name === "to" && currCodes === "INR") {
            newOption.selected = "selected";
        }

        opt.append(newOption);
    }

    // Only update flag on change (NOT exchange rate)
    opt.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag
const updateFlag = (element) => {
    let crrncyCode = element.value;
    let cntryCode = countryList[crrncyCode];
    let newSrce = `https://flagsapi.com/${cntryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrce;
};

// Update exchange rate (ONLY when button is clicked)
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amntVal = amount.value;

    if (amntVal === "" || amntVal < 1) {
        amntVal = 1;
        amount.value = "1";
    }

    const URL = `${baseURL}?base=${fromCurr.value}&symbols=${toCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.rates[toCurr.value];
    let finalAmount = rate * amntVal;

    msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

// Button click event
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Initial conversion on page load (optional, you can remove this if you want)
window.addEventListener("load", () => {
    updateExchangeRate();
});
