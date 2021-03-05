let questionList = [
    {
    "id": 1,
    "question": "Drink another pint?",
    "answers": {
        "a": "No",
        "b": "Never again",
        "c": "I drive home",
        "d": "And one for my friend"
    },
    "correct": "d",
    "url": "placeholder"
},
    {
    "id": 2,
    "question": "Drink another pint?",
    "answers": {
        "a": "No",
        "b": "Never again",
        "c": "I drive home",
        "d": "And one for my friend"
    },
    "correct": "d",
    "url": "placeholder"
}
];

const game = (function () {
    const gameLength = 10;
    let givenAnswers = 0;
    let correctAnswers = 0;
    let questionsAsked = [];

    /**
     * Call with new game button, resets vars for new game
     */
    function newGame() {
        givenAnswers = 0;
        correctAnswers = 0;
        questionsAsked = [];
    }

    return {

        /**
         * Monitor game status
         * @returns {[number, number]}
         */
        status: function() {
            return [givenAnswers, correctAnswers];
        },

        /**
         * Called with answer buttons, checks if answer was correct and raises counters accordingly
         * @param {number} questionId 1 to 50
         * @param {char} givenAnswer a | b | c | d
         * @returns {string} correctAnswer a | b | c | d
         */
        answer: function(questionId, givenAnswer) {
            givenAnswers++;
            questionsAsked.push(questionId);

            const question = questionList.find(d => d.id === questionId);

            if (givenAnswer === question.correct) {
                correctAnswers++;
            }

            return question.correct;
        },

        /**
         * Test if enough questions were asked,
         * if game is over => number of correct answers
         * if game is going => new question asked
         * @returns {(number|*|string|{a: string, b: string, c: string, d: string}|{a: string, b: string, c: string, d: string})[]|number}
         */
        provideQuestion: function() {
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
                const getRandomInt = function(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };

                let randomInt = getRandomInt(1,questionList.length);

                while (questionsAsked.includes(randomInt)) {
                    randomInt = getRandomInt(1,questionList.length);
                }

                const question = questionList.find(d => d.id === randomInt);

                return [question.id, question.question, question.answers, question.url];
            }
        }
    };
})();
