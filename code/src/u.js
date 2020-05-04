import Config from './config';

const U = {
  cache: {},
  wordDuyinsMap: Config.word2Duyins,
};
U.getPinyin = (cn = '') => {
  const result = [];
  const len = cn.length;
  for (let i = 0; i < len; i++) {
    let temp = cn.charAt(i);
    result.push(U.wordDuyinsMap[temp] || temp);
  }
  return result;
};
// 对输入拼音进行切分
U.wordBreak = (s = '') => {
  const result = [];
  const solutions = [];
  const len = s.length;
  const possible = [];
  for (let i = 0; i <= len; i++) {
    possible.push(true);
  }
  U.getAllSolutions(0, s, result, solutions, possible);
  return solutions;
};
U.getAllSolutions = (start, s, result = [], solutions = [], possible = []) => {
  if (start === s.length) {
    solutions.push(result.join(' '))
    return
  }
  for (let i = start; i < s.length; i++) {
    let piece = s.substring(start, i + 1)
    let match = false
    // 最后一个音特殊处理，不需要全部打完整
    if (Config.duyins.some(i => i.indexOf(piece) === 0) && !s[i + 1] && possible[i + 1]) {
      if (piece.length === 1) {
        result.push(piece)
      } else {
        let sx = [];
        Config.duyins.forEach(i => {
          if (i.indexOf(piece) === 0) {
            sx.push(i)
          }
        })
        result.push(sx)
      }
      match = true
    } else {
      if (Config.duyins.indexOf(piece) !== -1 && possible[i + 1]) {
        result.push(piece)
        match = true
      }
    }
    if (match) {
      let beforeChange = solutions.length
      U.getAllSolutions(i + 1, s, result, solutions, possible)
      if (solutions.length === beforeChange) {
        possible[i + 1] = false
      }
      result.pop()
    }
  }
};
// 获取输入拼音的所有组合（切分 + 首字母）
U.getFullKey = (key = '') => {
  let result = [];
  U.wordBreak(key).forEach((i = '') => {
    let item = i.split(' ')
    let last = item.length - 1
    if (item[last].indexOf(',')) {
      let keys = item[last].split(',')
      keys.forEach(j => {
        item.splice(last, 1, j)
        result.push(JSON.parse(JSON.stringify(item)))
      })
    } else {
      result.push(item)
    }
  })
  if (result.length === 0 || (result[0].length !== key.length)) {
    result.push(key.split(''))
  }
  // 缓存当前结果 避免重复计算
  U.cache = { [key]: result }
  return result
};
U.point2point = (test = '', key = '', last, extend) => {
  if (!test) return false
  let a = test.split(' ')
  a.forEach(i => {
    if (i.length > 0 && extend) {
      a.push(i.charAt(0))
    }
  })
  if (!last) {
    return a.indexOf(key) !== -1
  }
  return a.some((i) => i.indexOf(key) === 0)
};
U.getIndex = (py = '', fullString = [], keys = '') => {
  for (let p = 0; p < py.length; p++) {
    for (let k = 0; k < fullString.length; k++) {
      let key = fullString[k]
      let keyLength = key.length
      let extend = (keyLength === keys.length)
      let isMatch = true
      let i = 0
      let preSpaceNum = 0
      let spaceNum = 0
      if (keyLength <= py.length) {
        for (; i < key.length; i++) {
          if (i === 0 && py[p + i + preSpaceNum] === ' ') {
            preSpaceNum += 1
            i -= 1
          } else {
            if (py[p + i + spaceNum] === ' ') {
              spaceNum += 1
              i -= 1
            } else {
              if (!U.point2point(py[p + i + spaceNum], key[i], (py[p + i + 1] && key[i + 1]) ? false : true, extend)) {
                isMatch = false
                break
              }
            }
          }
        }
        if (isMatch) {
          return [p + preSpaceNum, spaceNum + p + i - 1]
        }
      }
    }
  }
  return false
};

U.match = (input = '', keys = '') => {
  input = input.toLowerCase()
  keys = keys.replace(/\s+/g, '').toLowerCase()
  let indexOf = input.indexOf(keys)
  if (indexOf !== -1) {
    return [indexOf, indexOf + keys.length - 1]
  }
  // 原文匹配(带空格)
  let noPyIndex = U.getIndex(input.split(''), [keys.split('')], keys)
  if (noPyIndex) return noPyIndex
  // pinyin匹配
  let py = U.getPinyin(input)
  let fullString = U.cache[keys] || U.getFullKey(keys)
  return U.getIndex(py, fullString, keys)
};

export default U;
