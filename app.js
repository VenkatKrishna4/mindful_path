// A global object to store the user's data
let appState = {
    scores: {
        introvert: 0,
        extrovert: 0,
        sensor: 0,
        intuitive: 0,
        feeler: 0,
        thinker: 0,
        judger: 0,
        perceiver: 0,
        openness: 0, // Added for new questions
        closedness: 0 // Added for new questions
    },
    journalEntries: [],
    currentQuestionIndex: 0
};

// DOM Elements
const sections = document.querySelectorAll('.app-section');
const navButtons = document.querySelectorAll('.nav-button');
const ctaButtons = document.querySelectorAll('.cta-button');

const assessmentContainer = document.getElementById('assessment-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

const saveJournalBtn = document.getElementById('save-journal-btn');
const journalTextarea = document.getElementById('journal-text');
const journalList = document.getElementById('journal-list');

const breathingCircle = document.getElementById('breathing-circle');
const breathingPrompt = document.getElementById('breathing-prompt');

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

// --- API Key and URL (Important for Chatbot) ---
// For a hackathon, you can paste your API key here.
// In a real application, this should be handled server-side for security.
const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// --- Navigation Logic ---
function navigateToSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navigateToSection(button.dataset.section);
    });
});

ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        navigateToSection(button.dataset.section);
        if (button.dataset.section === 'assessment-section') {
            renderQuestion();
        }
    });
});

// --- Assessment Logic ---
function renderQuestion() {
    const questionData = assessmentQuestions[appState.currentQuestionIndex];
    if (!questionData) {
        return; // No more questions
    }
    
    assessmentContainer.innerHTML = '';
    
    const questionEl = document.createElement('h3');
    questionEl.textContent = questionData.question;
    assessmentContainer.appendChild(questionEl);
    
    const answersEl = document.createElement('div');
    answersEl.classList.add('answers');
    
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.dataset.type = answer.type;
        button.classList.add('answer-button');
        button.addEventListener('click', handleAnswer);
        answersEl.appendChild(button);
    });
    
    assessmentContainer.appendChild(answersEl);

    // Update button visibility
    prevBtn.style.display = appState.currentQuestionIndex > 0 ? 'inline' : 'none';
    if (appState.currentQuestionIndex === assessmentQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline';
    } else {
        nextBtn.style.display = 'inline';
        submitBtn.style.display = 'none';
    }
}

function handleAnswer(event) {
    const selectedType = event.target.dataset.type;
    appState.scores[selectedType]++;

    // Highlight selected answer
    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

nextBtn.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('.answer-button.selected');
    if (!selectedAnswer) {
        alert('Please select an answer to continue.');
        return;
    }
    appState.currentQuestionIndex++;
    renderQuestion();
});

prevBtn.addEventListener('click', () => {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        renderQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('.answer-button.selected');
    if (!selectedAnswer) {
        alert('Please select an answer to continue.');
        return;
    }
    generateReport();
    navigateToSection('report-section');
});

