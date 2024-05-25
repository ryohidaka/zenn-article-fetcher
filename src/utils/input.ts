const core = require("@actions/core");

/**
 * GitHub Actionsのinputの値を取得する
 * @returns
 */
export const getInputs = () => {
  const userId = core.getInput("user-id");
  return { userId };
};
