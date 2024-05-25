import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchArticles } from "../../src/utils";
import { fetchZennArticles } from "zenn-rss";

// fetchZennArticles()関数のモック
vi.mock("zenn-rss", () => ({
  fetchZennArticles: vi
    .fn()
    .mockResolvedValue([
      { title: "Mock Article 1" },
      { title: "Mock Article 2" },
    ]),
}));

describe("fetchArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // 各テストの前にモックの呼び出しをクリアする
  });

  it("記事一覧が正常に取得できること", async () => {
    // getInputs()関数のモックを設定 (ここでは具体的な値を返す必要がある場合にモックする)
    vi.mock("./getInputs", () => ({
      getInputs: vi.fn().mockReturnValue({ userId: "mockUserId" }),
    }));

    // fetchArticles()を呼び出す
    const result = await fetchArticles();

    // 正しい記事が返されることを確認
    expect(result).toEqual([
      { title: "Mock Article 1" },
      { title: "Mock Article 2" },
    ]);

    // fetchZennArticles()が正しく呼び出されたことを確認
    expect(fetchZennArticles).toHaveBeenCalled();
  });
});
