/**
 * 要用 regexp 取得一字串所有出處，用這個很方便。
 */
export function matchGlobalWithCapture(reg: RegExp, str: string): RegExpExecArray[] {
  if (reg.global === false) {
    throw Error('matchGlobalWithCapture: 非 global 會無窮回圈');
  }

  const re: RegExpExecArray[] = [];
  let r1: RegExpExecArray | null;
  // tslint:disable-next-line: no-conditional-assignment
  while ((r1 = reg.exec(str)) !== null) {
    re.push(r1);
  }
  reg.lastIndex = 0; // 用完, 還原最初狀態 (最初是0,不是-1)
  return re;
}
