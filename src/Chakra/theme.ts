import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

export const LIGHT_GREEN = "#25D366";
export const WHITE_BG = "whiteAlpha.200";

const config: ThemeConfig = {
  initialColorMode: "dark", // 'dark' | 'light'
  useSystemColorMode: false,
};

export const theme = extendTheme({ config });
