const URL = "https://opentdb.com/api.php?amount=10";

const counter = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[j], array[i]] = [array[i], array[j]];
    }
    return array;
}

class Quiz {
    constructor(quizData) {
        this._quizzes = quizData.results;
        this._correctAnswerNum = 0;
    }
    //Get API data elements
    getQuizCategory(index) {
        return this._quizzes[index - 1].category;
    }

    getQuizType(index) {
        return this._quizzes[index - 1].type;
    }

    getQuizDifficulty(index) {
        return this._quizzes[index - 1].difficulty;
    }

    getQuizQuestion(index) {
        return this._quizzes[index - 1].question;
    }

    getQuizCorrectAnswer(index) {
        return this._quizzes[index - 1].correct_answer;
    }

    getQuizIncorrectAnswers(index) {
        return this._quizzes[index - 1].incorrect_answers;
    }
}


const fetchQuizData = async (index) => {
    try {

        document.getElementById('question_num').innerHTML = "取得中";
        document.getElementById('question_text').innerHTML = "少々お待ち下さい";


        const response = await fetch(URL);
        const quizData = await response.json();
        const quiz = new Quiz(quizData);

        setNextQuiz(quiz, index);
    } catch (err) {
        alert('APIの取得に失敗しました。');
    }
}

function setNextQuiz(quiz, index) {

    const answer_options = [
        quiz.getQuizCorrectAnswer(index)
    ];

    for (i = 0; i < quiz.getQuizIncorrectAnswers(index).length; i++) {
        answer_options.push(quiz.getQuizIncorrectAnswers(index)[i]);
    }

    shuffle(answer_options);

    document.getElementById('question_num').innerHTML = `問題${index}`;
    document.getElementById('question_category').innerHTML = `［ジャンル］${quiz.getQuizCategory(index)}`;
    document.getElementById('question_difficulty').innerHTML = `［難易度］${quiz.getQuizDifficulty(index)}`;
    document.getElementById('question_text').innerHTML = quiz.getQuizQuestion(index);

    for (i = 0; i < answer_options.length; i++) {
        const add_answer = document.createElement('input');
        add_answer.type = 'button';
        add_answer.value = answer_options[i];
        document.getElementById('options').appendChild(add_answer);
        document.getElementById('options').appendChild(document.createElement('br'));

        add_answer.addEventListener('click', () => {

            const elem = document.getElementById('options');

            if (add_answer.value === quiz.getQuizCorrectAnswer(index)) {
                counter.push(index);
            }

            if (index < 10) {
                index++;
                while (elem.firstChild) {
                    document.getElementById('options').removeChild(elem.firstChild);
                }
                setNextQuiz(quiz, index);
            } else {
                document.getElementById('question_num').innerHTML = `あなたの正答数は${counter.length}です。`;
                document.getElementById('question_category').innerHTML = "";
                document.getElementById('question_difficulty').innerHTML = "";
                document.getElementById('question_text').innerHTML = "サイドチャレンジしたい場合は以下をクリック";
                while (elem.firstChild) {
                    document.getElementById('options').removeChild(elem.firstChild);
                }
                const go_home = document.createElement('input');
                go_home.type = 'button';
                go_home.value = 'ホームに戻る';
                document.getElementById('options').appendChild(go_home);

                go_home.addEventListener('click', () => {
                    document.getElementById('question_num').innerHTML = "ようこそ";
                    document.getElementById('question_text').innerHTML = "以下のボタンをクリック";
                    go_home.style.display = "none";
                    document.getElementById('start_button').style.display = "block";
                });

            }
        });
    }

}

document.getElementById('start_button').addEventListener('click', () => {
    fetchQuizData(1);
    document.getElementById('start_button').style.display = "none";
});