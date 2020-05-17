const fs = require('fs');
const path = require('path');

const replaceBlank = (str) => {
  const regEx = /(&nbsp;)+/g;
  return str.replace(regEx, '_');
};
const getArr = (str) => {
  return str.split('<br>');
};
const handleDYAsArr = (arr) => {
  const obj = {};
  let key = '';
  arr.forEach(item => {
    const _a = item.split('_');
    const _len = _a.length;
    if(_len === 2) {
      if(_a[0]) {
        key = _a[0];
        obj[key] = _a[1];
      } else {
        obj[key] += _a[1];
      }
    } else if(_len === 1) {
      if(key) {
        obj[key] += _a[0];
      }
    }
  });

  return obj;
};

fs.readFile('x.txt', 'utf-8', function (error, data) {
  if (error) {
    return console.log('读取文件失败,内容是' + error.message);
  }

  console.log('读取文件成功!');
  const xNoBlank = replaceBlank(data);
  const xx = getArr(xNoBlank);
  const xxx = handleDYAsArr(xx);

  fs.writeFile('x-one-line.json', JSON.stringify(xxx, null, 2), () => {
    if (error) {
      return console.log('写文件失败');
    }

    console.log('写文件成功!');
  });
});
