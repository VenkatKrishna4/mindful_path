const reportData = {
    introvert: {
        keyCharacteristics: "Like to be alone, enjoy one-on-one communication, communicate by writing, reserved and private, enjoy a small circle of friends, and like to focus on one thing at a time.",
        dailyLife: "You probably like to rehearse things before saying them and need privacy and quiet time alone for concentration. You focus your attention inwardly on your ideas and thoughts. People may sometimes see you as shy, and you have a small number of special friends. Interacting too much with others can leave you feeling drained, and you need to recharge by spending time alone.",
        asALearner: "You will talk or write more when you are not forced to share your ideas. You tend to be quiet and less active in the classroom and need to think in relative solitude. You don't like to think 'on your feet' and are more willing to share your ideas when given advance notice.",
        gettingAlongWith: "Give them time to think and respond. Respect their need for privacy and time alone. Try not to bombard them with too many words. Do not pressure them to 'party.' Spend 'quiet' time with them.",
        ifYouAreAn: "Allow yourself time for privacy and solitude. Learn to take the initiative and ask friends to join you in activities. Remember that your opinions and contributions are important. Learn to speak up in groups. At any event with a lot of people, try to have at least one close friend at hand for support."
    },
    sensor: {
        keyCharacteristics: "Focus on what is real and actual, prefer facts and concrete details, pay attention to details, are down-to-earth, and focus on the present & rely on past experience.",
        dailyLife: "You prefer to take in information through your senses to find out what is actually happening. You focus on facts and rely on what can be measured or documented. You like to do things that are practical and can yield tangible results. You trust your past experiences and prefer established ways of doing things.",
        asALearner: "You tend to focus on immediate reality and like real-life examples. You learn best when moving from the concrete to the theoretical in a step-by-step progression. You value knowledge that is practical and want to be precise and accurate in your work. You tend to excel at memorizing facts and feel more comfortable when you know exactly what is expected of you.",
        gettingAlongWith: "When communicating with them, be explicit. Stick to the facts and use concrete examples. Give step-by-step instructions. Remember that Sensors have little need to find underlying meaning about things. Appreciate their realistic and practical perspective.",
        ifYouAreAn: "Learn to play with your imagination. Avoid arguing about specific details with Intuitives. Try not to rule out ideas that do not seem immediately practical. Think about the meanings behind things. Give yourself time to see beyond the obvious. Do things in new and different ways."
    },
    feeler: {
        keyCharacteristics: "Prefer to sympathize with the problem, are subjective, are tender-hearted, value harmony, are compassionate and accepting, and are guided by personal values.",
        dailyLife: "You prefer harmony over clarity and find it difficult to disagree with people. You take criticism very personally and may be accused of being too sensitive. You like to be appreciated and approved of and may try too hard to please others. You are empathic and compassionate and view tact as more important than truthfulness.",
        asALearner: "You perform best in a climate of affirmation and acceptance. You like to feel that the teacher values you as an individual and enjoy the human angle of a subject. You prefer to chat informally before getting down to work and like harmony in the classroom. You draw upon personal experience when engaging with a subject.",
        gettingAlongWith: "Let them know how much you appreciate them. Acknowledge their warmth, understanding, and compassion. When giving feedback, focus on the positive aspects before points of disagreement. Don't use sarcasm. Share your feelings with them.",
        ifYouAreAn: "Learn to say 'No' occasionally. Learn to speak up for yourself if you feel you are being treated unfairly. Practice being objective and don't take criticism so personally."
    },
    judger: {
        keyCharacteristics: "Value structure, tend to work now / play later, like things settled and decided, prefer things to be organized, make lists and use them, value punctuality, and like to complete projects.",
        dailyLife: "You like to have things settled and decided. You find it difficult to concentrate if the environment is disorganized or messy. You like to make 'to do' lists and enjoy checking off completed tasks. You prefer to develop a plan and schedule for tasks. You need to finish your work before you can go and have fun.",
        asALearner: "You complete projects a little ahead of time to avoid last-minute stresses. You like to have defined limits and rules in the classroom. You prefer structured learning environments that establish definite goals. You tend to gauge your learning by the completion of tasks.",
        gettingAlongWith: "Respect their need to know 'the plan.' Try to agree to a time frame or schedule. Be aware of their need for order. Appreciate their ability to be efficient and organized.",
        ifYouAreAn: "Remember that it's OK to change your mind. Develop patience with people who don't have your need for order. Be prepared to review your decisions in light of new information. Occasionally do some things that are unplanned."
    },
    personalityTraits: {
        nurturing: {
            title: "Nurturing Personality Style",
            description: "Generally, you have a large, rich inner store of information which you gather about people. You are highly observant and aware of people's feelings and reactions. You can be depended on to follow things through to completion and will work long and hard to see that jobs get done. You value security, tradition, and peaceful living."
        }
    },
    strengths: [
        "Warm, friendly and affirming by nature",
        "Service-oriented, wanting to please others",
        "Good listeners",
        "Will put forth lots of effort to fulfill their duties and obligations",
        "Excellent organizational capabilities",
        "Good at taking care of practical matters and daily needs",
        "Usually good at handling money",
        "Take their commitments seriously, and seek lifelong relationships"
    ],
    weaknesses: [
        "Don't pay enough attention to their own needs",
        "May have difficulty branching out into new territory",
        "Extreme dislike of conflict and criticism",
        "Unlikely to express their needs, which may cause pent-up frustrations to build inside",
        "Have difficulty leaving a bad relationship",
        "Have difficulty moving on after the end of a relationship"
    ],
    rulesToLiveBy: [
        "Feed Your Strengths! Let your talent for recognizing harmony and balance spill out into the world around you, show your gifts to the world.",
        "Face Your Weaknesses! Realize and accept that some things are never going to be how you would like them to be. Understand that other people's feelings are sometimes more important than whether they are right or wrong.",
        "Discover the World of Others. Don't let yourself fall into the trap of thinking you always know what is right for others.",
        "Don't be too hasty. Try to let things settle before you make a judgment, allowing others to discover the best for themselves.",
        "Look Carefully at the World. Remember, things are not always what they seem on the surface. You might need to look deeper to discover the truth.",
        "Try to Let Others Take Some of the Load. By letting others help, you are not letting things get out of control, but are validating their own need to be a part of your life.",
        "Be Accountable to Others. Remember that they need to understand you and your needs too. Express your feelings and reasons.",
        "Don't Hem Yourself in. Staying in your comfort zone is self-defeating in the end. Try to make every day one where you get out and discover a little something different.",
        "Assume the Best and Seek for it. Don't wait for others to live up to your expectations. Every person has a goldmine of worth in them.",
        "When in Doubt, Ask for Help! Don't let your sense of self sufficiency leave you on the horns of a dilemma. If you are uncertain of something or someone, then get input from others you trust."
    ]
};

