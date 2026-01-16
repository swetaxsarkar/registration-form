import { useState } from "react";
import { questions } from "../data/questions";

function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === null) return;

    let updatedScore = score;

    if (selectedOption === currentQuestion.correctAnswer) {
      updatedScore += 2;
    } else {
      updatedScore -= 1;
      if (updatedScore < 0) updatedScore = 0;
    }

    setScore(updatedScore);
    setSelectedOption(null);

    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Quiz Application</h3>

          {!isFinished ? (
            <>
              <h5>
                Question {currentIndex + 1} / {questions.length}
              </h5>
              <p className="fw-bold">{currentQuestion.question}</p>

              {currentQuestion.options.map((opt, index) => (
                <div className="form-check mb-2" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="option"
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}

              <button
                className="btn btn-primary mt-3"
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>

              <p className="mt-3 fw-bold">Score: {score}</p>
            </>
          ) : (
            <>
              <h4 className="text-center">Quiz Finished 🎉</h4>
              <p className="text-center fw-bold">Final Score: {score}</p>
              <button className="btn btn-success w-100" onClick={handleRestart}>
                Restart Quiz
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizApp;
