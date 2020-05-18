<template>
  <div class="m-pinyin">
    <p>{{str}}</p>
    <input type="search" @input="inputEvt" />
    <p v-html="result"></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PinyinSo from 'pinyin-so';
type TYPE_RES = [number, number] | boolean;

@Component
export default class Home extends Vue {
  private str: string = '疏影横斜水清浅，暗香浮动月黄昏。';
  private blankStr: string = '<span class="u-blank">[无查询]</span>';
  private result: string = this.blankStr;
  private renderStr(str: string, x: number, y: number): string {
    const _r = `<b class="u-search-result">${str.substring(
      x,
      y + 1,
    )}</b>`;
    return `${str.substr(0, x)}${_r}${str.substr(y + 1)}`;
  }
  private inputEvt(evt: any) {
    const tx = evt.target.value || '';
    if (tx.trim()) {
      const res: TYPE_RES = PinyinSo.so(this.str, tx);
      if (Array.isArray(res)) {
        this.result = `${this.renderStr(this.str, res[0], res[1])}`;
      } else if (typeof res === 'boolean') {
        this.result = this.str;
      }
    } else {
      this.result = this.blankStr;
    }
  }
}
</script>

<style lang="stylus">
.u-search-result {
  color: red;
}
</style>
