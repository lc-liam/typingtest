const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', () => {
//get quote
const quoteIndex=Math.floor(Math.random() * quotes.length);
const quote = quotes[quoteIndex];
words = quote.split(' ');
wordIndex=0;

//UI UPdates
const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[wordIndex].className = 'highlight';
  // Clear any prior messages
  messageElement.innerText = '';

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = '';
  // set focus
  typedValueElement.focus();
  // Start the timer
  startTime = new Date().getTime();
})
typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex]; //current word
    //gets current value
    let typedValue = typedValueElement.value;
    if(typedValue === currentWord && wordIndex === words.length-1){
        //end of sentence
        //Displays success
        const elapsedTime = new Date().getTime() - startTime;
        let WPM = (60/(elapsedTime/1000))*(wordIndex+1);
        const message = `CONGRATULATIONS! You finished in ${elapsedTime/1000} seconds with ${WPM} WPM!`;
        messageElement.innerText = message;
    }//.trim removes whitespace

    else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});