import React, { useEffect, useState } from 'react';

import './App.css';

const raifLogoSrc = 'https://www.raiffeisen.ru/favicon.ico';
const sberLogoSrc = 'https://www.sberbank.com/portalserver/static/templates/%5BBBHOST%5D/KomBaseMasterpageTemplate/static/apple-touch-icon-180x180.png';
const tinkLogoSrc = 'https://acdn.tinkoff.ru/params/common_front/resourses/icons/icon-192x192.png';

function App() {
  const [ date, setDate ] = useState<number>(Date.now());
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ raif, setRaif ] = useState<number>(0);
  const [ sber, setSber ] = useState<number>(0);
  const [ tink, setTink ] = useState<number>(0);
  const [ unistream, setUnistream ] = useState<number>(0);
  const [ percent, setPercent ] = useState<number>(0);
  const [ binancePercent, setBinancePercent ] = useState<number>(0.1);

  useEffect(() => {
    fetch('https://unistream-spread-backend-46zcznlnv-oskemarkup.vercel.app/prices')
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          setRaif(data.raif);
          setSber(data.sber);
          setTink(data.tink);
          setUnistream(data.uni);
        });
  }, [ date ]);

  const calcSpread = (rate: number): number => ((1 - percent / 100) * rate / (1 + binancePercent / 100) - unistream) / unistream * 100;

  const raifSpread = calcSpread(raif);
  const sberSpread = calcSpread(sber);
  const tinkSpread = calcSpread(tink);

  return (
    <div className="App">
      {isLoading ? (
          <p>loading</p>
      ) : (
          <div>
            <p>
              <img width={24} src={raifLogoSrc} /> <input value={raif} disabled />
            </p>
            <p>
              <img width={24} src={sberLogoSrc} /> <input value={sber} disabled />
            </p>
            <p>
              <img width={24} src={tinkLogoSrc} /> <input value={tink} disabled />
            </p>
            <p>
              <label>Unistream:</label>
              <input value={unistream} disabled />
            </p>
            <p>
              <label>Комса приемки %:</label>
              <input type="number" step="0.1" value={percent} onChange={e => setPercent(Number(e.target.value))} />
            </p>
            <p>
              <label>Комса Binance %:</label>
              <input type="number" step="0.1" value={binancePercent} onChange={e => setBinancePercent(Number(e.target.value))} />
            </p>
            <h3>Расчетный спред</h3>
            <h1>{raifSpread.toFixed(2)}% <img width={36} src={raifLogoSrc} /></h1>
            <h1>{sberSpread.toFixed(2)}% <img width={36} src={sberLogoSrc} /></h1>
            <h1>{tinkSpread.toFixed(2)}% <img width={36} src={tinkLogoSrc} /></h1>
            <button onClick={() => setDate(Date.now())}>refresh</button>
          </div>
      )}
    </div>
  );
}

export default App;
