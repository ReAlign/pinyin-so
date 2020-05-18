import { IF_MAPS } from 'types/types';
import { maps } from 'res/dictionary.json';

const x = {
  getDuyin2Words(oriMap: IF_MAPS = {}): IF_MAPS {
    return oriMap;
  },
  getWord2Duyins(oriMap: IF_MAPS = {}): IF_MAPS {
    const res: IF_MAPS = {};

    Object.keys(oriMap).forEach((k) => {
      const item = oriMap[k];
      const len = item.length;
      for (let i = 0; i < len; i++) {
        if (!res[item[i]]) {
          res[item[i]] = `${k}`;
        } else {
          res[item[i]] = `${res[item[i]]} ${k}`;
        }
      }
    });

    return res;
  },
};

const config = {
  // 所有读音 list
  duyins: Object.keys(x.getDuyin2Words(maps)),
  // 文字对应的多个读音 map
  word2Duyins: x.getWord2Duyins(maps),
};

export default config;
