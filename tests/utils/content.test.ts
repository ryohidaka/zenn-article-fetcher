import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchArticles,
  generateInsertText,
  modifyContent,
} from "../../src/utils";
import { fetchZennArticles } from "zenn-rss";
import { ZennArticle } from "zenn-rss/dist/types";

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

describe("generateInsertText", () => {
  it("正しい挿入テキストが生成されること", () => {
    // getInputs()関数のモックを設定 (ここでは具体的な値を返す必要がある場合にモックする)
    vi.mock("../../src/utils/input.ts", () => ({
      getInputs: vi.fn().mockReturnValue({
        template: "New article by %CREATOR%: %TITLE% (%LINK%) - %DATE%",
        dateLocale: "en-US",
      }),
    }));

    // テスト用のダミー記事データを作成します
    const articles: ZennArticle[] = [
      {
        creator: "John Doe",
        title: "Test Article 1",
        link: "https://example.com/article1",
        isoDate: "2024-05-25T12:00:00Z",
        pubDate: "",
        enclosure: {},
        "dc:creator": "",
        content: "",
        contentSnippet: "",
        guid: "",
      },
      {
        creator: "Jane Smith",
        title: "Test Article 2",
        link: "https://example.com/article2",
        isoDate: "2024-05-26T09:30:00Z",
        pubDate: "",
        enclosure: {},
        "dc:creator": "",
        content: "",
        contentSnippet: "",
        guid: "",
      },
    ];

    // 関数を呼び出して挿入テキストを生成します
    const result = generateInsertText(articles);

    // 期待される出力を定義します
    const expectedOutput = `New article by John Doe: Test Article 1 (https://example.com/article1) - May 25, 2024
New article by Jane Smith: Test Article 2 (https://example.com/article2) - May 26, 2024`;

    // 出力が期待される出力と一致することを確認します
    expect(result).toBe(expectedOutput);
  });
});

describe("modifyContent function", () => {
  it("正しいデータが渡された場合、挿入が成功すること", () => {
    const data = `
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      <!-- [ZennArticles:START] -->
      <!-- [ZennArticles:END] -->
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    `;
    const insertText = "Inserted Text";
    const expectedOutput = `
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      <!-- [ZennArticles:START] -->
Inserted Text
<!-- [ZennArticles:END] -->
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    `;
    expect(modifyContent(data, insertText)).toEqual(expectedOutput);
  });

  it("マーカーが見つからない場合、nullが返されること", () => {
    const data = `
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    `;
    const insertText = "Inserted Text";
    expect(modifyContent(data, insertText)).toBeNull();
  });

  it("マーカーの順序が正しくない場合、nullが返されること", () => {
    const data = `
      Lorem ipsum dolor sit amet,
      <!-- END MARKER -->
      consectetur adipiscing elit.
      <!-- START MARKER -->
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    `;
    const insertText = "Inserted Text";
    expect(modifyContent(data, insertText)).toBeNull();
  });
});
