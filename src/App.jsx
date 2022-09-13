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
    const response = await fetch('https://api.apilayer.com/currency_data/list', {
      headers: { apikey: 'ykhf0AURgo7QYodMitcoxPqxI2ja9U7w' },
    });

    const data = await response.json();

    setCurrency1(data.currencies);
    setCurrency2(data.currencies);
  }

  useEffect(() => {
    getData();
  }, []);

  async function converter(e) {
    e.preventDefault();

    const response = await fetch(`https://api.apilayer.com/currency_data/live?source=${value1}&currencies=${value2}`, {
      headers: { apikey: 'ykhf0AURgo7QYodMitcoxPqxI2ja9U7w' },
    });

    const data = await response.json();
    const course = data.quotes[`${value1}${value2}`];
    const num = (course * (input1 || 1)).toFixed(2);

    setInput2(num);
  }

  return (
    <>
      <div className="container">
        {currency1 ? (
          <>
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
                        value={value}>
                        {value}
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
                        value={value}>
                        {value}
                      </option>)))
                    : (<option>AED</option>)
                  }
                </select>
              </div>
              <button type='submit'>convert</button>
            </form>
          </>
        ) : (
          <div className='circle'>
            <img src='./2492300.png' alt="..." />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
