import { fetchArticles } from "./utils";

const core = require("@actions/core");

export async function run() {
  try {
    // Zennの記事一覧を取得
    const articles = await fetchArticles();
    console.log(articles);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

void run();
