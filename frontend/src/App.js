import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import QuizQuestion from './components/QuizQuestion';
import ResultsPage from './components/ResultsPage';
import EmailCapture from './components/EmailCapture';
import StartPage from './components/StartPage';
import VideoBackground from './components/VideoBackground';
import FireflyEffect from './components/FireflyEffect';
import CommissionForm from './components/CommissionForm';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const zodiacImages = zodiacSigns.reduce((acc, sign) => {
  acc[sign] = `${process.env.PUBLIC_URL}/images/zodiacsigns/${sign.toLowerCase()}.png`;
  return acc;
}, {});

console.log('Zodiac Images:', zodiacImages);

const questions = [
  { id: 1, text: "What's your name?", type: "text", maxWords: 5 },
  { id: 2, section: "Joy and Peace", text: "What brings you the most joy and fulfillment in life?", type: "longText", maxWords: 100 },
  { id: 3, section: "Joy and Peace", text: "When do you feel most at peace or in harmony with yourself?", type: "longText", maxWords: 100 },
  { id: 4, section: "Imagination and Perception", text: "Imagine you're in a lucid dream where you can shape reality. What world would you create?", type: "longText", maxWords: 150 },
  { id: 5, section: "Imagination and Perception", text: "What's the first word that comes to mind when you think of 'destiny'?", type: "text", maxWords: 1 },
  { id: 6, section: "Life Patterns and Purpose", text: "What recurring patterns or themes do you notice in your life's journey?", type: "longText", maxWords: 100 },
  { id: 7, section: "Life Patterns and Purpose", text: "What do you believe your life purpose is?", type: "longText", maxWords: 100 },
  { id: 8, section: "Self-Reflection and Future", text: "If you could have a conversation with your future self, what would you most want to know?", type: "longText", maxWords: 100 },
  { id: 9, section: "Self-Reflection and Future", text: "If your life was a book, what would be the title of the current chapter?", type: "text", maxWords: 10 },
  { id: 10, section: "Self-Reflection and Future", text: "What do you like best about yourself?", type: "longText", maxWords: 100 },
  { 
    id: 11, 
    section: "Magical Affinity",
    text: "What's your zodiac sign?", 
    type: "image", 
    options: zodiacSigns.map(sign => ({
      value: sign,
      label: sign
    }))
  },
  { 
    id: 12, 
    section: "Magical Affinity",
    text: "Choose your magical element:", 
    type: "image", 
    options: [
      { value: "Fire", label: "Fire" },
      { value: "Water", label: "Water" },
      { value: "Earth", label: "Earth" },
      { value: "Air", label: "Air" },
      { value: "Spirit", label: "Spirit" }
    ], 
    followUpQuestion: "How does this element manifest in your life?", 
    maxWords: 50 
  },
];

