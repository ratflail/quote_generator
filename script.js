'use strict';
// Redeploy

// SOLUTION IF WE JUST WANTED TO LOAD FROM A LOCAL FILE
// function newQuote() {
//   // Pick a random number from apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }

// newQuote();

let apiQuotes = [];

// Show New Quote
function newQuote() {
  // Pick a random number from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //console.log(quote);
  document.querySelector('.quote').textContent = quote.text;
  document.getElementById('author').textContent = quote.author;
}

// Get Quotes from API
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  // Try Catch Statement: if we fail at trying to complete a fetch request we can catch an error log and do something with it
  try {
    const response = await fetch(apiUrl); // so this const will not be populated until we have a result from the fetch api
    apiQuotes = await response.json();
    console.log(apiQuotes);
    //newQuote();
  } catch (error) {
    alert(error);
  }
}

document.querySelector('.new-quote').addEventListener('click', newQuote);

// On Load
getQuotes();
