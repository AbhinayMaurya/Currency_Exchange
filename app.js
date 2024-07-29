const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";


const dropdown = document.querySelectorAll(".select select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#fromCurr");
const toCurr = document.querySelector("#toCurr");
const msg = document.querySelector("#msg");


for (let select of dropdown) {
  
  for (currCode in countryList) {
    
    const newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    
    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}


const updateFlag = (element) => {
  
  const currCode = element.value;
  const countryCode = countryList[currCode];
  
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  
  const img = element.parentElement.querySelector("img");
  
  img.src = newSrc;
};


const updateExchangeRate = async () => {
  
  let amount = document.querySelector(".amount #input");
  
  let amountValue = amount.value;
  
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amountValue * rate;

  msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


window.addEventListener("load", () => {
  updateExchangeRate();
});


btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});