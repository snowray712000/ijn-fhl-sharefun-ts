import { IReferenceTools } from "./IReferenceTools";

/**
 * 當時開發，是以 rcuv 和合本 2010 為基本開發的
 */

export class ReferenceOther implements IReferenceTools {
    private str: string;
    private isGb: 1 | undefined;
    constructor(str: string, isGb?: 1) {
        this.str = str;
        this.isGb = isGb;
    }
    isIncludeRef(): boolean {
        return this.str !== undefined && /#[^\|]+\|/.test(this.str); // #路1|
    }
    toStandard(): string {
        // 全型：、點(和合本2010)． ,,, 要換回標準 : 
        return this.str.replace(/(\d+)(?:．|：)(\d+)/g, (a1, a2, a3) => {
            return `${a2}:${a3}`;
        });
    }

}
