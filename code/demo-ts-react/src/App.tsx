import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import PinyinSo from 'pinyin-so';

type TYPE_RES = [number, number] | boolean;

function App() {
  const s1: string = '疏影横斜水清浅，暗香浮动月黄昏';
  const blankStr: string = '<span class="u-blank">[无查询]</span>';
  const [result, setResult] = useState(blankStr);

  const renderStr = (str: string, x: number, y: number): string => {
    const _r = `<b class="u-search-result">${str.substring(
      x,
      y + 1,
    )}</b>`;
    return `${str.substr(0, x)}${_r}${str.substr(y + 1)}`;
  };

  const inputEvt = (x: any) => {
    const tx = x.target.value || '';
    if(tx.trim()) {
      const res: TYPE_RES = PinyinSo.so(s1, x.target.value);
      if(Array.isArray(res)) {
        setResult(`${renderStr(s1, res[0], res[1])}`);
      } else if(typeof res === 'boolean') {
        setResult(s1);
      }
    } else {
      setResult(blankStr);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <article>
          {s1}
          <hr/>
          <div dangerouslySetInnerHTML={{__html: result}}></div>
          <input
            className="u-input"
            type="search"
            placeholder="全拼、简拼、同音字"
            onInput={inputEvt}
          />
        </article>
      </header>
    </div>
  );
}

export default App;
