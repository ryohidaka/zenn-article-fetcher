import { Format, format } from "@formkit/tempo";

/**
 * JSON文字列を解析し、TEMPOのフォーマットオプション形式で返却する。
 * 入力が有効なJSONでない場合、文字列を返す。
 *
 * @param input - 解析する入力文字列。
 * @returns - TEMPOのフォーマットオプション
 */
export const parseDateFormat = (input: string): Format => {
  try {
    const parsed: Format = JSON.parse(input);
    return parsed;
  } catch (_e) {
    return input;
  }
};

/**
 * ZennのRSSフィードから取得したISO形式の日時文字列を、任意のフォーマットに変換して返却する
 *
 * @param isoDate - ZennのRSSフィードから取得したISO形式の日時文字列
 * @param dateFormat - TEMPOのフォーマットオプション
 * @param locale - TEMPOのロケールオプション
 * @returns
 */
export const formatDateTime = (
  isoDate: string,
  dateFormat: Format,
  locale?: string,
) => {
  return format(isoDate, dateFormat, locale);
};
