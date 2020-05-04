# pinyin-so

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/pinyin-so.svg?longCache=true&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/pinyin-so

> 拼音搜索方案，支持全拼/简拼。

## Demo

[demo](https://realign.github.io/pinyin-so/code/demo)

## Usage

```js
import PinyinSo from 'pinyin-so';

/**
 * @name    PinyinSo.so
 * @param   {String}    targetStr   待搜索文本
 * @param   {String}    keyword     搜索关键词
 * @returns {Boolean | Array}       失败结果 或者 结果索引
*/
const res = PinyinSo.so(`${targetStr}`, `${keyword}`);
if(res) {
    const [start, end] = res;
} else {
    console.log('No matching results.');
}
```

## 参考

[xmflswood/pinyin-match](https://github.com/xmflswood/pinyin-match)
