
// manipulating our UI using the DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// show loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function hideLoading(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show new quote
function newQuote() {
  showLoading();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//Check if author field is blank
if(!quote.quoteAuthor) {
  authorText.textContent = 'unknown';
}else {
  authorText.textContent = quote.quoteAuthor;

}

// check quote length to determine styling

// if(quote.text.length > 120){
//   quoteText.classList.add('long-quote');
// }else {
//   quoteText.classList.remove('long-quote');
// }
  
quoteText.textContent = quote.quoteText;
 hideLoading(); 
}

// get quotes from api
let apiQuotes = [];
async function getQuotes() {
  showLoading(); 
  const apiUrl = 'https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here
  }
}


// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank'); 
}

// event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);



// on load
getQuotes();
