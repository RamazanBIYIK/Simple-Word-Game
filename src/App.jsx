import React from "react"; //state Kuallnıcağım için use state

export default function App() {
  return (
    <div className="container mt-4">
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
          <button className="btn btn-primary">Yarışmaya Başla</button>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">Tükiyenin basşkenti neresi?</h4>
        </div>
        <div className="card-body">

<div className="harf">

</div>

        </div>
        <div className="card-footer">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Cevabınız?"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-success" type="button">
                Cevapla
              </button>
              <button class="btn btn-outline-dark" type="button">
                Harf Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