// Assessment questions to be used by app.js
const assessmentQuestions = [
    {
        question: "When you are with a group of people, you are more likely to:",
        answers: [
            { text: "Do most of the talking", type: "extrovert" },
            { text: "Listen more than you talk", type: "introvert" }
        ]
    },
    {
        question: "In a conversation, you are more focused on:",
        answers: [
            { text: "The immediate, practical details", type: "sensor" },
            { text: "The bigger picture and future possibilities", type: "intuitive" }
        ]
    },
    {
        question: "When making a decision, you tend to rely more on:",
        answers: [
            { text: "Logical analysis and objective facts", type: "thinker" },
            { text: "Personal values and how it affects others", type: "feeler" }
        ]
    },
    {
        question: "In your daily life, you are more likely to:",
        answers: [
            { text: "Plan things in advance and stick to the schedule", type: "judger" },
            { text: "Be spontaneous and open to change", type: "perceiver" }
        ]
    },
    {
        question: "After a long day of social activity, you feel:",
        answers: [
            { text: "Energized and ready for more", type: "extrovert" },
            { text: "Drained and in need of some alone time", type: "introvert" }
        ]
    },
    {
        question: "Which of the following describes you better?",
        answers: [
            { text: "You enjoy trying new activities and ideas.", type: "openness" },
            { text: "You prefer sticking to familiar routines.", type: "closedness" }
        ]
    },
    {
        question: "How do you prefer to work?",
        answers: [
            { text: "You prefer to plan ahead and make a schedule.", type: "judger" },
            { text: "You prefer to be spontaneous and act on the fly.", type: "perceiver" }
        ]
    },
    {
        question: "When faced with a sudden event, like a phone ringing, you are usually:",
        answers: [
            { text: "The first to react and respond.", type: "extrovert" },
            { text: "More likely to hold back and observe first.", type: "introvert" }
        ]
    },
    {
        question: "You would rather be seen as:",
        answers: [
            { text: "A realistic and practical person.", type: "sensor" },
            { text: "An imaginative and creative person.", type: "intuitive" }
        ]
    },
    {
        question: "When a friend is going through a tough time, you are more likely to:",
        answers: [
            { text: "Offer practical solutions to their problem.", type: "thinker" },
            { text: "Provide emotional support and show empathy.", type: "feeler" }
        ]
    },
    {
        question: "You tend to:",
        answers: [
            { text: "Believe in the saying 'actions speak louder than words'.", type: "sensor" },
            { text: "Enjoy thinking about something almost as much as doing it.", type: "intuitive" }
        ]
    },
    {
        question: "You get more satisfaction from:",
        answers: [
            { text: "Finishing a project and checking it off a list.", type: "judger" },
            { text: "The process of starting a new project or task.", type: "perceiver" }
        ]
    },
    {
        question: "At a party, you are more likely to:",
        answers: [
            { text: "Talk to many different people.", type: "extrovert" },
            { text: "Talk deeply with a few close friends.", type: "introvert" }
        ]
    },
    {
        question: "When it comes to details, you tend to:",
        answers: [
            { text: "Notice and remember every small detail.", type: "sensor" },
            { text: "Focus more on the overall pattern and abstract ideas.", type: "intuitive" }
        ]
    },
    {
        question: "When a friend asks for help, you usually:",
        answers: [
            { text: "Give an honest and objective opinion, even if it's hard to hear.", type: "thinker" },
            { text: "Offer compassionate advice that considers their feelings.", type: "feeler" }
        ]
    },
    {
        question: "How do you view deadlines?",
        answers: [
            { text: "As fixed and important to follow strictly.", type: "judger" },
            { text: "As flexible guidelines that can be adjusted.", type: "perceiver" }
        ]
    },
    // Adding more questions to improve the assessment
    {
        question: "In a conversation, which is more important to you?",
        answers: [
            { text: "Clarity and being right.", type: "thinker" },
            { text: "Harmony and not upsetting anyone.", type: "feeler" }
        ]
    },
    {
        question: "When you are in a new place, you are more likely to:",
        answers: [
            { text: "Pay attention to the specific physical details around you.", type: "sensor" },
            { text: "Imagine the possibilities and potential of the place.", type: "intuitive" }
        ]
    },
    {
        question: "After making a decision, you feel more comfortable when:",
        answers: [
            { text: "The decision is finalized and settled.", type: "judger" },
            { text: "You have the option to change your mind.", type: "perceiver" }
        ]
    },
    {
        question: "Which of these traits do you value more in yourself?",
        answers: [
            { text: "Being logical and consistent.", type: "thinker" },
            { text: "Being compassionate and empathetic.", type: "feeler" }
        ]
    }
];