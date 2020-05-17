import { IF_PYS_OPTIONS } from 'types/types';

import match from '@/lib/match';

class PinyinSo {
  so: any;
  constructor(options: IF_PYS_OPTIONS = {}) {
    this.init(options);
    this.setMethods();
  }
  private init(options: IF_PYS_OPTIONS = {}) {
    console.log('options is: ', options);
  }
  private setMethods() {
    this.so = match.match;
  }
}

export default PinyinSo;
