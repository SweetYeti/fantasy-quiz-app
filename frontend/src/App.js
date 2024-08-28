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
import Modal from './components/Modal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import DebugPanel from './components/DebugPanel';
import ThankYouConfirmation from './components/ThankYouConfirmation';

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
  { id: 1, text: "What's your name?", type: "text", maxWords: 5, purpose: "To personalize the reading" },
  { id: 2, text: "How old are you?", type: "number", min: 1, max: 120, purpose: "To tailor the reading to the user's life stage" },
  { 
    id: 3, 
    text: "What's your zodiac sign?", 
    type: "image", 
    options: zodiacSigns.map(sign => ({ value: sign, label: sign })),
    purpose: "To incorporate astrological influences"
  },
  { 
    id: 4, 
    text: "If you could only wear one color for the rest of your life, which one would it be?", 
    type: "text", 
    maxWords: 1, 
    purpose: "To understand color associations and personality"
  },
  { 
    id: 5, 
    text: "What magical setting are you most drawn to?", 
    type: "combinedChoice", 
    options: [
      { value: "Enchanted Forest", label: "Enchanted Forest" },
      { value: "Crystal Cave", label: "Crystal Cave" },
      { value: "Serene Lake", label: "Serene Lake" },
      { value: "Misty Mountains", label: "Misty Mountains" },
      { value: "Snowy Winter Cottage", label: "Snowy Winter Cottage" }
    ],
    followUpQuestion: "Why does this setting resonate with you?",
    maxWords: 50,
    purpose: "To identify preferred magical environments and their personal significance"
  },
  { 
    id: 6, 
    text: "What's your favorite season?", 
    type: "image", 
    options: [
      { value: "Spring", label: "Spring" },
      { value: "Summer", label: "Summer" },
      { value: "Autumn", label: "Autumn" },
      { value: "Winter", label: "Winter" }
    ],
    purpose: "To understand seasonal influences and personality traits"
  },
  { 
    id: 7, 
    text: "When do you feel most at peace or in harmony with yourself?", 
    type: "longText", 
    maxWords: 50, 
    purpose: "To identify sources of inner peace and harmony"
  },
  { 
    id: 8, 
    text: "What brings you the most joy and fulfillment in life?", 
    type: "longText", 
    maxWords: 50, 
    purpose: "To understand sources of happiness and fulfillment"
  },
  { 
    id: 9, 
    text: "If you could have any magical power, what would it be?", 
    type: "text", 
    maxWords: 10, 
    purpose: "To identify desired abilities and personal aspirations"
  },
  { 
    id: 10, 
    text: "Imagine you're in a lucid dream where you can shape reality. What world would you create?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To explore the user's ideal world and values"
  },
  { 
    id: 11, 
    text: "If you were reincarnated into a wild animal, what would it be and why?", 
    type: "longText", 
    maxWords: 50, 
    purpose: "To understand self-perception and desired traits"
  },
  { 
    id: 12, 
    text: "What animal would you choose as your magical familiar?", 
    type: "combinedChoice", 
    options: [
      { value: "Cat", label: "Cat" },
      { value: "Owl", label: "Owl" },
      { value: "Wolf", label: "Wolf" },
      { value: "Fox", label: "Fox" },
      { value: "Raven", label: "Raven" },
      { value: "Deer", label: "Deer" },
      { value: "Other", label: "Other" }
    ],
    followUpQuestion: "Why did you choose this animal as your familiar?",
    maxWords: 50,
    purpose: "To identify complementary traits and desired support"
  },
  { 
    id: 13, 
    text: "What's your preferred method of divination or spiritual insight?", 
    type: "combinedChoice", 
    options: [
      { value: "Tarot", label: "Tarot" },
      { value: "Astrology", label: "Astrology" },
      { value: "Crystal Ball", label: "Crystal Ball" },
      { value: "Runes", label: "Runes" },
      { value: "Tea Leaves", label: "Tea Leaves" },
      { value: "I don't use divination", label: "I don't use divination" },
      { value: "Other", label: "Other" }
    ],
    followUpQuestion: "Please specify your preferred method:",
    maxWords: 20,
    purpose: "To understand preferred methods of insight and guidance"
  },
  { 
    id: 14, 
    text: "What's the first word that comes to mind when you think of 'destiny'?", 
    type: "text", 
    maxWords: 1, 
    purpose: "To understand the user's perception of fate and free will"
  },
  { 
    id: 15, 
    text: "What recurring patterns or themes do you notice in your life's journey?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To identify life patterns and recurring themes"
  },
  { 
    id: 16, 
    text: "What do you believe your life purpose is?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To understand the user's sense of purpose and direction"
  },
  { 
    id: 17, 
    text: "If you could have a conversation with your future self, what would you most want to know?", 
    type: "longText", 
    maxWords: 100, 
    purpose: "To explore future aspirations and concerns"
  },
  { 
    id: 18, 
    text: "If your life was a book, what would be the title of the current chapter?", 
    type: "text", 
    maxWords: 10, 
    purpose: "To understand the user's current life phase"
  },
  { 
    id: 19, 
    text: "What do you like best about yourself?", 
    type: "longText", 
    maxWords: 50, 
    purpose: "To identify positive self-image and self-appreciation"
  },
  { 
    id: 20, 
    text: "What part of yourself do you hide from others?", 
    type: "longText", 
    maxWords: 50, 
    purpose: "To explore hidden aspects of personality and potential inner conflicts"
  },
  { 
    id: 21, 
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
    maxWords: 50,
    purpose: "To identify elemental affinity and its influence"
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
  '/images/question13-bg.jpg',
  '/images/question14-bg.jpg',
  '/images/question15-bg.jpg',
  '/images/question16-bg.jpg',
  '/images/question17-bg.jpg',
  '/images/question18-bg.jpg',
  '/images/question19-bg.jpg',
  '/images/question20-bg.jpg',
  '/images/question21-bg.jpg',
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
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [showPolicyButtons, setShowPolicyButtons] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [showThankYouConfirmation, setShowThankYouConfirmation] = useState(false);

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

  const handleEmailCapture = (email) => {
    console.log('Email captured:', email);
    setAnswers(prev => ({ ...prev, email }));
    setShowEmailCapture(false);
    console.log('Generating reading...');
    handleGenerateReading();
    setShowResults(true);
    setShowPolicyButtons(false);
  };

  const handleSkipEmail = () => {
    console.log('Email capture skipped');
    setShowEmailCapture(false);
    console.log('Generating reading...');
    handleGenerateReading();
    setShowResults(true);
    setShowPolicyButtons(false);
  };

  const handleGenerateReading = async () => {
    setIsLoading(true);
    setShowResults(true);
    setIsConjuring(true); // Start conjuring effect
    try {
      const quizData = questions.map(question => {
        const answer = answers[question.id];
        return {
          id: question.id,
          text: question.text,
          type: question.type,
          answer: typeof answer === 'object' ? answer.value : answer,
          explanation: typeof answer === 'object' ? answer.explanation : undefined,
          purpose: getQuestionPurpose(question.id)
        };
      });

      const zodiacSign = answers[11];
      const elementalAffinity = answers[12];

      const response = await axios.post('http://localhost:3000/api/quiz/submit', { 
        quizData,
        zodiacSign,
        elementalAffinity,
        context: "This quiz is designed to uncover the user's spiritual essence and provide personalized insights. The answers should be interpreted in the context of the user's spiritual journey."
      });
      console.log('API response:', response.data);
      setMagicalProfile(response.data);
      // Store the magical profile in localStorage
      localStorage.setItem('magicalProfile', JSON.stringify(response.data));
      // Store the quiz answers in localStorage
      localStorage.setItem('quizAnswers', JSON.stringify(quizData));
      console.log('Stored magicalProfile:', localStorage.getItem('magicalProfile'));
      console.log('Stored quizAnswers:', localStorage.getItem('quizAnswers'));
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
        return "To tailor the reading to the user's life stage";
      case 3:
        return "To incorporate astrological influences";
      case 4:
        return "To understand color associations and personality";
      case 5:
        return "To identify preferred magical environments and their personal significance";
      case 6:
        return "To understand seasonal influences and personality traits";
      case 7:
        return "To identify sources of inner peace and harmony";
      case 8:
        return "To understand sources of happiness and fulfillment";
      case 9:
        return "To identify desired abilities and personal aspirations";
      case 10:
        return "To explore the user's ideal world and values";
      case 11:
        return "To understand self-perception and desired traits";
      case 12:
        return "To identify complementary traits and desired support";
      case 13:
        return "To understand preferred methods of insight and guidance";
      case 14:
        return "To understand the user's perception of fate and free will";
      case 15:
        return "To identify life patterns and recurring themes";
      case 16:
        return "To understand the user's sense of purpose and direction";
      case 17:
        return "To explore future aspirations and concerns";
      case 18:
        return "To understand the user's current life phase";
      case 19:
        return "To identify positive self-image and self-appreciation";
      case 20:
        return "To explore hidden aspects of personality and potential inner conflicts";
      case 21:
        return "To identify elemental affinity and its influence";
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
    console.log('magicalProfile in localStorage:', localStorage.getItem('magicalProfile'));
    console.log('quizAnswers in localStorage:', localStorage.getItem('quizAnswers'));
    setShowCommissionForm(true);
    setShowPolicyButtons(false);
  };

  const handleCommissionBack = () => {
    setShowCommissionForm(false);
    setShowResults(true);
    setShowPolicyButtons(false);
  };

  const handleCommissionSubmit = async (formData) => {
    console.log('Received formData:', formData);

    // Add magicalProfile and quizAnswers
    const magicalProfile = JSON.parse(localStorage.getItem('magicalProfile') || '{}');
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '[]');
    formData.append('magicalProfile', JSON.stringify(magicalProfile));
    formData.append('quizAnswers', JSON.stringify(quizAnswers));

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, value.name, value.size, value.type);
      } else {
        console.log(key, value);
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/api/commission/submit', formData, {
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
        localStorage.removeItem('magicalProfile');
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

  return (
    <div className="App">
      <VideoBackground />
      <FireflyEffect isConjuring={isConjuring} />
      {!quizStarted && <StartPage onStartQuiz={handleStartQuiz} />}
      {quizStarted && !showEmailCapture && !showResults && !showCommissionForm && !showThankYouConfirmation && (
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
      {showResults && !showCommissionForm && !showThankYouConfirmation && (
        <ResultsPage 
          profile={magicalProfile} 
          isLoading={isLoading} 
          country={country} 
          onCommissionStart={handleCommissionStart}
        />
      )}
      {showCommissionForm && (
        <CommissionForm
          onBack={handleCommissionBack}
          onSubmit={handleCommissionSubmit}
          profile={JSON.parse(localStorage.getItem('magicalProfile'))}
          quizAnswers={JSON.parse(localStorage.getItem('quizAnswers'))}
          onShowPrivacyPolicy={handleShowPrivacyPolicy}
          onShowTermsAndConditions={handleShowTermsAndConditions}
        />
      )}
      {showThankYouConfirmation && (
        <ThankYouConfirmation
          onReturnToReading={() => {
            setShowThankYouConfirmation(false);
            setShowResults(true);
          }}
        />
      )}
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
      {showPolicyButtons && !showCommissionForm && !showResults && !showThankYouConfirmation && (
        <div className="footer-links">
          <button onClick={handleShowPrivacyPolicy}>Privacy Policy</button>
          <button onClick={handleShowTermsAndConditions}>Terms and Conditions</button>
        </div>
      )}
      {debugMode && (
        <DebugPanel
          setCurrentQuestion={setCurrentQuestion}
          setShowEmailCapture={setShowEmailCapture}
          setShowResults={setShowResults}
          setQuizStarted={setQuizStarted}
          setShowCommissionForm={setShowCommissionForm}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}

export default App;