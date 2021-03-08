let questionList = null;

document.addEventListener("DOMContentLoaded", function() {
    getJsonThenLoad();
});

const getJsonThenLoad = function() {
    fetch("./assets/js/quizData.json")
        .then(file => {
            return file.json();
        })
        .then(json => {
            questionList = json;
        })
        .then(() => pageHandler.firstLoad());
};

const game = (function () {
    const gameLength = 10;
    let givenAnswers = 0;
    let correctAnswers = 0;
    let questionsAsked = [];

    return {
        /**
         * Call with new game button, resets vars for new game
         */
        newGame: function () {
            givenAnswers = 0;
            correctAnswers = 0;
            questionsAsked = [];
        },

        /**
         * Monitor game status
         * @returns {[number, number]}
         */
        status: function () {
            return [givenAnswers, correctAnswers];
        },

        /**
         * Called with answer buttons, checks if answer was correct and raises counters accordingly
         * @param {number} questionId 1 to 50
         * @param {char} givenAnswer a | b | c | d
         * @returns {string} correctAnswer a | b | c | d
         */
        answer: function (questionId, givenAnswer) {
            givenAnswers += 1;
            questionsAsked.push(questionId);

            const question = questionList.find(d => d.id === questionId);

            if (givenAnswer === question.correct) {
                correctAnswers += 1;
            }

            return question.correct;
        },

        /**
         * Test if enough questions were asked,
         * if game is over => number of correct answers
         * if game is going => new question asked
         * @returns {(number|*|string|{a: string, b: string, c: string, d: string}|{a: string, b: string, c: string, d: string})[]|number}
         */
        provideQuestion: function () {
            if (givenAnswers === gameLength) {
                return correctAnswers;
            } else {

                /**
                 * Returns a random integer between min (inclusive) and max (inclusive).
                 * The value is no lower than min (or the next integer greater than min
                 * if min isn't an integer) and no greater than max (or the next integer
                 * lower than max if max isn't an integer).
                 * Using Math.round() will give you a non-uniform distribution!
                 * Reference: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range/1527820#1527820
                 */
                const getRandomInt = function (min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };

                let randomInt = getRandomInt(1, questionList.length);

                while (questionsAsked.includes(randomInt)) {
                    randomInt = getRandomInt(1, questionList.length);
                }

                const question = questionList.find(d => d.id === randomInt);

                return [question.id, question.question, question.answers, question.url];
            }
        }
    };
})();

const pageHandler = (function () {

    const questionElement = document.getElementsByClassName("question")[0];
    const answersElements = document.getElementsByClassName("answer");
    const correctAnswersElement = document.getElementById("gold");

    return {
        firstLoad: function() {
            document.getElementById("restart").addEventListener("click", () => {
                /**
                 * Quick and dirty approach to not run into the "give answer" timeout; maybe ad a "next question" button instead of
                 * that one?
                 */
                setTimeout(function () {
                    game.newGame();
                    pageHandler.newQuestion();
                });
            });

            for (let element of answersElements) {
                element.addEventListener("click", () => {
                    pageHandler.giveAnswer(questionElement.value, element.value);
                });
            }

            pageHandler.newQuestion();
        },

        /**
         * Remove CSS classes correct/wrong answer, sets new HTML text and values
         */
        newQuestion: function () {
            const questionData = game.provideQuestion();

            if (typeof(questionData) === "number") {

                if (questionData <= 4) { $("#toastLose").toast("show");}
                if (questionData > 4 && questionData <= 8) { $("#toastMiddle").toast("show");}
                else { $("#toastWin").toast("show"); }

            } else {

                for (let element of  answersElements) {
                    element.classList.remove("correctAnswer", "wrongAnswer");
                }

                correctAnswersElement.innerText = game.status()[1];
                questionElement.innerText = questionData[1];
                questionElement.value = questionData[0];

                /**
                 * Randomize array in-place using Durstenfeld shuffle algorithm
                 * Reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
                 * @param array
                 */
                const shuffleArray = array => {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                };
                const answersShuffled = shuffleArray(Object.entries(questionData[2]));

                for (let i = 0; i < answersShuffled.length; i++) {
                    const button = answersElements[i];
                    button.value = answersShuffled[i][0];
                    button.innerText = answersShuffled[i][1];
                    button.disabled = false;
                }
            }
        },

        /**
         * Provides given answer to game.answer, sets CSS classes correct/wrong Answer, calls newQuestion after timeout
         * @param questionId
         * @param clickedAnswer
         */
        giveAnswer: function (questionId, clickedAnswer) {
            const correctAnswer = game.answer(questionId, clickedAnswer);

            for (let element of answersElements) {
                element.disabled = true;
                if (element.value === correctAnswer) {
                    element.classList.add("correctAnswer");
                } else {
                    element.classList.add("wrongAnswer");
                }
            }
            setTimeout(function () {
                pageHandler.newQuestion();
            }, 2000);
        }
    };
})();