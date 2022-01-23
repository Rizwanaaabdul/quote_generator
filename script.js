const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');

//Global variable
let apiQuotes=[];

//Loading Function
function Loading(){
    loader.hidden= false;
    quoteContainer.hidden= true;
}

// Hide Loading
function complete(){
    loader.hidden= true;
    quoteContainer.hidden= false;
}

//Show new quote
function newQuote(){
    Loading();
    //Returns a random integer from 0 to size of array obj (here in tis api (1643))
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    
    // check if author field is null if yes replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent='UnKnown';
    }else{
        authorText.textContent= quote.author; 
    }
    // Check quote length to determine styling
    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent= quote.text;
    complete();
}

// Get quotes
// fetch request is done once.
async function getQuotes(){
    Loading();
    const apiUrl= 'https://type.fit/api/quotes';
    try{
        const response= await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
    }catch(error){
        //catch error here

    }
}
//Tweet
function tweetQuotes(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuotes);


// on Load
getQuotes();
