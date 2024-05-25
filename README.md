# Zenn Article Fetcher

[![release](https://badgen.net/github/release/ryohidaka/zenn-article-fetcher)](https://github.com/ryohidaka/zenn-article-fetcher/releases/)
![build](https://github.com/ryohidaka/zenn-article-fetcher/workflows/Build/badge.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview (概要)

Fetch articles from Zenn and output to markdown.

Zenn の記事一覧を RSS から取得し、マークダウンファイルに出力する GitHub Action

## Usage 　　(使用方法)

```yml
uses: ryohidaka/zenn-article-fetcher@v1
with:
  user-id: "zenn"
  output: "README.md"
```

## Inputs

| input         | required | default               | description                                                                       |
| ------------- | -------- | --------------------- | --------------------------------------------------------------------------------- |
| `user-id`     | ✔       |                       | Zenn のユーザ ID (https://zenn.dev/{user-id}/feed)                                |
| `output`      | ✔       |                       | 記事一覧を出力するマークダウンファイルのパス                                      |
| `template`    |          |                       | マークダウンに出力する際の出力形式 ([Template](#template)を参照)                  |
| `date-format` |          | `- [%TITLE%](%LINK%)` | 日付を出力する際のフォーマット ([TEMPO](https://tempo.formkit.com/#format)を参照) |
| `date-locale` |          | `zh`                  | 日付を出力する際のロケール設定 ([TEMPO](https://tempo.formkit.com/#format)を参照) |

## Template

- マークダウン形式で記載する
- 以下に記載したプレースホルダーが使用できます。

###　プレースホルダー一覧

| placeholder | source          | example                          | description  |
| ----------- | --------------- | -------------------------------- | ------------ |
| `%TITLE%`   | article.title   | `サンプルタイトル`               | 記事タイトル |
| `%LINK%`    | article.link    | `https://zenn.dev/{user}/{slug}` | 記事 URL     |
| `%DATE%`    | article.isodate | `2023/5/27`                      | 公開日時     |
| `%CREATOR%` | article.creator | `サンプル名前`                   | 著者名       |

## Link

- [Zenn](https://zenn.dev/)
- [TEMPO](https://tempo.formkit.com/#format)
- [zenn-rss](https://www.npmjs.com/package/zenn-rss)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
