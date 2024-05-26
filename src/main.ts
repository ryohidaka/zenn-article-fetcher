import {
  commitAndPush,
  fetchArticles,
  generateInsertText,
  readFileAndModify,
} from "./utils";

const core = require("@actions/core");

export async function run() {
  try {
    // Zennの記事一覧を取得
    const articles = await fetchArticles();

    // マークダウンに挿入するテキストを生成
    const insertText = generateInsertText(articles);

    // 生成したテキストをマークダウンに挿入する
    readFileAndModify(insertText);

    // 変更をコミットする
    commitAndPush();
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

void run();
