let questionList = [
    {
    "id": 1,
    "question": "Which of these were created by an Irish inventor?",
    "answers": {
        "a": "The electric whisk",
        "b": "The sausage stuffer",
        "c": "The back scratcher",
        "d": "The submarine"
    },
    "correct": "d",
    "url": "placeholder"
},

    {
    "id": 2,
    "question": "What is the Irish national animal?",
    "answers": {
        "a": "Irish Hare",
        "b": "Pine marten",
        "c": "Stag",
        "d": "Galway sheep"
    },
    "correct": "a",
    "url": "placeholder"
},

    {
    "id": 3,
    "question": "Which colours are shown in the Irish flag?",
    "answers": {
        "a": "Red, white and blue",
        "b": "Green, white and orange",
        "c": "Black, green and silver",
        "d": "Blue, white and yellow",
    },
    "correct": "b",
    "url": "placeholder"
},

    {
    "id": 4,
    "question": "In which Irish county would you find Blarney Castle home of the World famous Blarney Stone?",
    "answers": {
        "a": "Cork",
        "b": "Dublin",
        "c": "Kilkenny",
        "d": "Donegal",
    },
    "correct": "a",
    "url": "placeholder"
},

    {
    "id": 5,
    "question": "Which Irish band had UK top twenty hits with 'Zombie' and 'Linger'",
    "answers": {
        "a": "Bewitched",
        "b": "Boyzone",
        "c": "Westlife",
        "d": "The Cranberries",
    },
    "correct": "d",
    "url": "placeholder"
},


    {
    "id": 6,
    "question": "Which US city dyes its river green on St Patrick's Day?",
    "answers": {
        "a": "New York",
        "b": "Boston",
        "c": "Chicago",
        "d": "Seattle",
    },
    "correct": "c",
    "url": "placeholder"
},
	
    {
    "id": 7,
    "question": "Which Irishman played James Bond in the 1995 movie 'Goldeneye'?",
    "answers": {
        "a": "Colin Farrell",
        "b": "Pierce Brosnan",
        "c": "Cilian Murphy",
        "d": "Liam Neeson",
    },
    "correct": "b",
    "url": "placeholder"
},


    {
    "id": 8,
    "question": "Which sport is most popular in Ireland?",
    "answers": {
        "a": "Football",
        "b": "Rugby",
        "c": "Gaelic Football",
        "d": "Hockey",
    },
    "correct": "c",
    "url": "placeholder"
},


    {
    "id": 9,
    "question": "Which Irish actor played Roy Trenneman in The IT Crowd from 2006-2013?",
    "answers": {
        "a": "Graham Norton",
        "b": "Brendan Gleeson",
        "c": "James Nesbitt",
        "d": "Chris O'Dowd",
    },
    "correct": "d",
    "url": "placeholder"
},


    {
    "id": 10,
    "question": "Which Irish actor played Roy Trenneman in The IT Crowd from 2006-2013?",
    "answers": {
        "a": "Britain",
        "b": "Ireland",
        "c": "Nigeria",
        "d": "Switzerland",
    },
    "correct": "a",
    "url": "placeholder"
},

    {
    "id": 11,
    "question": "What nationality was St Patrick?",
    "answers": {
        "a": "Irish",
        "b": "French",
        "c": "German",
        "d": "Scottish",
    },
    "correct": "d",
    "url": "placeholder"
},


    {
    "id": 12,
    "question": "Which of these Irish actors has NOT been in Star Wars?",
    "answers": {
        "a": "Domhnall Gleeson",
        "b": "Liam Neeson",
        "c": "Bronagh Gallagher",
        "d": "Aising Bea",
    },
    "correct": "d",
    "url": "placeholder"
},



    {
    "id": 13,
    "question": "Where is The Guinness Storehouse located?",
    "answers": {
        "a": "Dublin",
        "b": "Cork",
        "c": "Galway",
        "d": "Kerry",
    },
    "correct": "a",
    "url": "placeholder"
},


    {
    "id": 14,
    "question": "Which are the official languages spoken in Ireland?",
    "answers": {
        "a": "Irish and English",
        "b": "French and English",
        "c": "Irish and Scottish",
        "d": "Irish and Welsh",
    },
    "correct": "a",
    "url": "placeholder"
},

    {
    "id": 15,
    "question": "How many times has Ireland won the Eurovision Song Contest?",
    "answers": {
        "a": "4",
        "b": "7",
        "c": "9",
        "d": "Never",
    },
    "correct": "b",
    "url": "placeholder"
},

    {
    "id": 16,
    "question": "On which fictional island did Fathers Ted, Dougall and Jack live?",
    "answers": {
        "a": "Craggy Island",
        "b": "Shaggy Island",
        "c": "Smelly Island",
        "d": "Foggy Island",
    },
    "correct": "a",
    "url": "placeholder"
},


    {
    "id": 17,
    "question": "Why did St Patrick come to Ireland?",
    "answers": {
        "a": "He was abducted and taken as a slave",
        "b": "He had family in Dublin",
        "c": "He came to bring Christianity to the Pagans",
        "d": "He came to banish the snakes",
    },
    "correct": "a",
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
