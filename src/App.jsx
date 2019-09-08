import React, { useState,useEffect } from "react"; //state Kuallnıcağım için use state
import LetterView from "./LetterView";

export default function App() {
  const [totalPuan, setTotalPuan] = useState(0);
  const [message,setMessage]=useState(null);
  const [time,setTime]=useState(null);
  const [game, setgame] = useState({
    currentQuestion: null,
    questions: [{
      question: "Siyah ile aynı anlama gelen bir renk",
      currentAnswer: "KARA",
      asked: false,
    },
    {
      question: "Sık kullanılan bir isim",
      currentAnswer: "Ahmet",
      asked: false,
    },
    {
      question: "Türkiyenin başkanti",
      currentAnswer: "ANKARA",
      asked: false,
    },
    {
      question: "Karadenizde bir ilimiz",
      currentAnswer: "TRABZON",
      asked: false,
    },
    {
      question: "Kayısısı ile ünlü ilimiz?",
      currentAnswer: "MALATYA",
      asked: false,
    }],
    letters: [],
  
    letterScore: 0,
    gameCompleted: false,
    competitorAnswer: ""
  })

  const receiveMessage = (message, kind) => {
    if (kind === "error") {
      setMessage({message, still: "bg-danger text-white" })
    }
    else if (kind === "success") {

      setMessage({message ,still: "bg-success text-white" })
    }
    else {
      setMessage({message, still: "bg-info text-white" })
 
    }

  }
useEffect(()=> {
  if(time &&time.remainingTime>0){
    const timeInterval=setInterval(()=>setTime({...time,remainingTime:time.remainingTime-1}),1000);
    return() => {
      clearInterval(timeInterval);
    }
  }

})

  const startGame = () => {
    setTime({remainingTime:240})
    setMessage(null);
    setTotalPuan(null);
    setgame({ ...game, questions: game.questions.map(question => { question.asked = false; return question; }),gameCompleted:false, });
    askQuestion();
  }

  const askQuestion = () => {
    let questions = game.questions;
    let currentQuestion = questions.find(question => !question.asked)
    let letters = [];

    if (!currentQuestion) {
      gameOver();
      return;
    }

    currentQuestion.currentAnswer.split("").forEach(h => {
      letters.push({
        value: h,
        opened: false
      });
      //console.log("h şudur==" + h);
    }
    );
    currentQuestion.asked = true;
    setgame({ ...game, currentQuestion, letters, questions, letterScore: letters.length * 100, competitorAnswer: "",gameCompleted:false })
  
  }

  const answer = () => {
    let Toplam = totalPuan;
    if (game.competitorAnswer.toLocaleUpperCase("tr") === game.currentQuestion.currentAnswer.toLocaleUpperCase("tr")) {

      Toplam += game.letterScore;
      receiveMessage("Tebrikler bildiniz", "success")
    }
    else {
      Toplam -= game.letterScore;
      receiveMessage(`Yanlış cevap. Doğru cevap:${game.currentQuestion.currentAnswer}`, "error")

    }
    //console.log(game.competitorAnswer);
    setTotalPuan(Toplam)
    askQuestion();
  }

  const gameOver = () => {
    setgame({ ...game, gameCompleted: true, currentQuestion: null, letters: [] });

  };

  const giveLetter = () => {
    if (game.letterScore <= 100) {
      return;
    }
    let rastgeleHarfIndex = Math.floor(Math.random() * game.letters.length);
    let letter = game.letters[rastgeleHarfIndex];
    while (letter.opened) {
      rastgeleHarfIndex = Math.floor(Math.random() * game.letters.length);
      letter = game.letters[rastgeleHarfIndex];
    }
    setgame({
      ...game,
      letters: game.letters.map((letter, index) => {
        if (index === rastgeleHarfIndex) {
          letter.opened = true;
        }
        return letter;
      }),
      letterScore: game.letterScore - 100
    });
  };

  const answerChanged = (e) => {
    setgame({ ...game, competitorAnswer: e.target.value })
  };

  //console.log(game.questions);

  return (
    <div className="container mt-4">
      {!game.currentQuestion && (
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Kelime gameuna Hoşgeldiniz</h4>
          </div>
          <div className="card-body">
            <p className="mb-0">
              Yarışmaya başlamak için Başla butonuna tıklayınız
          </p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={startGame}>Yarışmaya Başla</button>
          </div>
        </div>
      )}
      {game.gameCompleted && (
        <div className="card">
          <div className="card-body">

            Tebrikler gameu {totalPuan} ile tamamladınız.
  
          </div>
        </div>

      )}

      {
        game.currentQuestion && (<div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">{game.currentQuestion.question}</h4>
          </div>
          <div className="card-body">
          <div className="harfler d-flex">
              {game.letters.map((letter, index) => (
                <LetterView {...letter} key={"key-" + index} />
              ))}
            </div>


          </div>
          <div className="card-footer">
            <div className="mr-4">Toplam Puan: {totalPuan}</div>
            <div className="mr-4">Harf Puan: {game.letterScore}</div>
            <div className="mr-4">Kalan süre: {time.remainingTime} saniye.</div>
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Cevabınız?"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={game.competitorAnswer}
                onChange={answerChanged}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-success" type="button" onClick={answer}>
                  Cevapla
        </button>
                <button className="btn btn-outline-dark" type="button" onClick={giveLetter}>
                  Harf Ver
        </button>
              </div>
            </div>
          </div>
          {
            message && (<div className={"card-footer " + message.still}>{message.message}</div>)
          }
        </div>)
      }

      {/**/}
    </div>
  );
};
