import { IF_OBJ_MATCH } from 'types/types';
import Util from './util';
import _ from './_';

const Match: IF_OBJ_MATCH = {
  match(targetStr = '', keyword = '') {
    const {
      _targetStr = '',
      _keyword = '',
    } = _.formatArgs(targetStr, keyword);

    // ① 全字匹配
    const indexFull = _targetStr.indexOf(_keyword);

    if (indexFull !== -1) {
      // 匹配到，返回起始位置
      return [indexFull, indexFull + _keyword.length - 1];
    } else {
      // ② 原文匹配 <带空格>
      const _inputAtoms = _targetStr.split('');
      const _keysAtoms = [_keyword.split('')];
      const indexKeyItem = Util.getIndex(_inputAtoms, _keysAtoms, _keyword);

      if (indexKeyItem) {
        return indexKeyItem;
      } else {
        // ③ 被搜文字转成拼音匹配
        const py = Util.getPinyin(_targetStr);
        const fullString = Util.cache[_keyword] || Util.getFullKey(_keyword);

        const indexPY = Util.getIndex(py, fullString, _keyword);
        if (indexPY) {
          return indexPY;
        } else {
          // ④ 关键词也转成拼音匹配
          // 此处会有问题：【数】
          // 通过 getPinyin 拿到的是 ['shu shuo']
          // join 之后，关键词会变成双音节
          const _keys2 = Util.getPinyin(_keyword).join('');
          const fullString2 = Util.cache[_keys2] || Util.getFullKey(_keys2);
          const indexPY2 = Util.getIndex(py, fullString2, _keys2);

          return indexPY2;
        }
      }
    }
  },
};

export default Match;
