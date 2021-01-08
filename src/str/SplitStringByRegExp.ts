import { matchGlobalWithCapture } from "./matchGlobalWithCapture";

/** ver1版很好用, 用的時候發現, 每次用之後, 還要判斷哪個字串是符合regex的, 這樣等於多判斷一次. */
export class SplitStringByRegExp {
    main(str: string, reg: RegExp): { w: string; exec?: RegExpExecArray }[] {
      const r1 = matchGlobalWithCapture(reg, str);
      // let isStartFromFirstChar = true;
      const data: { w: string; exec?: RegExpExecArray }[] = [];
  
      if (r1.length === 0) {
        data.push({ w: str });
      } else {
        if (r1[0].index > 0) {
          const w = str.substr(0, r1[0].index);
          data.push({ w });
        }
  
        for (let i = 0; i < r1.length; i++) {
          const it = r1[i];
          const len = it[0].length;
          data.push({ w: it[0], exec: it });
  
          // tslint:disable-next-line: max-line-length
          const w = (i !== r1.length - 1) ? str.substr(it.index + len, r1[i + 1].index - it.index - len) : str.substr(it.index + len, str.length - it.index - len);
          if (w.length !== 0) {
            data.push({ w });
          }
        }
      }
      return data;
    }
  }
  