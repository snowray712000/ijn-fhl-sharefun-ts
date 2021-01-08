import { isIncludeReference, toStandardReference } from './ncv';
import { ReferenceNcv } from './ReferenceNcv';
test('ncv reference is included', () => {
  expect(isIncludeReference('林前11 要用合適的態度吃主的聖餐（太26:26~28；可14:22~24；路22:17~20）')).toBe(true);
  expect(isIncludeReference('林前11 要用合適的態度吃主的聖餐')).toBe(false);
  expect(isIncludeReference('約18 彼拉多判耶穌釘十字架（太27:20~23、27~31；可15:6~11、16~20；路23:4、13~19）')).toBe(
    true,
  );
  expect(isIncludeReference('徒 9 掃羅悔改歸主（徒22:3~16，26:9~18）')).toBe(true);
});
test('ncv reference to standard', () => {
  expect(toStandardReference('林前11 要用合適的態度吃主的聖餐（太26:26~28；可14:22~24；路22:17~20）')).toBe(
    '林前11 要用合適的態度吃主的聖餐（#太26:26-28;可14:22-24;路22:17-20|）',
  );
  expect(toStandardReference('林前11 要用合適的態度吃主的聖餐')).toBe('林前11 要用合適的態度吃主的聖餐');
  expect(toStandardReference('約18 彼拉多判耶穌釘十字架（太27:20~23、27~31；可15:6~11、16~20；路23:4、13~19）')).toBe(
    '約18 彼拉多判耶穌釘十字架（#太27:20-23,27-31;可15:6-11,16-20;路23:4,13-19|）',
  );
  expect(toStandardReference('徒 9 掃羅悔改歸主（徒22:3~16，26:9~18）')).toBe(
    '徒 9 掃羅悔改歸主（#徒22:3-16;26:9-18|）',
  );
});
test('ncv reference 多處', () => {
  expect(
    isIncludeReference('林前11 要用（太26:26~28；可14:22~24；路22:17~20）兩處（太26:26~28；可14:22~24；路22:17~20）'),
  ).toBe(true);
  expect(
    toStandardReference('林前11 要用（太26:26~28；可14:22~24；路22:17~20）兩處（太26:26~28；可14:22~24；路22:17~20）'),
  ).toBe('林前11 要用（#太26:26-28;可14:22-24;路22:17-20|）兩處（#太26:26-28;可14:22-24;路22:17-20|）');
});
