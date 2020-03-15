'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きな湖は?', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は?', c: ['256', '64', '1024']},
    {q: '次のうち、最初にリリースされた言語は?', c: ['Python', 'JavaScript', 'HTML']},
    {q: '安全第一の続き、第二は何?', c: ['品質', '生産', '利益']},
    {q: 'チゲ鍋のチゲはどういう意味?', c: ['鍋', '辛い', 'うまい']},
    {q: 'サザエさんのカツオの初代声優は誰?', c: ['大山のぶ代（ドラえもんの声）', '戸田恵子（アンパンマンの声）', '野沢雅子（孫悟空の声）']},
    {q: 'アイスクリームに温かいコーヒーをかけて作るデザートは？', c: ['アフォガード', 'カヌレ', 'ティラミス']},
    {q: 'コーヒーは何科の植物？', c: ['アカネ科', 'コーヒー科', 'ツバキ科']},
    {q: '水で抽出するコーヒーを何という？', c: ['ダッチコーヒー', 'ウォーターコーヒー', 'クールコーヒー']},
    {q: 'カフェ・ロワイヤルとは角砂糖に何を含ませたもの？', c:['ブランデー', 'ワイン', 'ウイスキー']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1 ) {
      btn.textContent = 'Show Score';
    }
  }
  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();  
    }
  });
  }