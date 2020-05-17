declare module 'pinyin-so' {
  declare namespace PinyinSo {
    export function so(targetStr: string, keyword: string): [number, number] | boolean;
  }

  export as namespace PinyinSo;

  export = PinyinSo;
}
