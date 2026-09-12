const quotes = [
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },
    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Dream big. Start small. Act now.",
        author: "Robin Sharma"
    },
    {
        text: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },
    {
        text: "Your limitation—it’s only your imagination.",
        author: "Unknown"
    },
    {
        text: "Stay hungry, stay foolish.",
        author: "Steve Jobs"
    }
];

const quoteText = document.getElementById("quoteText");
const authorName = document.getElementById("authorName");
const quoteNumber = document.getElementById("quoteNumber");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const favoriteBtn = document.getElementById("favoriteBtn");
const heartIcon = document.getElementById("heartIcon");
const quoteCard = document.getElementById("quoteCard");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let currentQuoteIndex = -1;
let favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];


// Get a different random quote
function getRandomQuote() {

    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);

    currentQuoteIndex = newIndex;

    displayQuote();
}


// Display quote
function displayQuote() {

    const quote = quotes[currentQuoteIndex];

    quoteCard.classList.remove("quote-enter");

    void quoteCard.offsetWidth;

    quoteCard.classList.add("quote-enter");

    quoteText.textContent = quote.text;
    authorName.textContent = quote.author;

    quoteNumber.textContent =
        String(currentQuoteIndex + 1).padStart(2, "0");

    updateFavoriteButton();
}


// New quote button
newQuoteBtn.addEventListener("click", () => {

    getRandomQuote();

});


// Copy quote
copyBtn.addEventListener("click", async () => {

    const quote = quotes[currentQuoteIndex];

    const textToCopy =
        `"${quote.text}" — ${quote.author}`;

    try {

        await navigator.clipboard.writeText(textToCopy);

        showToast("Quote copied!");

    } catch (error) {

        showToast("Copy failed. Try again.");

    }

});


// Favorite quote
favoriteBtn.addEventListener("click", () => {

    const quote = quotes[currentQuoteIndex];

    const existingIndex = favorites.findIndex(
        item =>
            item.text === quote.text &&
            item.author === quote.author
    );

    if (existingIndex === -1) {

        favorites.push(quote);

        showToast("Added to favorites!");

    } else {

        favorites.splice(existingIndex, 1);

        showToast("Removed from favorites!");

    }

    localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(favorites)
    );

    updateFavoriteButton();

});


// Update favorite button
function updateFavoriteButton() {

    const quote = quotes[currentQuoteIndex];

    const isFavorite = favorites.some(
        item =>
            item.text === quote.text &&
            item.author === quote.author
    );

    if (isFavorite) {

        heartIcon.textContent = "♥️";
        favoriteBtn.innerHTML =
            '<span id="heartIcon">♥️</span> Favorited';

    } else {

        heartIcon.textContent = "♡";
        favoriteBtn.innerHTML =
            '<span id="heartIcon">♡</span> Favorite';

    }
}


// Toast notification
function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


// Spacebar shortcut
document.addEventListener("keydown", (event) => {

    if (
        event.code === "Space" &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
    ) {

        event.preventDefault();

        getRandomQuote();

    }

});


// Start app with random quote
currentQuoteIndex =
    Math.floor(Math.random() * quotes.length);

displayQuote();