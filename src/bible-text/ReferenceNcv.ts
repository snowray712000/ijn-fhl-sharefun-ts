import { BookNameConstants } from "../bible-const/BookNameConstants";
import * as LQ from 'linq';
import { SplitStringByRegExp } from "../str/SplitStringByRegExp";
import { IReferenceTools } from "./IReferenceTools";

/**
 * 新譯本工具
 * （太26:26~28；可14:22~24；路22:17~20）
 * （太27:20~23、27~31；可15:6~11、16~20；路23:4、13~19）
 * （徒22:3~16，26:9~18）
 */
export class ReferenceNcv implements IReferenceTools {
    protected regResult?: { w: string; exec?: RegExpExecArray; }[];
    private str: string;
    private isGb: 1 | undefined;
    private static reg: RegExp;
    private static regGb: RegExp;
    constructor(str: string, isGb?: 1) {
        this.str = str;
        this.isGb = isGb;
    }
    isIncludeRef(): boolean {
        // var reg1 = new RegExp('（[徒太可路，:~；、0-9]+）','g');    
        var reg1 = this.generateRegExp();
        let r2 = new SplitStringByRegExp().main(this.str, reg1);
        this.regResult = r2;
        return r2.length !== 1;
    }
    private generateRegExp() {
        if (this.isGb !== 1) {
            if (ReferenceNcv.reg === undefined) { ReferenceNcv.reg = g(); }
            return ReferenceNcv.reg;
        } else {
            if (ReferenceNcv.regGb === undefined) { ReferenceNcv.regGb = g(1); }
            return ReferenceNcv.regGb;
        }

        function g(isGb?: 1) {
            let r1 = LQ.from(isGb !== 1 ? BookNameConstants.CHINESE_BOOK_ABBREVIATIONS : BookNameConstants.CHINESE_BOOK_ABBREVIATIONS_GB).toArray().join('');
            return new RegExp(`（[${r1}，:~；、0-9]+）`, 'g');
        }
    }

    toStandard(): string {
        if (this.regResult === undefined) {
            this.isIncludeRef();
        }

        let r2 = this.regResult!;
        if (r2.length === 1) {
            return this.str;
        }

        return LQ.from(r2).select(a1 => a1.exec === undefined ? a1.w : cvt(a1.w))
            .toArray().join('');

        function cvt(str: string): string {
            var r1 = str.replace(/；|，|~|、/g, (a1) => {
                if (a1 === '；') { return ';'; }
                if (a1 === '，') { return ';'; }
                if (a1 === '~') { return '-'; }
                if (a1 === '、') { return ','; }
                return a1;
            });

            let r2 = r1.split(/（|）/);
            return '（#' + r2[1] + '|）';
        }
    }
}
