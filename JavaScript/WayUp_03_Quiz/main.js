const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, //текущий вопрос
    indexOfPage = 0; //текущая страница

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // результат викторины

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');



const questions = [  //Массив с вопросами и ответами
{
    question: 'Как звали сову Гарри Поттера?',
    options: [
        'Совунья',
        'Петунья',
        'Букля',
        'Она сама прилетала, никто её не звал',
    ],
    rightAnswer: 2
},
{
    question: 'Что такое фестрал?',
    options: [
        'Полугигант',
        'Невидимый крылатый конь',
        'Сморщенная голова',
        'Друг фрустрала',
    ],
    rightAnswer: 1
},
{
    question: 'Кем прикинулся Барти Крауч младший, чтобы попасть в Хогвартс?',
    options: [
            'Аластором Грюмом',
            'Сириусом Блэком',
            'Виктором Крамом',
            'Ветошью',
    ],
    rightAnswer: 0
},
{
    question: 'Как звали домового эльфа Сириуса Блэка??',
    options: [
             'Добби',
             'Винки',
             'Динки',
             'Кикимер',
             ],
    rightAnswer: 3
}
];

numberOfAllQuestion.innerHTML = questions.length; // кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;
 //переменная quest обращается к объекту в html(innerHTML), и помещает в question сожержимое из массива (questions[indexOfQuest])
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // ообозначение номера текущей станицы
    indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = []; //массив для уже отработанных вопросов


const randomQuestion = ()=> {
    let randomNumber = Math.floor(Math.random() * questions.length);
    /*floor() округляет до целого.
    *question.length = Math.random() в консоли выводит рандомное цисло 0.____. 
    умножение на длинну списка необходимо чтобы привести параметр рандомного списка в диапазоне колличества эл. массива */
    let hitDuplicate = false; //якорь для проверки одинаковых вопр.

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) { //проверка если уже есть решенные вопросы
            completedAnswers.forEach(item => {
                if(item == randomNumber) { // проверка если текщий вопрос уже был
                hitDuplicate = true;
            }
        });
        if(hitDuplicate) {
            randomQuestion(); 
        } else {
            indexOfQuestion = randomNumber; 
            load();
        }
    }
     if(completedAnswers == 0) {//если вопрос уже был, то занова генерировать рандомный вопрос
        indexOfQuestion = randomNumber; //если нет, то индекс ранд.вопр = рандомному числ
        load();
     }
    };
    completedAnswers.push(indexOfQuestion); //пуш заполняет массимв "снаружи"
};


const chechAnswer = el => { //проверка ответа - правильный или нет
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) { //сопоставление выбранного ответа Ж позиция в html и правильный ответ из массива
        el.target.classList.add('correct'); // присвоение селектора правильного ответа (см css) 
        updateAnswerTracker('correct');//для связки ответа и дивов из псевдомассива
        score++;
    } else {
        el.target.classList.add('wrong');// присвоение селектора неправильного ответа 
        updateAnswerTracker('wrong');//для связки ответа и дивов из псевдомассива
    }
    disableOptions();
}
const disableOptions = () => {  //ф-ия запрещает взаиможействие с другими эл после первого взаимодействия присваивая класс disable см css
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
};

const enableOptions = () => { //удаляет селекторы с ответ , чтобы с ними можно было взаимодействовать
    optionElements.forEach( (item )=>{
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};


const answerTracker = () => { //добавление дивов в html чтобы отображать кнопки внизу панели модального окна
    questions.forEach(() => { //пробегая по массиву questions[] создается то столько дивов, сколько элементов в массиве
        const div = document.createElement('div'); //.createElement метод создание нового ел
        answersTracker.appendChild(div); //.appendChild метод добавляет в родительский эл html который указан в .createElement свой дочерний (внутрь родительского эл)
    })
}

const updateAnswerTracker = status => { ////для связки ответа и дивов из псевдомассива
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
    // возвращает деток из псевдомассива и присваивает им статус. в верстке выглядит как кружочки, кот после ответа подсвечиваются так же как и T/F ответ
};


for(option of optionElements) { //проверка выбранного вопроса через клик
    option.addEventListener('click', e => chechAnswer(e));
}


const validate = () => { //проверяет есть ли на каком-либо элементе класс disabled. пока ни на каком эл его нет - не даст нажать кнопку некст
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Необходимо выбрать хотя бы один ответ');
    } else {
        randomQuestion();
        enableOptions();
    }
};

btnNext.addEventListener('click', () => { //вызывает валидацию класса disabled
    validate();
});


const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score; // выводит счет 
    numberOfAllQuestion2.innerHTML = questions.length; // выводит кол-во вопросов
};

const tryAgain = () => { //перезагрузка квива
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
   randomQuestion(); // генерация рандомного вопроса
   answerTracker();//вызов созданных доп.дивов
});

















