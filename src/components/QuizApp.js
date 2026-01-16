import { useState } from "react";
import { questions } from "../data/questions";

function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // store all selected answers
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  // select option
  const handleSelectOption = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  // next question
  const handleNext = () => {
    if (answers[currentIndex] === null) return;

    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // back question (boss new requirement)
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // calculate score at end
  const calculateScore = () => {
    let score = 0;

    answers.forEach((ans, index) => {
      if (ans === null) return;

      if (ans === questions[index].correctAnswer) {
        score += 2;
      } else {
        score -= 1;
        if (score < 0) score = 0;
      }
    });

    return score;
  };

  // restart quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
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
                    name={`question-${currentIndex}`}
                    checked={answers[currentIndex] === index}
                    onChange={() => handleSelectOption(index)}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}

              <div className="d-flex gap-2 mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                >
                  Back
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={answers[currentIndex] === null}
                >
                  {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-center">Quiz Finished 🎉</h4>
              <p className="text-center fw-bold">
                Final Score: {calculateScore()}
              </p>

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
