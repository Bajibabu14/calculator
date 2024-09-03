import React, { useState, useEffect, useRef } from 'react';

const TypingSpeedTester = () => {
    const [text, setText] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [randomText, setRandomText] = useState('');
    const textInputRef = useRef(null);

    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "React is a JavaScript library for building user interfaces.",
        "Typing speed is an important skill in the digital age.",
        "Practice makes perfect, so keep typing to improve your speed."
    ];

    useEffect(() => {
        setRandomText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    }, []);

    useEffect(() => {
        if (isTimeRunning && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(time => time - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeRemaining === 0) {
            endGame();
        }
    }, [timeRemaining, isTimeRunning]);

    const startGame = () => {
        setIsTimeRunning(true);
        setTimeRemaining(60);
        setText('');
        setWordCount(0);
        textInputRef.current.disabled = false;
        textInputRef.current.focus();
    };

    const endGame = () => {
        setIsTimeRunning(false);
        setWordCount(calculateWordCount(text));
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const calculateWordCount = (text) => {
        const wordsArray = text.trim().split(/\s+/);
        return wordsArray.filter(word => word).length;
    };

    return (
        <div>
            <h1>Typing Speed Tester</h1>
            <p>{randomText}</p>
            <textarea
                ref={textInputRef}
                value={text}
                onChange={handleChange}
                disabled={!isTimeRunning}
            />
            <h4>Time Remaining: {timeRemaining} seconds</h4>
            <button onClick={startGame} disabled={isTimeRunning}>Start</button>
            <h4>Word Count: {wordCount}</h4>
        </div>
    );
};

export default TypingSpeedTester;
