interface IN_CACHE {
  [propName: string]: [];
}

type IN_TYPE_NUMaARR_or_BOOL = [number, number] | boolean;

export interface IF_OBJ_MATCH {
  match(targetStr: string, keyword: string): IN_TYPE_NUMaARR_or_BOOL;
}

export interface IF_OBJ_STRING {
  [propName: string]: string;
}

export interface IF_OBJ_UTIL {
  cache: IN_CACHE;
  wordDuyinsMap: IF_OBJ_STRING;
  getPinyin(cn: string): string[];
  wordBreak(s: string): string[];
  getAllSolutions(start: number, s: string, result: string[], solutions: string[], possible: boolean[]): void;
  getFullKey(key: string): string[];
  point2point(test: string, key: string, last: boolean, extend: boolean): boolean;
  getIndex(py: string[], fullString: string[][], keyword: string): IN_TYPE_NUMaARR_or_BOOL;
}

export interface IF_MAIN {
  so(targetStr: string, keyword: string): IN_TYPE_NUMaARR_or_BOOL;
}

export interface IF_PYS_OPTIONS {
  [propName: string]: any;
}
