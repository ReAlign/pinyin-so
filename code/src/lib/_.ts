import { IF_OBJ_STRING } from 'types/types';

const _ = {
  formatArgs(targetStr: string = '', keyword: string = ''): IF_OBJ_STRING {
    const _targetStr = targetStr.toLowerCase();
    const _keyword = keyword.replace(/\s+/g, '').toLowerCase();

    return {
      _targetStr,
      _keyword,
    };
  },
};

export default _;
