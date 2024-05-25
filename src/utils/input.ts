import { parseDateFormat } from "./date";

const core = require("@actions/core");

/**
 * GitHub Actionsのinputの値を取得する
 * @returns
 */
export const getInputs = () => {
  const userId = core.getInput("user-id");
  const template = core.getInput("template");
  const dateFormatRaw = core.getInput("date-format");
  const dateLocale = core.getInput("date-locale");

  const dateFormat = parseDateFormat(dateFormatRaw);

  return { userId, template, dateFormat, dateLocale };
};
