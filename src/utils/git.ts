import { getInputs } from "./input";
const exec = require("@actions/exec");

/**
 * Gitのユーザー情報を設定します。
 */
const configureGitUser = async () => {
  await exec.exec("git", ["config", "--local", "user.name", "GitHub Actions"]);
  await exec.exec("git", [
    "config",
    "--local",
    "user.email",
    "actions@github.com",
  ]);
};

/**
 * ファイルをステージングエリアに追加します。
 */
const stageFile = async () => {
  const { filePath } = getInputs();
  await exec.exec("git", ["add", filePath]);
};

/**
 * ステージングエリアに変更があるかどうかをチェックします。
 * @returns {Promise<boolean>} 変更がある場合はtrue、ない場合はfalseを返します。
 */
const hasChanges = async (): Promise<boolean> => {
  try {
    const { filePath } = getInputs();
    let output = "";

    await exec.exec("git", ["status", "--short", filePath], {
      listeners: {
        stdout: (data: Buffer) => (output += data.toString()),
      },
    });

    return output.trim() !== "";
  } catch {
    return false;
  }
};

/**
 * 変更をコミットします。
 */
const commitChanges = async () => {
  const { commitMessage } = getInputs();
  await exec.exec("git", ["commit", "-m", commitMessage, "-n"]);
};

/**
 * リモートリポジトリに変更をプッシュします。
 */
const pushChanges = async () => {
  await exec.exec("git", ["push"]);
};

/**
 * 変更をコミットし、リモートリポジトリにプッシュします。
 * 変更がない場合は「No changes to commit」を出力します。
 */
export const commitAndPush = async () => {
  try {
    await configureGitUser();

    // 差分がない場合
    if (!(await hasChanges())) {
      console.log("No changes to commit");
      return;
    }

    await stageFile();
    await commitChanges();
    await pushChanges();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};
