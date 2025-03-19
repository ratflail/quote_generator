'use strict';

// SOLUTION IF WE JUST WANTED TO LOAD FROM A LOCAL FILE
// function newQuote() {
//   // Pick a random number from apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }

// newQuote();

// BEGINNING OF ACTUAL SCRIPT

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// SHOW LOADING

function loading() {
  loader.hidden = false; // the hidden attribute is available in any html element
  quoteContainer.hidden = true;
}

// HIDE LOADING

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading(); // here again because when we press the btn we are bypassing the getquotes() from reloading the page
  // Pick a random number from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // authorText.textContent = quote.author; This was the original code but we need to account for the possibility that the object property of author gives us Null instead of the name of an author. So:
  // CHECK IF AUHTOR FIELD IS BLANK AND REPLACE IT WITH 'UNKNOWN'

  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // CHECK CODE LENGTH TO DETERMINE STYLE

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // SET THE QUOTE AND HIDE LOADER

  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  // Try Catch Statement: if we fail at trying to complete a fetch request we can catch an error log and do something with it
  try {
    const response = await fetch(apiUrl); // so this const will not be populated until we have a result from the fetch api
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    alert(error);
  }
}

// TWEET A QUOTE
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  // Opens up a window in a new tab
  window.open(twitterUrl, '_blank');
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
