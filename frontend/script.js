// Function to load PDF document in embed view
function loadPDF(pdfUrl) {
    const embedContainer = document.getElementById('pdfViewer');
    embedContainer.innerHTML = `<embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%">`;
}

// Function to navigate to a specific page in the PDF document
function goToPage(pageNumber) {
    // Implement page navigation logic here
}

// Event listener for clicking on a PDF document link
document.querySelectorAll('.pdf-button').forEach(button => {
    button.addEventListener('click', function(event) {
        const pdfUrl = this.parentElement.getAttribute('data-url');
        loadPDF(pdfUrl);
        
        // Collapse the sidebar when a document is selected
        const pdfList = document.getElementById('pdfList');
        pdfList.classList.remove('expanded');
        
        // Change the arrow back to right arrow
        const menuIcon = document.getElementById('menuIcon');
        menuIcon.innerHTML = '&#8694;';
    });
});

// Toggle sidebar on hamburger menu click
document.getElementById('hamburgerMenu').addEventListener('click', function(event) {
    const pdfList = document.getElementById('pdfList');
    pdfList.classList.toggle('expanded');
    
    // Change the arrow icon based on the sidebar state
    const menuIcon = document.getElementById('menuIcon');
    if (pdfList.classList.contains('expanded')) {
        menuIcon.innerHTML = '&#11057;'; // Left arrow
    } else {
        menuIcon.innerHTML = '&#8694;'; // Right arrow
    }
    
    // Prevent click event from bubbling up to the document
    event.stopPropagation();
});

// Close sidebar when clicking outside of the menu area
document.addEventListener('click', function(event) {
    const pdfList = document.getElementById('pdfList');
    if (!pdfList.classList.contains('expanded')) return;
    
    if (!pdfList.contains(event.target) && event.target.id !== 'hamburgerMenu') {
        pdfList.classList.remove('expanded');
        const menuIcon = document.getElementById('menuIcon');
        menuIcon.innerHTML = '&#8694;'; // Change the arrow back to right arrow
    }
});


// Call the API to interact with the chat interface
function callChatAPI() {
    // Implement API call to interact with the chat interface
}

// Initial setup
callChatAPI();

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

sendMessageBtn.addEventListener('click', () => {
    const userMessage = userInput.value;
    displayMessage(userMessage, 'user');
    sendMessageToBackend(userMessage);
    userInput.value = '';
});

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
}

function sendMessageToBackend(message) {
    fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.bot_response, 'bot');
    })
    .catch(error => console.error('Error:', error));
}

// Initial message from the bot
displayMessage('Hello! How can I assist you today?', 'bot');
