import { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [currency1, setCurrency1] = useState(null);
  const [currency2, setCurrency2] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);

  async function getData() {
    const response = await fetch('https://api.apilayer.com/currency_data/live', {
      headers: { apikey: 'nFI1a1wvEczOfqn22zkN8rpN6lrkQLfK' },
    });
    const data = await response.json();
    setCurrency1(data.quotes);
    setCurrency2(data.quotes);
  }

  useEffect(() => {
    getData();
  }, []);

  function converter(e) {
    e.preventDefault();
    const convertCurrency = (value1 / value2) * input1;
    setInput2(convertCurrency);
  }

  return (
    <div className="container">
      <h3>Converter</h3>
      <form onSubmit={converter}>
        <div>
          <input
            type="text"
            value={input1 || ''}
            onChange={(e) => setInput1(e.target.value)} />
          <select
            onChange={(e) => setValue1(e.target.value)}>
            {currency1
              ? (Object.keys(currency1)
                .map((value, index) => (<option
                  key={index}
                  value={currency1[value]}>
                  {value.slice(3, value.length)}
                </option>)))
              : (<option>AED</option>)
            }
          </select>
        </div>
        <div>
          <input
            type="text"
            value={input2 || ''}
            readOnly />
          <select
            onChange={(e) => setValue2(e.target.value)}>
            {currency2
              ? (Object.keys(currency2)
                .map((value, index) => (<option
                  key={index}
                  value={currency1[value]}>
                  {value.slice(3, value.length)}
                </option>)))
              : (<option>AED</option>)
            } {currency1
              ? (<option value={1} key={999}>
                {Object.keys(currency1)[0].slice(0, 3)}
              </option>)
              : (<></>)
            }
          </select>
        </div>
        <button type='submit'>convert</button>
      </form>
    </div>
  );
}

export default App;
