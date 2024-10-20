import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import QuizQuestion from './components/QuizQuestion';
import ResultsPage from './components/ResultsPage';
import EmailCapture from './components/EmailCapture';
import StartPage from './components/StartPage';
import VideoBackground from './components/VideoBackground';
import FireflyEffect from './components/FireflyEffect';
import CommissionForm from './components/CommissionForm';
import Modal from './components/Modal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import DebugPanel from './components/DebugPanel';
import ThankYouConfirmation from './components/ThankYouConfirmation';
import { mockMagicalProfile } from './mockProfileData';

const questions = [
  { id: 1, text: "What's your name?", type: "text", maxWords: 5, purpose: "To personalize the reading" },
  { id: 2, text: "What's your age?", type: "number", min: 1, max: 120, purpose: "To tailor the reading to the user's life stage" },
  { 
    id: 3, 
    text: "What's your zodiac sign?", 
    type: "combinedChoice", 
    options: [
      { value: "Aries", label: "Aries" },
      { value: "Taurus", label: "Taurus" },
      { value: "Gemini", label: "Gemini" },
      { value: "Cancer", label: "Cancer" },
      { value: "Leo", label: "Leo" },
      { value: "Virgo", label: "Virgo" },
      { value: "Libra", label: "Libra" },
      { value: "Scorpio", label: "Scorpio" },
      { value: "Sagittarius", label: "Sagittarius" },
      { value: "Capricorn", label: "Capricorn" },
      { value: "Aquarius", label: "Aquarius" },
      { value: "Pisces", label: "Pisces" },
      { value: "Other", label: "Other" }
    ],
    followUpQuestion: "Please specify your zodiac sign:",
    purpose: "To incorporate astrological influences"
  },
  {
    id: 4,
    text: "What colour palette do you feel represents your inner magical self?",
    type: "combinedChoice",
    options: [
      { value: "Earthy tones", label: "Earthy tones" },
      { value: "Celestial blues and purples", label: "Celestial blues and purples" },
      { value: "Fiery reds and oranges", label: "Fiery reds and oranges" },
      { value: "Mystical greens", label: "Mystical greens" },
      { value: "Ethereal pastels", label: "Ethereal pastels" },
      { value: "Dark and mysterious", label: "Dark and mysterious" },
      { value: "Other", label: "Other" }
    ],
    followUpQuestion: "Please describe your colour palette:",
    purpose: "To understand colour associations and personality"
  },
  { 
    id: 5, 
    text: "If you could have any magical power, what would it be?", 
    type: "text", 
    maxWords: 50, 
    purpose: "To identify desired abilities and personal aspirations"
  },
  { 
    id: 6, 
    text: "If you could have a magical familiar (animal companion), what would it be and why?", 
    type: "combinedChoice", 
    options: [
      { value: "Cat", label: "Cat" },
      { value: "Owl", label: "Owl" },
      { value: "Fox", label: "Fox" },
      { value: "Wolf", label: "Wolf" },
      { value: "Dragon", label: "Dragon" },
      { value: "Phoenix", label: "Phoenix" },
      { value: "Other", label: "Other" }
    ],
    followUpQuestion: "Why did you choose this familiar, and what magical qualities does it possess?",
    maxWords: 50,
    purpose: "To understand the user's connection to animal spirits and desired magical qualities"
  },
  { 
    id: 7, 
    text: "If you could carry one small magical object with you always, what would it be?", 
    type: "text", 
    maxWords: 50, 
    purpose: "To identify personal talismans and their significance"
  },
  {
    id: 8,
    text: "What symbol do you feel represents your inner power or essence?",
    type: "combinedChoice",
    options: [
      { value: "Tree", label: "Tree" },
      { value: "Star", label: "Star" },
      { value: "Moon", label: "Moon" },
      { value: "Sun", label: "Sun" },
      { value: "Crystal", label: "Crystal" },
      { value: "Flame", label: "Flame" },
      { value: "Water droplet", label: "Water droplet" },
      { value: "Mountain", label: "Mountain" },
      { value: "Other", label: "Other" }
    ],
    followUpQuestion: "Please describe the symbol that represents your inner power:",
    purpose: "To understand personal symbolism and self-perception"
  },
  { 
    id: 9, 
    text: "Describe an outfit or attire that makes you feel most magical and empowered.", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To explore self-expression and personal style"
  },
  { 
    id: 10, 
    text: "Describe your ideal magical realm or sanctuary.", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To understand the user's ideal environment and values"
  },
  { 
    id: 11, 
    text: "If you could embody any powerful character from fantasy or mythology, who would it be and why?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To identify role models and desired qualities"
  },
  { 
    id: 12, 
    text: "What is your greatest strength that you bring to the world?", 
    type: "text", 
    maxWords: 50, 
    purpose: "To identify positive self-image and unique contributions"
  },
  { 
    id: 13, 
    text: "What's a side of yourself that you don't often show, but wish you could express more?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To explore hidden aspects of personality and potential inner conflicts"
  },
  { 
    id: 14, 
    text: "What personal quest or challenge are you currently facing?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To identify current life challenges and goals"
  },
  { 
    id: 15, 
    text: "If your life was a book, what would be the title of the current chapter?", 
    type: "text", 
    maxWords: 10, 
    purpose: "To understand the user's current life phase"
  }
];

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [profile, setProfile] = useLocalStorage('profile', null);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundProgress, setBackgroundProgress] = useState(0);
  const [country, setCountry] = useState('US');
  const [isConjuring, setIsConjuring] = useState(false);
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [showThankYouConfirmation, setShowThankYouConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(
    process.env.REACT_APP_DEV_MODE === 'true'
  );

  const toggleDevelopmentMode = () => {
    setIsDevelopmentMode(prevMode => !prevMode);
  };

  useEffect(() => {
    console.log('App component mounted');
    console.log('Initial state:', {
      quizStarted,
      currentQuestion,
      showEmailCapture,
      showResults,
      showCommissionForm
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleEmailCapture = async (data) => {
    console.log('Email captured:', data);
    setShowEmailCapture(false);
    setIsConjuring(true);
    try {
      await handleGenerateReading();
    } catch (error) {
      console.error('Error generating reading:', error);
      setError('An error occurred while generating your reading. Please try again.');
    } finally {
      setIsConjuring(false);
      setShowResults(true);
    }
  };

  const handleSkipEmail = async () => {
    console.log('Email capture skipped');
    setIsLoading(true);
    try {
      console.log('Generating reading...');
      await handleGenerateReading();
      setShowEmailCapture(false);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating reading:', error);
      setError('An error occurred while generating your reading. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReading = async () => {
    setError(null);
    setIsLoading(true);
    setShowResults(true);
    setIsConjuring(true);
    let fullResponse = ''; // Define fullResponse here

    if (isDevelopmentMode) {
      // Use mock data in development mode
      setProfile(mockMagicalProfile);
      setIsLoading(false);
      setIsConjuring(false);
      setShowResults(true); // Move this line here
    } else {
      try {
        const quizData = questions.map(question => ({
          id: question.id,
          text: question.text,
          type: question.type,
          answer: answers[question.id]?.value || answers[question.id],
          explanation: answers[question.id]?.explanation,
          purpose: getQuestionPurpose(question.id)
        }));

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizData,
            zodiacSign: answers[3], // Question 3 is for zodiac sign
            elementalAffinity: answers[21], // Question 21 is for elemental affinity
            context: "This quiz is designed to uncover the user's spiritual essence and provide personalized insights."
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          fullResponse += chunk;
        }

        console.log('Received full response:', fullResponse);

        try {
          const parsedResponse = JSON.parse(fullResponse);
          setProfile(parsedResponse);
          localStorage.setItem('profile', JSON.stringify(parsedResponse));
        } catch (parseError) {
          console.error('Error parsing full response:', parseError);
          setError('Failed to generate your magical profile. Please try again.');
        }

      } catch (error) {
        console.error('Error submitting quiz:', error);
        setProfile(null);
        setError('An error occurred while generating your profile. Please try again.');
      } finally {
        setIsLoading(false);
        setIsConjuring(false);
      }
    }
  };

  const getQuestionPurpose = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    return question ? question.purpose : "To gather additional insights about the user's spiritual profile";
  };

  // eslint-disable-next-line no-unused-vars
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  console.log('showResults:', showResults);
  console.log('profile:', profile);

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
    console.log('profile in localStorage:', localStorage.getItem('profile'));
    console.log('quizAnswers in localStorage:', localStorage.getItem('quizAnswers'));
    setShowCommissionForm(true);
  };

  const handleCommissionBack = () => {
    setShowCommissionForm(false);
    setShowResults(true);
  };

  const handleCommissionSubmit = async (formData) => {
    console.log('Received formData:', formData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/commission/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Commission submission response:', response.data);
      
      setShowThankYouConfirmation(true);
      setShowCommissionForm(false);
    } catch (error) {
      console.error('Error submitting commission:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };


  const handleShowPrivacyPolicy = () => {
    // Logic to show privacy policy modal
    setShowPrivacyPolicy(true);
  };

  const handleShowTermsAndConditions = () => {
    // Logic to show terms and conditions modal
    setShowTermsAndConditions(true);
  };

  const handleCloseModal = () => {
    setShowPrivacyPolicy(false);
    setShowTermsAndConditions(false);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!showCommissionForm) {
        localStorage.removeItem('profile');
        localStorage.removeItem('quizAnswers');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showCommissionForm]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        setDebugMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    console.log('Stored profile in localStorage:', storedProfile);
  }, []);

  return (
    <div className="App">
      <VideoBackground />
      <div className="click-capture-overlay"></div> {/* Add this overlay */}
      <FireflyEffect isConjuring={isConjuring} />
      
      <div className="footer-links">
        <button onClick={handleShowPrivacyPolicy}>Privacy Policy</button>
        <button onClick={handleShowTermsAndConditions}>Terms and Conditions</button>
      </div>

      <div className="main-content">
        {!quizStarted && <StartPage onStartQuiz={handleStartQuiz} />}
        {quizStarted && !showEmailCapture && !showResults && !showCommissionForm && !showThankYouConfirmation && !isConjuring && (
          <QuizQuestion
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentAnswer={answers[questions[currentQuestion].id]}
            isLast={currentQuestion === questions.length - 1}
            isFirst={currentQuestion === 0}
            totalQuestions={questions.length}
          />
        )}
        {showEmailCapture && !isConjuring && (
          <EmailCapture
            onSubmit={handleEmailCapture}
            onSkip={handleSkipEmail}
            onBack={handlePrevious}
          />
        )}
        {isConjuring && (
          <div className="conjuring-message">
            <p>Conjuring your magical profile...</p>
            <div className="loading-animation"></div>
          </div>
        )}
        {showResults && !showCommissionForm && !showThankYouConfirmation && !isConjuring && (
          <ResultsPage
            profile={profile}
            isLoading={isLoading}
            error={error}
            onCommissionStart={handleCommissionStart}
            country={country}
          />
        )}
        {showCommissionForm && !isConjuring && (
          <CommissionForm
            onBack={handleCommissionBack}
            onSubmit={handleCommissionSubmit}
            profile={profile}
            quizAnswers={localStorage.getItem('quizAnswers')}
            onShowPrivacyPolicy={handleShowPrivacyPolicy}
            onShowTermsAndConditions={handleShowTermsAndConditions}
          />
        )}
        {showThankYouConfirmation && !isConjuring && (
          <ThankYouConfirmation
            onReturnToReading={() => {
              setShowThankYouConfirmation(false);
              setShowResults(true);
            }}
          />
        )}
      </div>

      <Modal
        isOpen={showPrivacyPolicy}
        onClose={handleCloseModal}
        title=""
        content={<PrivacyPolicy />}
      />
      <Modal
        isOpen={showTermsAndConditions}
        onClose={handleCloseModal}
        title=""
        content={<TermsAndConditions />}
      />
      {debugMode && (
        <DebugPanel
          setCurrentQuestion={setCurrentQuestion}
          setShowEmailCapture={setShowEmailCapture}
          setShowResults={setShowResults}
          setQuizStarted={setQuizStarted}
          setShowCommissionForm={setShowCommissionForm}
          totalQuestions={questions.length}
          isDevelopmentMode={isDevelopmentMode}
          toggleDevelopmentMode={toggleDevelopmentMode}
        />
      )}
    </div>
  );
}

export default App;
