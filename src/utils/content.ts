import { ZennArticle } from "zenn-rss/dist/types";
import { MARKER } from "../constants";
import { getInputs } from "./input";
import { formatDateTime } from ".";
import { fetchZennArticles } from "zenn-rss";

/**
 * ZennのRSSフィードから記事一覧を取得する
 * @returns {Promise<ZennArticle[]>} Zennの記事の配列を返すPromise
 */
export const fetchArticles = async (): Promise<ZennArticle[]> => {
  // ユーザーIDを取得
  const { userId } = getInputs();
  // Zennの記事一覧を取得
  const articles = await fetchZennArticles(userId);

  // 取得した記事を返す
  return articles;
};

/**
 * Zenn 記事のリストを元に挿入するテキストを生成する
 *
 * @param items - 記事を表す ZennArticle オブジェクトの配列
 * @returns 指定された記事の挿入テキストを含む文字列
 */
export const generateInsertText = (items: ZennArticle[]): string => {
  // ユーザー入力からテンプレート、日付フォーマット、および日付ロケールを取得
  const { template, dateFormat, dateLocale } = getInputs();

  // 各記事に対して挿入テキストを生成します
  const insertText = items
    .map((item) => {
      // ISO 日付を指定された日付フォーマットとロケールでフォーマット
      const date = formatDateTime(item.isoDate, dateFormat, dateLocale);

      // テンプレート内のプレースホルダーを記事情報で置換
      return template
        .replaceAll("%CREATOR%", item.creator)
        .replaceAll("%TITLE%", item.title)
        .replaceAll("%LINK%", item.link)
        .replaceAll("%DATE%", date);
    })
    .join("\n");

  return insertText;
};

/**
 * ファイルの内容に指定されたテキストを挿入
 * @param data 元のファイルの内容
 * @param insertText 挿入するテキスト
 * @returns テキストが挿入された新しいファイルの内容。失敗した場合は null を返す。
 */
export const modifyContent = (
  data: string,
  insertText: string,
): string | null => {
  const { start, end } = MARKER;

  const startIndex = data.indexOf(start);
  const endIndex = data.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    console.error("マーカーが見つからないか、順序が正しくありません。");
    return null;
  }

  const beforeText = data.slice(0, startIndex + start.length);
  const afterText = data.slice(endIndex);

  return `${beforeText}\n${insertText}\n${afterText}`;
};