// --- Report Generation Logic ---
function generateReport() {
    const scores = appState.scores;
    const reportContainer = document.getElementById('report-container');
    reportContainer.innerHTML = ''; // Clear previous report

    const reportContent = document.createElement('div');
    reportContent.classList.add('report-content');

    const personality = {};
    personality.main = scores.introvert > scores.extrovert ? 'introvert' : 'extrovert';
    personality.focus = scores.sensor > scores.intuitive ? 'sensor' : 'intuitive';
    personality.decision = scores.feeler > scores.thinker ? 'feeler' : 'thinker';
    personality.lifestyle = scores.judger > scores.perceiver ? 'judger' : 'perceiver';

    // Add personality summary
    reportContent.innerHTML += `
        <h3>Your Personality Overview</h3>
        <p>Based on your responses, your personality is characterized as an <b>${personality.main}</b>, a <b>${personality.focus}</b>, a <b>${personality.decision}</b>, and a <b>${personality.lifestyle}</b>.</p>
        <p>${reportData.personalityTraits.nurturing.description}</p>
    `;

    // Add detailed trait descriptions
    const traits = [personality.main, personality.focus, personality.decision, personality.lifestyle];
    traits.forEach(trait => {
        reportContent.innerHTML += `
            <div class="report-section">
                <h3>${trait.charAt(0).toUpperCase() + trait.slice(1)} - The Key Characteristics</h3>
                <p>${reportData[trait].keyCharacteristics}</p>
                <h4>In daily life, you probably:</h4>
                <p>${reportData[trait].dailyLife}</p>
                <h4>As a learner, you probably:</h4>
                <p>${reportData[trait].asALearner}</p>
                <h4>If you are a ${trait}, remember to:</h4>
                <p>${reportData[trait].ifYouAreAn}</p>
            </div>
        `;
    });

    // Add strengths and weaknesses
    reportContent.innerHTML += `
        <div class="report-section">
            <h3>Strengths & Weaknesses</h3>
            <div class="report-columns">
                <div class="column">
                    <h4>Strengths</h4>
                    <ul>
                        ${reportData.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                <div class="column">
                    <h4>Weaknesses</h4>
                    <ul>
                        ${reportData.weaknesses.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Add rules to live by
    reportContent.innerHTML += `
        <div class="report-section">
            <h3>Ten Rules to Live by to Achieve Success</h3>
            <ol>
                ${reportData.rulesToLiveBy.map(rule => `<li>${rule}</li>`).join('')}
            </ol>
        </div>
    `;

    reportContainer.appendChild(reportContent);
}

// --- Journaling Logic ---
function saveJournalEntry() {
    const entryText = journalTextarea.value.trim();
    if (entryText === '') return;

    const timestamp = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    
    appState.journalEntries.push({ text: entryText, date: timestamp });
    localStorage.setItem('journalEntries', JSON.stringify(appState.journalEntries));
    
    renderJournalEntries();
    journalTextarea.value = '';
}

function renderJournalEntries() {
    journalList.innerHTML = '';
    const sortedEntries = appState.journalEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('journal-entry-item');
        entryDiv.innerHTML = `
            <p class="journal-date">${entry.date}</p>
            <p>${entry.text}</p>
        `;
        journalList.appendChild(entryDiv);
    });
}

saveJournalBtn.addEventListener('click', saveJournalEntry);

function loadJournalEntries() {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
        appState.journalEntries = JSON.parse(storedEntries);
        renderJournalEntries();
    }
}

// --- Breathing Logic ---
let breathingInterval;
let breathingState = 'inhale';
let cycleCount = 0;
const totalCycles = 4;

breathingCircle.addEventListener('click', startBreathing);

function startBreathing() {
    clearInterval(breathingInterval);
    breathingCircle.classList.remove('inhale', 'exhale');
    breathingPrompt.textContent = 'Inhale deeply...';
    
    setTimeout(() => {
        breathingCircle.classList.add('inhale');
    }, 100);

    breathingInterval = setInterval(() => {
        if (breathingState === 'inhale') {
            breathingState = 'exhale';
            breathingPrompt.textContent = 'Exhale slowly...';
            breathingCircle.classList.remove('inhale');
            breathingCircle.classList.add('exhale');
        } else {
            breathingState = 'inhale';
            breathingPrompt.textContent = 'Inhale deeply...';
            breathingCircle.classList.remove('exhale');
            breathingCircle.classList.add('inhale');
            cycleCount++;
        }
        
        if (cycleCount >= totalCycles) {
            clearInterval(breathingInterval);
            breathingPrompt.textContent = 'Session complete. Feeling calm?';
            breathingCircle.classList.remove('inhale', 'exhale');
            cycleCount = 0;
        }
    }, 4000);
}

// --- Chatbot Logic (Gemini API Integration) ---
async function getGeminiResponse(message) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `You are a compassionate and empathetic mental health support chatbot. Do not give any medical advice or provide diagnoses. Your sole purpose is to listen and provide supportive, generalized responses. User's message: ${message}` }]
                }]
            })
        });

        if (!response.ok) {
            console.error('API call failed:', response.statusText);
            return "I'm sorry, I am currently unable to provide a response. Please try again later or contact a professional.";
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, I am currently unable to provide a response. Please try again later or contact a professional.";
    }
}

async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // Add user message to chatbox
    const userMessageEl = document.createElement('div');
    userMessageEl.classList.add('chat-message', 'user-message');
    userMessageEl.innerHTML = `<p>${userMessage}</p>`;
    chatBox.appendChild(userMessageEl);

    chatInput.value = '';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('chat-message', 'bot-message', 'typing-indicator');
    typingIndicator.innerHTML = '<p>...</p>';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    const botResponseText = await getGeminiResponse(userMessage);

    chatBox.removeChild(typingIndicator);
    const botMessageEl = document.createElement('div');
    botMessageEl.classList.add('chat-message', 'bot-message');
    botMessageEl.innerHTML = `<p>${botResponseText}</p>`;
    chatBox.appendChild(botMessageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadJournalEntries();
});