import { fetchArticles, generateInsertText } from "./utils";

const core = require("@actions/core");

export async function run() {
  try {
    // Zennの記事一覧を取得
    const articles = await fetchArticles();

    // マークダウンに挿入するテキストを生成
    const insertText = generateInsertText(articles);
    console.log(insertText);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

void run();
