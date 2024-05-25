import { ZennArticle } from "zenn-rss/dist/types";
import { getInputs } from "./input";
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
