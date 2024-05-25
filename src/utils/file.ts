import fs from "fs";

import { getInputs, modifyContent } from ".";

/**
 * 指定されたパスのファイルを読み込みます。
 * @param path 読み込むファイルのパス
 * @returns 読み込まれたファイルの内容。失敗した場合は null を返します。
 */
const readFile = (path: string): string | null => {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (err) {
    console.error("ファイルの読み込みに失敗しました:", err);
    return null;
  }
};

/**
 * 指定された内容をファイルに保存します。
 * @param path 保存先のファイルのパス
 * @param content 保存する内容
 */
const saveToFile = (path: string, content: string) => {
  fs.writeFile(path, content, "utf8", (err: any) => {
    if (err) {
      console.error("ファイルの書き込みに失敗しました:", err);
    } else {
      console.log("ファイルが正常に更新されました。");
    }
  });
};

/**
 * 指定されたファイルの内容を読み込み、指定されたテキストを挿入して保存します。
 * @param insertText 挿入するテキスト
 */
export const readFileAndModify = (insertText: string) => {
  const { filePath } = getInputs();
  const data = readFile(filePath);
  if (!data) return;

  const modifiedContent = modifyContent(data, insertText);
  if (!modifiedContent) return;

  saveToFile(filePath, modifiedContent);
};
