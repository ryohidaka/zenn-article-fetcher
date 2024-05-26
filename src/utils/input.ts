import { parseDateFormat } from "./date";

const core = require("@actions/core");

/**
 * GitHub Actionsのinputの値を取得する
 * @returns
 */
export const getInputs = () => {
  const userId = core.getInput("user-id");
  const filePath = core.getInput("output");
  const template = core.getInput("template");
  const dateFormatRaw = core.getInput("date-format");
  const dateLocale = core.getInput("date-locale");
  const commitMessage = core.getInput("commit-message");

  const dateFormat = parseDateFormat(dateFormatRaw);

  return { userId, filePath, template, dateFormat, dateLocale, commitMessage };
};
