import { startCase } from "lodash";
export function normalizeUsername(username) {
  return startCase(username).replace(/\s/g, "");
}
