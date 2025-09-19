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
    moodHistory: [],
    currentQuestionIndex: 0,
    selectedMood: null,
    selectedTags: [],
    breathingSessions: 0,
    currentBreathingExercise: '4-7-8',
    breathingTimer: 0,
    breathingInterval: null
};

// DOM Elements
const sections = document.querySelectorAll('.app-section');
const navButtons = document.querySelectorAll('.nav-button');
const ctaButtons = document.querySelectorAll('.cta-button');
const actionButtons = document.querySelectorAll('.action-btn');

const assessmentContainer = document.getElementById('assessment-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

const saveJournalBtn = document.getElementById('save-journal-btn');
const journalTextarea = document.getElementById('journal-text');
const journalList = document.getElementById('journal-list');

const breathingCircle = document.getElementById('breathing-circle');
const breathingPrompt = document.getElementById('breathing-prompt');
const cycleCountElement = document.getElementById('cycle-count');
const breathingTimerElement = document.getElementById('breathing-timer');

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

// Mood tracking elements
const moodOptions = document.querySelectorAll('.mood-option');
const moodNote = document.getElementById('mood-note');
const moodChart = document.getElementById('mood-chart');

// Tag elements
const tagButtons = document.querySelectorAll('.tag-btn');

// Dashboard elements
const assessmentCount = document.getElementById('assessment-count');
const journalCount = document.getElementById('journal-count');
const moodStreak = document.getElementById('mood-streak');
const breathingSessions = document.getElementById('breathing-sessions');
const recentActivityList = document.getElementById('recent-activity-list');

// Breathing exercise elements
const exerciseButtons = document.querySelectorAll('.exercise-btn');

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

actionButtons.forEach(button => {
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

// --- Mood Tracking Logic ---
function selectMood(mood) {
    appState.selectedMood = mood;
    moodOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.mood === mood) {
            option.classList.add('selected');
        }
    });
}

function saveMoodEntry() {
    if (!appState.selectedMood) return;

    const moodEntry = {
        mood: appState.selectedMood,
        note: moodNote.value.trim(),
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    };

    // Check if mood already exists for today
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = appState.moodHistory.findIndex(entry => entry.date === today);
    
    if (existingIndex !== -1) {
        appState.moodHistory[existingIndex] = moodEntry;
    } else {
        appState.moodHistory.push(moodEntry);
    }

    localStorage.setItem('moodHistory', JSON.stringify(appState.moodHistory));
    renderMoodChart();
    updateDashboard();
}

// --- Enhanced Journaling Logic ---
function saveJournalEntry() {
    const entryText = journalTextarea.value.trim();
    if (entryText === '') return;

    const timestamp = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
    
    const journalEntry = {
        text: entryText,
        date: timestamp,
        mood: appState.selectedMood,
        moodNote: moodNote.value.trim(),
        tags: [...appState.selectedTags],
        timestamp: new Date().toISOString()
    };

    appState.journalEntries.push(journalEntry);
    localStorage.setItem('journalEntries', JSON.stringify(appState.journalEntries));
    
    // Save mood if selected
    if (appState.selectedMood) {
        saveMoodEntry();
    }
    
    renderJournalEntries();
    journalTextarea.value = '';
    moodNote.value = '';
    appState.selectedMood = null;
    appState.selectedTags = [];
    
    // Clear selections
    moodOptions.forEach(option => option.classList.remove('selected'));
    tagButtons.forEach(btn => btn.classList.remove('selected'));
    
    updateDashboard();
    addRecentActivity('Journal Entry', 'Added a new journal entry');
}

