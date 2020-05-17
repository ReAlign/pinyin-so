<script>
  import './style/global.css';
  import './style/App.css';

  import PinyinSo from './../../../dist/pinyin-so.esm.min.js';
  // import PinyinSo from 'pinyin-so';

  const no = '<span style="color: #aaa;">[无查询]</span>';
  const oriStr = '疏影横斜水清浅，暗香浮动月黄昏。';

  let name = '';
  let nameNew = no;

  const renderStr = (str, x, y) => {
    const _r = `<span class="u-search-result">${str.substring(
      x,
      y + 1,
    )}</span>`;
    return `${str.substr(0, x)}${_r}${str.substr(y + 1)}`;
  };

  const inputEvt = () => {
    let x = '';
    const p = PinyinSo.so(oriStr, name.trim());

    if (p) {
      const [start, end] = p;
      x = renderStr(oriStr, start, end);
    }
    nameNew = name.trim() === '' ? no : x || oriStr;
  };
</script>

<style>
</style>

<main class="m-app-main">
  <h1>PinyinSo | 拼音搜</h1>
  <div class="m-pys-run">
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="search"
      bind:value={name}
      on:input={inputEvt}
      placeholder="试试：全拼、简拼、同音字"
      autofocus />
    <p>
      {@html oriStr}
    </p>
    <hr />
    <p>
      {@html nameNew}
    </p>
  </div>
  <div class="m-footer">
    <iframe
      src="https://ghbtns.com/github-btn.html?user=ReAlign&repo=pinyin-so&type=star&count=true&size=large"
      frameborder="0"
      scrolling="0"
      width="170"
      height="30"
      title="Star ReAlign/pinyin-so on GitHub" />
    <iframe
      src="https://ghbtns.com/github-btn.html?user=ReAlign&repo=pinyin-so&type=watch&count=true&size=large&v=2"
      frameborder="0"
      scrolling="0"
      width="170"
      height="30"
      title="Watch ReAlign/pinyin-so on GitHub" />
    <iframe
      src="https://ghbtns.com/github-btn.html?user=ReAlign&repo=pinyin-so&type=fork&count=true&size=large"
      frameborder="0"
      scrolling="0"
      width="170"
      height="30"
      title="Fork ReAlign/pinyin-so on GitHub" />
  </div>
</main>
