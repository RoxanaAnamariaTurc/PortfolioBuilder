import { MyTheme } from "../theme";

import { useTheme as originalUseTheme } from "@emotion/react";

export function useTheme(): MyTheme {
  return originalUseTheme() as MyTheme;
}