function renderJournalEntries() {
    journalList.innerHTML = '';
    const sortedEntries = appState.journalEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    sortedEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('journal-entry-item');
        
        let moodDisplay = '';
        if (entry.mood) {
            const moodEmojis = {
                'very-sad': '😢',
                'sad': '😔',
                'neutral': '😐',
                'happy': '😊',
                'very-happy': '😄'
            };
            moodDisplay = `<span class="journal-mood">${moodEmojis[entry.mood]} ${entry.mood.replace('-', ' ')}</span>`;
        }
        
        let tagsDisplay = '';
        if (entry.tags && entry.tags.length > 0) {
            tagsDisplay = '<div class="journal-tags-display">' + 
                entry.tags.map(tag => `<span class="journal-tag">${tag}</span>`).join('') + 
                '</div>';
        }
        
        entryDiv.innerHTML = `
            <p class="journal-date">${entry.date}</p>
            ${moodDisplay}
            <p>${entry.text}</p>
            ${tagsDisplay}
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

// --- Mood Chart Rendering ---
function renderMoodChart() {
    moodChart.innerHTML = '';
    
    // Get last 7 days of mood data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
    }
    
    last7Days.forEach(date => {
        const moodEntry = appState.moodHistory.find(entry => entry.date === date);
        const moodValue = moodEntry ? getMoodValue(moodEntry.mood) : 0;
        
        const bar = document.createElement('div');
        bar.className = 'mood-bar';
        bar.style.height = `${Math.max(20, moodValue * 30)}px`;
        bar.setAttribute('data-date', new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        if (moodEntry) {
            bar.title = `${moodEntry.mood} - ${moodEntry.note || 'No note'}`;
        }
        
        moodChart.appendChild(bar);
    });
}

function getMoodValue(mood) {
    const moodValues = {
        'very-sad': 1,
        'sad': 2,
        'neutral': 3,
        'happy': 4,
        'very-happy': 5
    };
    return moodValues[mood] || 0;
}

// --- Dashboard Functions ---
function updateDashboard() {
    // Update stats
    assessmentCount.textContent = appState.scores.introvert + appState.scores.extrovert > 0 ? '1' : '0';
    journalCount.textContent = appState.journalEntries.length;
    
    // Calculate mood streak
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    for (let i = 0; i < 30; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        const hasMood = appState.moodHistory.some(entry => entry.date === dateStr);
        if (hasMood) {
            streak++;
        } else {
            break;
        }
    }
    moodStreak.textContent = streak;
    breathingSessions.textContent = appState.breathingSessions;
    
    // Update recent activity
    updateRecentActivity();
}

function addRecentActivity(type, description) {
    const activity = {
        type,
        description,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    let activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    activities.unshift(activity);
    activities = activities.slice(0, 5); // Keep only last 5 activities
    localStorage.setItem('recentActivities', JSON.stringify(activities));
    
    updateRecentActivity();
}

function updateRecentActivity() {
    const activities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    
    if (activities.length === 0) {
        recentActivityList.innerHTML = '<p class="no-activity">No recent activity. Start your wellness journey!</p>';
        return;
    }
    
    recentActivityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${getActivityIcon(activity.type)}</div>
            <div class="activity-text">
                <h4>${activity.type}</h4>
                <p>${activity.description} • ${activity.timestamp}</p>
            </div>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    const icons = {
        'Journal Entry': '📝',
        'Mood Entry': '😊',
        'Assessment': '🧠',
        'Breathing Session': '🌬️',
        'Chat': '💬'
    };
    return icons[type] || '📋';
}

// --- Enhanced Breathing Logic ---
let breathingInterval;
let breathingState = 'inhale';
let cycleCount = 0;
let totalCycles = 4;
let breathingStartTime = 0;

const breathingExercises = {
    '4-7-8': { inhale: 4, hold: 7, exhale: 8, cycles: 4 },
    'box': { inhale: 4, hold: 4, exhale: 4, hold2: 4, cycles: 6 },
    'deep': { inhale: 6, hold: 2, exhale: 8, cycles: 5 }
};

breathingCircle.addEventListener('click', startBreathing);

function selectBreathingExercise(exercise) {
    appState.currentBreathingExercise = exercise;
    exerciseButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.exercise === exercise) {
            btn.classList.add('active');
        }
    });
}

function startBreathing() {
    if (breathingInterval) {
        stopBreathing();
        return;
    }
    
    const exercise = breathingExercises[appState.currentBreathingExercise];
    totalCycles = exercise.cycles;
    cycleCount = 0;
    breathingStartTime = Date.now();
    
    clearInterval(breathingInterval);
    breathingCircle.classList.remove('inhale', 'exhale');
    breathingPrompt.textContent = 'Inhale deeply...';
    updateBreathingTimer();
    
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
            cycleCountElement.textContent = cycleCount;
        }
        
        if (cycleCount >= totalCycles) {
            stopBreathing();
        }
    }, getBreathingDuration());
}

function stopBreathing() {
    clearInterval(breathingInterval);
    breathingInterval = null;
    breathingPrompt.textContent = 'Session complete. Feeling calm?';
    breathingCircle.classList.remove('inhale', 'exhale');
    cycleCount = 0;
    cycleCountElement.textContent = '0';
    breathingTimerElement.textContent = '0:00';
    
    // Track breathing session
    appState.breathingSessions++;
    localStorage.setItem('breathingSessions', appState.breathingSessions);
    updateDashboard();
    addRecentActivity('Breathing Session', `Completed ${totalCycles} breathing cycles`);
}

function getBreathingDuration() {
    const exercise = breathingExercises[appState.currentBreathingExercise];
    return (exercise.inhale + (exercise.hold || 0) + exercise.exhale + (exercise.hold2 || 0)) * 1000;
}

function updateBreathingTimer() {
    if (!breathingInterval) return;
    
    const elapsed = Math.floor((Date.now() - breathingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    breathingTimerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    setTimeout(updateBreathingTimer, 1000);
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
    userMessageEl.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <p>${userMessage}</p>
        </div>
    `;
    chatBox.appendChild(userMessageEl);

    chatInput.value = '';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('chat-message', 'bot-message', 'typing-indicator');
    typingIndicator.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p>...</p>
        </div>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    const botResponseText = await getGeminiResponse(userMessage);

    chatBox.removeChild(typingIndicator);
    const botMessageEl = document.createElement('div');
    botMessageEl.classList.add('chat-message', 'bot-message');
    botMessageEl.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <p>${botResponseText}</p>
        </div>
    `;
    chatBox.appendChild(botMessageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    addRecentActivity('Chat', 'Had a conversation with the mental health assistant');
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Chat suggestion buttons
document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.dataset.suggestion;
        sendMessage();
    });
});

// --- Event Listeners ---

// Mood tracking
moodOptions.forEach(option => {
    option.addEventListener('click', () => {
        selectMood(option.dataset.mood);
    });
});

// Tag selection
tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('selected');
        const tag = btn.dataset.tag;
        if (btn.classList.contains('selected')) {
            if (!appState.selectedTags.includes(tag)) {
                appState.selectedTags.push(tag);
            }
        } else {
            appState.selectedTags = appState.selectedTags.filter(t => t !== tag);
        }
    });
});

// Breathing exercise selection
exerciseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        selectBreathingExercise(btn.dataset.exercise);
    });
});

// Navigation with active state
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all nav buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        navigateToSection(button.dataset.section);
    });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadJournalEntries();
    loadMoodHistory();
    loadBreathingSessions();
    renderMoodChart();
    updateDashboard();
    
    // Set initial active nav button
    navButtons.forEach(btn => {
        if (btn.dataset.section === 'dashboard') {
            btn.classList.add('active');
        }
    });
});

function loadMoodHistory() {
    const storedMoods = localStorage.getItem('moodHistory');
    if (storedMoods) {
        appState.moodHistory = JSON.parse(storedMoods);
    }
}

function loadBreathingSessions() {
    const storedSessions = localStorage.getItem('breathingSessions');
    if (storedSessions) {
        appState.breathingSessions = parseInt(storedSessions);
    }
}