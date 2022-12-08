import Head from 'next/head';
import { useState, useEffect } from 'react';

let codeArray = [];

export default function App() {
  const [inputValue, setInputValue] = useState(0);
  const [code, setCode] = useState([]);
  const [url, seturl] = useState([]);
  const [stepperCode, setStepperCode] = useState(null);
  function plusButtonClicked() {
    let d = inputValue;
 
    d += 1;
    setInputValue(d);
  }
  function minusButtonClicked() {
    let d = inputValue;
       let title = code
    let u = url
    d -= 1;
if(title.length == inputValue){
    title.pop()
    u.pop()
    
    setCode(title)
    seturl(u)
}
    if (d < 0) {
      setInputValue(0);
    } else {
      setInputValue(d);
    }
  }
  function CodeChange(i, value) {
    let c = code;

    if (!c[i]) {
      c[i] = {};
    }
    c[i].title = value;
    c[i] = { title: value };

    setCode(c);
  }
  function CodeChange1(i, value) {
    let c = url;
    if (!c[i]) {
      c[i] = {};
    }
    c[i].url = value;
    c[i] = { url: value };

    seturl(c);
  }
  const enterClicked = () => {
    let d = code;
    d.filter((single, i) => {
      code[i] = { title: code[i].title, url: url[i].url };
    });

    setStepperCode(`<Stepper
    list={${JSON.stringify(d)}}/>`);
    console.log(`<stepper
    list={${JSON.stringify(d)}}/>`);
    console.log(code,url,d)
  };
  useEffect(() => {
    let arr1 = [{ title: 'hello' }, { title: 'good night' }];
    let arr2 = [{ url: 'hi' }, { url: 'bye' }];
    arr1.filter((single, i) => {
      arr1[i] = { title: arr1[i].title, url: arr2[i].url };
    });
    console.log(arr1);
  }, []);
  return (
    <>
      <h1>hello this is stepper</h1>
      <h1>{JSON.stringify(inputValue)}</h1>
      <div>
        {[...Array(inputValue)].map((single, index) => {
          return (
            <div key={index + 2}>
              <input
                key={index}
                onChange={(e) => CodeChange(index, e.target.value)}
                className={`border-2 border-black`}
              />
              <input
                key={index + 1}
                onChange={(e) => CodeChange1(index, e.target.value)}
                className={`border-2 border-black`}
              />
            </div>
          );
        })}
      </div>
      <div className={`flex gap-4`}>
        <button onClick={plusButtonClicked} className={`text-3xl`}>
          plus{' '}
        </button>
        <button onClick={minusButtonClicked} className={`text-3xl`}>
          minus
        </button>
        <button className={`text-3xl`} onClick={enterClicked}>
          Enter
        </button>
      </div>
      <div>{stepperCode}</div>
    </>
  );
}
