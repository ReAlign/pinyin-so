const _ = {
  formatArgs(targetStr = '', keyword = '') {
    const _targetStr = targetStr.toLowerCase();
    const _keyword = keyword.replace(/\s+/g, '').toLowerCase();

    return {
      _targetStr,
      _keyword,
    };
  },
};
export default _;
