


/*
document.getElementById('start_button').addEventListener('click', () => {

    //ようこそ画面の非表示
    document.querySelector("#welcome").style.display = "none";
    //取得中画面の表示
    document.querySelector("#nowloading").style.display = "block";

    const URL = "https://opentdb.com/api.php?amount=10";

    fetch(URL)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Fetch: ${res.status} ${res.statusText}`);
            }
            return (res.json());
        })
        .then((json) => {

            // 表示を切り替える
            document.querySelector("#nowloading").style.display = "none";

            //答えの選択肢をランダム表示するための配列のシャッフル用関数
            function shuffleArray(array) {
                for (j = array.length - 1; 0 < j; j--) {
                    let r = Math.floor(Math.random() * (j + 1));

                    let last = array[j];
                    array[j] = array[r];
                    array[r] = last;
                }
                return array;
            }

            //正解数のカウント用の配列
            const correct_answers_counter = []

            let i = 0;
            function showQuestion(i) {

                document.querySelector(`#question${i}`).style.display = "block";

                //選択肢の配列の生成
                const answers_array = [json.results[i].correct_answer]

                for (k = 0; k < json.results[i].incorrect_answers.length; k++) {
                    answers_array.push(json.results[i].incorrect_answers[k]);
                }

                //選択肢をシャッフル
                shuffleArray(answers_array);

                //問題の表示
                const question_num = document.createElement('h1');
                const question_category = document.createElement('h2');
                const question_difficulty = document.createElement('h2');
                const question_text = document.createElement('p');

                question_num.textContent = '問題' + (i + 1);
                question_category.textContent = '[ジャンル]' + json.results[i].category;
                question_difficulty.textContent = '[難易度]' + json.results[i].difficulty;
                question_text.textContent = json.results[i].question;

                const container = document.getElementById(`question${i}`);
                container.appendChild(question_num);
                container.appendChild(question_category);
                container.appendChild(question_difficulty);
                container.appendChild(question_text);

                //答えの選択肢の表示
                for (l = 0; l < answers_array.length; l++) {
                    const add_answer = document.createElement('input');
                    add_answer.type = 'button';
                    add_answer.value = answers_array[l];
                    container.appendChild(add_answer);
                    container.appendChild(document.createElement('br'));

                    //クリックすると問題を削除し、次の問題を生成する
                    add_answer.addEventListener('click', () => {

                        document.querySelector(`#question${i}`).innerHTML = '';

                        //正解していればcorrect_answers_counterに問題番号を追加する
                        if (add_answer.value == json.results[i].correct_answer) {
                            correct_answers_counter.push(i);
                        }

                        if (i < 9) {
                            i++;
                            showQuestion(i);
                        } else {
                            //10問目が終わると成績を表示する
                            showResult();
                        }
                    });
                }
            }
            //成績表示用関数
            function showResult() {
                document.querySelector(`#result`).style.display = "block";
                const show_result = document.createElement('h1');
                const return_home_text = document.createElement('p');
                const return_home_button = document.createElement('input');

                //correct_answers_counterの中身の数を表示
                show_result.textContent = `あなたの正答数は${correct_answers_counter.length}です。`
                return_home_text.textContent = '再チャレンジしたい場合は以下をクリック！'
                return_home_button.type = 'button';
                return_home_button.value = 'ホームに戻る';

                document.getElementById('result').appendChild(show_result);
                document.getElementById('result').appendChild(return_home_text);
                document.getElementById('result').appendChild(return_home_button);

                //ホームへ戻るボタン
                return_home_button.addEventListener('click', () => {
                    //成績表示の削除
                    document.getElementById('result').innerHTML = '';
                    //ようこそ画面の再表示
                    document.querySelector("#welcome").style.display = "block";
                });
            }
            showQuestion(0);
        })
        .catch((error) => {
            alert("エラーが発生しました");
            console.error(error);
        })
});
*/

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