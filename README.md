# pinyin-so

⚠️⚠️⚠️ 目前为非稳定版本

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/pinyin-so.svg?longCache=true&style=for-the-badge
[npm-url]: https://www.npmjs.com/package/pinyin-so

> 拼音搜索方案，支持 全拼/简拼/同音字 等。

![image/normal/2020-05-18/img-1589737460574-6747.png](https://public-bucket-realign.nos-eastchina1.126.net/image/normal/2020-05-18/img-1589737460574-6747.png)

## Demo

> by some framework as:

* [svelte-js-app](https://realign.github.io/pinyin-so/code/demo-svelte/build)
* [react-ts-app](https://realign.github.io/pinyin-so/code/demo-ts-react/build)
* [vue-ts-app](https://realign.github.io/pinyin-so/code/demo-ts-vue/build)

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

## 待办

* [ ] 优化代码
* [ ] 发新版

## 参考|感谢

* [xmflswood/pinyin-match](https://github.com/xmflswood/pinyin-match)