const backgroundImages = [
  '/images/question1-bg.jpg',
  '/images/question2-bg.jpg',
  '/images/question3-bg.jpg',
  '/images/question4-bg.jpg',
  '/images/question5-bg.jpg',
  '/images/question6-bg.jpg',
  '/images/question7-bg.jpg',
  '/images/question8-bg.jpg',
  '/images/question9-bg.jpg',
  '/images/question10-bg.jpg',
  '/images/question11-bg.jpg',
  '/images/question12-bg.jpg',
];

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [magicalProfile, setMagicalProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundProgress, setBackgroundProgress] = useState(0);
  const [country, setCountry] = useState('US');
  const [isConjuring, setIsConjuring] = useState(false);
  const [showCommissionForm, setShowCommissionForm] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    console.log('Initial state:', {
      quizStarted,
      currentQuestion,
      showEmailCapture,
      showResults,
      showCommissionForm
    });
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setBackgroundProgress((currentQuestion + 1) / (questions.length - 1));
    } else {
      setShowEmailCapture(true);
    }
  };

  const handlePrevious = () => {
    if (showEmailCapture) {
      setShowEmailCapture(false);
      setCurrentQuestion(questions.length - 1);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setBackgroundProgress((currentQuestion - 1) / (questions.length - 1));
    }
  };

  const handleEmailCapture = async (email) => {
    console.log('Email captured:', email);
    setAnswers(prev => ({ ...prev, email }));
    setShowEmailCapture(false);
    console.log('Generating reading...');
    handleGenerateReading();
  };

  const handleSkipEmail = () => {
    console.log('Email capture skipped');
    setShowEmailCapture(false);
    console.log('Generating reading...');
    handleGenerateReading();
  };

  const handleGenerateReading = async () => {
    setIsLoading(true);
    setShowResults(true);
    setIsConjuring(true); // Start conjuring effect
    try {
      const quizData = questions.map(question => ({
        id: question.id,
        text: question.text,
        type: question.type,
        answer: answers[question.id],
        purpose: getQuestionPurpose(question.id)
      }));

      const response = await axios.post('http://localhost:3000/api/quiz/submit', { 
        quizData,
        context: "This quiz is designed to uncover the user's spiritual essence and provide personalized insights. The answers should be interpreted in the context of the user's spiritual journey."
      });
      console.log('API response:', response.data);
      setMagicalProfile(response.data);
    } catch (error) {
      console.error('Error generating magical profile:', error);
      setMagicalProfile({ 
        error: 'Failed to generate magical profile. Please try again.',
        details: error.response ? JSON.stringify(error.response.data) : error.message
      });
    } finally {
      setIsLoading(false);
      setIsConjuring(false); // Stop conjuring effect
    }
  };

  const getQuestionPurpose = (questionId) => {
    switch (questionId) {
      case 1:
        return "To personalize the reading with the user's name";
      case 2:
        return "To understand the user's sources of joy and fulfillment";
      case 3:
        return "To identify the user's state of inner peace and harmony";
      case 4:
        return "To explore the user's creative potential and imagination";
      case 5:
        return "To understand the user's perception of destiny";
      case 6:
        return "To identify recurring patterns and themes in the user's life";
      case 7:
        return "To understand the user's sense of purpose and direction";
      case 8:
        return "To gain insight into the user's future aspirations and concerns";
      case 9:
        return "To understand the user's current life chapter and perspective";
      case 10:
        return "To identify the user's positive self-image and self-appreciation";
      case 11:
        return "To incorporate astrological influences into the reading";
      case 12:
        return "To identify the user's primary elemental energy";
      default:
        return "To gather additional insights about the user's spiritual profile";
    }
  };

  // eslint-disable-next-line no-unused-vars
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  console.log('showResults:', showResults);
  console.log('magicalProfile:', magicalProfile);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-start', `rgb(26, ${58 + backgroundProgress * 30}, ${58 + backgroundProgress * 30})`);
    root.style.setProperty('--color-mid', `rgb(42, ${90 + backgroundProgress * 30}, ${90 + backgroundProgress * 30})`);
    root.style.setProperty('--color-end', `rgb(58, ${122 + backgroundProgress * 30}, ${122 + backgroundProgress * 30})`);
  }, [backgroundProgress]);

  useEffect(() => {
    // Fetch user's country and set currency
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setCountry(data.country_code);
      });
  }, []);

  const handleCommissionStart = () => {
    setShowCommissionForm(true);
  };

  const handleCommissionBack = () => {
    setShowCommissionForm(false);
  };

  const handleCommissionSubmit = (formData) => {
    // Here you would typically send the form data to your backend
    console.log('Commission form submitted:', formData);
    // You can add logic here to send the data to your server
    // After successful submission, you might want to show a confirmation message
    setShowCommissionForm(false);
    // You might want to add a new state for showing a confirmation message
    // setShowConfirmation(true);
  };

  return (
    <div className="App">
      <VideoBackground />
      <FireflyEffect isConjuring={isConjuring} />
      {!quizStarted && <StartPage onStartQuiz={handleStartQuiz} />}
      {quizStarted && !showEmailCapture && !showResults && !showCommissionForm && (
        <QuizQuestion
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentAnswer={answers[questions[currentQuestion].id]}
          isLast={currentQuestion === questions.length - 1}
          isFirst={currentQuestion === 0}
          totalQuestions={questions.length}
          backgroundImage={backgroundImages[currentQuestion]}
        />
      )}
      {showEmailCapture && (
        <EmailCapture
          onSubmit={handleEmailCapture}
          onSkip={handleSkipEmail}
          onBack={handlePrevious}
        />
      )}
      {showResults && !showCommissionForm && (
        <ResultsPage 
          profile={magicalProfile} 
          isLoading={isLoading} 
          country={country} 
          onCommissionStart={handleCommissionStart}
        />
      )}
      {showCommissionForm && (
        <CommissionForm
          profile={magicalProfile}
          onBack={handleCommissionBack}
          onSubmit={handleCommissionSubmit}
        />
      )}
    </div>
  );
}

export default App;