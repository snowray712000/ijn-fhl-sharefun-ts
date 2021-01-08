
import { ReferenceNcv } from "./ReferenceNcv";

export function isIncludeReference(str: string, isGb?: 1) {
    return new ReferenceNcv(str, isGb).isIncludeRef();
}
export function toStandardReference(str: string, isGb?: 1) {
    return new ReferenceNcv(str, isGb).toStandard();
}

