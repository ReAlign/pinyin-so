import { IF_OBJ_UTIL } from 'types/types';
import Config from './config';

const X: IF_OBJ_UTIL = {
  cache: {},
  wordDuyinsMap: Config.word2Duyins,
  getPinyin(cn = '') {
    const result = [];
    const len = cn.length;
    for (let i = 0; i < len; i++) {
      const temp = cn.charAt(i);
      result.push(X.wordDuyinsMap[temp] || temp);
    }
    return result;
  },
  // 对输入拼音进行切分
  wordBreak(s = '') {
    const result = [] as any;
    const solutions = [] as any;
    const len = s.length;
    const possible = [];
    for (let i = 0; i <= len; i++) {
      possible.push(true);
    }
    X.getAllSolutions(0, s, result, solutions, possible);
    return solutions;
  },
  getAllSolutions(start = 0, s = '', result = [], solutions = [], possible = []) {
    if (start === s.length) {
      solutions.push(result.join(' '));
    } else {
      for (let i = start; i < s.length; i++) {
        const piece = s.substring(start, i + 1);
        let match = false;
        // 最后一个音特殊处理，不需要全部打完整
        if (Config.duyins.some((item) => item.indexOf(piece) === 0) && !s[i + 1] && possible[i + 1]) {
          if (piece.length === 1) {
            result.push(piece);
          } else {
            const sx = [] as any;
            Config.duyins.forEach((_i) => {
              if (_i.indexOf(piece) === 0) {
                sx.push(_i);
              }
            });
            result.push(sx);
          }
          match = true;
        } else {
          if (Config.duyins.indexOf(piece) !== -1 && possible[i + 1]) {
            result.push(piece);
            match = true;
          }
        }
        if (match) {
          const beforeChange = solutions.length;
          X.getAllSolutions(i + 1, s, result, solutions, possible);
          if (solutions.length === beforeChange) {
            possible[i + 1] = false;
          }
          result.pop();
        }
      }
    }
  },
  // 获取输入拼音的所有组合（切分 + 首字母）
  getFullKey(key = '') {
    const result = [] as any;
    X.wordBreak(key).forEach((i = '') => {
      const item = i.split(' ');
      const last = item.length - 1;
      if (item[last].indexOf(',')) {
        const keyword = item[last].split(',');
        keyword.forEach((j) => {
          item.splice(last, 1, j);
          result.push(JSON.parse(JSON.stringify(item)));
        });
      } else {
        result.push(item);
      }
    });
    if (result.length === 0 || (result[0].length !== key.length)) {
      result.push(key.split(''));
    }
    // 缓存当前结果 避免重复计算
    X.cache = { [key]: result };
    return result;
  },
  point2point(test = '', key = '', last = false, extend = false) {
    if (!test) return false;
    const a = test.split(' ');
    a.forEach((i) => {
      if (i.length > 0 && extend) {
        a.push(i.charAt(0));
      }
    });
    if (!last) {
      return a.indexOf(key) !== -1;
    }
    return a.some((i) => i.indexOf(key) === 0);
  },
  getIndex(py = [], fullString = [], keyword = '') {
    for (let p = 0; p < py.length; p++) {
      for (const key of fullString) {
        const keyLength = key.length;
        const extend = (keyLength === keyword.length);
        let isMatch = true;
        let i = 0;
        let preSpaceNum = 0;
        let spaceNum = 0;
        if (keyLength <= py.length) {
          for (; i < key.length; i++) {
            if (i === 0 && py[p + i + preSpaceNum] === ' ') {
              preSpaceNum += 1;
              i -= 1;
            } else {
              if (py[p + i + spaceNum] === ' ') {
                spaceNum += 1;
                i -= 1;
              } else {
                if (!X.point2point(py[p + i + spaceNum], key[i], (py[p + i + 1] && key[i + 1]) ? false : true, extend)) {
                  isMatch = false;
                  break;
                }
              }
            }
          }
          if (isMatch) {
            return [p + preSpaceNum, spaceNum + p + i - 1];
          }
        }
      }
    }
    return false;
  },
};

export default X;
