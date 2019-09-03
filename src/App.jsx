import React, { useState } from "react"; //state Kuallnıcağım için use state

export default function App() {

  const [game, setgame] = useState({
    mevcutSoru: null,
    sorular: [{
      soru: "Siyah ile aynı anlama gelen bir renk",
      cevap: "KARA",
      soruldu: false,
    },
    {
      soru: "Sık kullanılan bir isim",
      cevap: "Ahmet",
      soruldu: false,
    },
    {
      soru: "Türkiyenin başkanti",
      cevap: "ANKARA",
      soruldu: false,
    },
    {
      soru: "Karadenizde bir ilimiz",
      cevap: "TRABZON",
      soruldu: false,
    },
    {
      soru: "Kayısısı ile ünlü ilimiz?",
      cevap: "MALATYA",
      soruldu: false,
    }],
    harfler: [],
    puan: 0,
    harfPuan: 0,
    sure: null,
    kalanSure: 0,
    tamamlandı: false,
    yarismaciCevap: "",
    mesaj: " Cevabınız yanlış",
    mesajClass: "bg-info text-white",
    mesajSure: null
  })

  const startGame = () => {

    setgame({ ...game, sorular: game.sorular.map(soru => { soru.soruldu = false; return soru; }) });
    askQuestion();
  }

  const askQuestion = () => {
    let sorular = game.sorular;
    let mevcutSoru = sorular.find(soru => !soru.soruldu)
    let harfler = [];

    if (!mevcutSoru) {
      gameOver();
      return;
    }

    mevcutSoru.cevap.split("").forEach(h => {
      harfler.push({
        deger: h,
        acik: false
      });
    });
    mevcutSoru.soruldu = true;
    setgame({ ...game, mevcutSoru, harfler, sorular })
  }

  const answer = () => {
    askQuestion();
  }

  const gameOver = () => {
    setgame({ ...game, tamamlandı: true, mevcutSoru: null, harfler: [] });

  };

  const giveLetter = () => {
    let randomLetterIndex = Math.floor(Math.random() * game.harfler.length);
    console.log(randomLetterIndex);
  };

  //console.log(game.sorular);

  return (
    <div className="container mt-4">
      {!game.mevcutSoru && (
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Kelime Oyununa Hoşgeldiniz</h4>
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
      {game.tamamlandı && (
        <div className="card">
          <div className="card-body">

            Tebrikler oyunu {game.puan} ile tamamladınız.

          </div>
        </div>

      )}

      {
        game.mevcutSoru && (<div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">{game.mevcutSoru.soru}</h4>
          </div>
          <div className="card-body">
            <div className="harfler d-flex">
              {game.harfler.map((harf, index) => (
                <div className="harf shadow-sm mr-4 bg-dark text-white" key={"key-" + index}>
                  {harf.acik && <span>{harf.deger}</span>}
                  <span></span>
                </div>)
              )}
            </div>


          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Cevabınız?"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
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
          <div className={"card-footer " + game.mesajClass}>{game.mesaj}</div>
        </div>)
      }

      {/**/}
    </div>
  );
};
