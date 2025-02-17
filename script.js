// Note: This is a mock implementation. 
// In a real-world scenario, you would replace this with an actual API call to OpenAI's ChatGPT

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Expanded response database with more context and variety
    const responseDatabase = {
        greetings: [
            'Hello! How can I assist you today?',
            'Hi there! What can I help you with?',
            'Greetings! I\'m ready to help you.',
            'Welcome! Feel free to ask me anything.'
        ],
        help: [
            'I can help you with a variety of tasks. What specific assistance do you need?',
            'I\'m here to provide information and support. What would you like to know?',
            'Ask me about anything - I\'m knowledgeable in many areas.',
            'I\'m an AI assistant designed to help you. How can I be of service?'
        ],
        thanks: [
            'You\'re welcome!',
            'Happy to help!',
            'Glad I could assist you.',
            'It\'s my pleasure to help.'
        ],
        unknown: [
            'I\'m not sure I understand completely. Could you rephrase that?',
            'That\'s an interesting query. Could you provide more context?',
            'I\'m afraid I don\'t have a specific response for that. Can you clarify?',
            'Hmm, I\'m not quite sure how to respond to that.'
        ]
    };

    // Function to add a message to the chat
    function addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Advanced response generation function
    function getAIResponse(userMessage) {
        // Convert to lowercase for easier matching
        const lowerMessage = userMessage.toLowerCase().trim();

        // Check for greetings
        const greetingKeywords = ['hi', 'hello', 'hey', 'greetings', 'howdy'];
        if (greetingKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return getRandomResponse(responseDatabase.greetings);
        }

        // Check for help requests
        const helpKeywords = ['help', 'assist', 'support', 'can you', 'what can you do'];
        if (helpKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return getRandomResponse(responseDatabase.help);
        }

        // Check for thanks
        const thanksKeywords = ['thanks', 'thank you', 'appreciate', 'grateful'];
        if (thanksKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return getRandomResponse(responseDatabase.thanks);
        }

        // Check for specific topics (you can expand this)
        const topicResponses = {
            'weather': 'I can\'t provide real-time weather information, but I can discuss weather-related topics.',
            'time': 'I can discuss time-related concepts, but I don\'t have access to real-time clock information.',
            'joke': 'Why did the AI go to therapy? It had too many unresolved dependencies!',
            'programming': 'I\'m quite knowledgeable about programming. What specific programming topic interests you?'
        };

        // Check for specific topic keywords
        for (let topic in topicResponses) {
            if (lowerMessage.includes(topic)) {
                return topicResponses[topic];
            }
        }

        // If no specific match is found, return a generic response
        return getRandomResponse(responseDatabase.unknown);
    }

    // Utility function to get a random response from an array
    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user-message');

            // Get and add AI response
            const aiResponse = getAIResponse(message);
            setTimeout(() => {
                addMessage(aiResponse, 'ai-message');
            }, 500);

            // Clear input
            userInput.value = '';
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
