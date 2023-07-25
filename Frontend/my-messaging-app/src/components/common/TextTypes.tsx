import { FONT_SIZE } from "@/theme/constants";
import { Text } from "@chakra-ui/react";

export const Title = ({ children = "" }) =>
  children ? <Text fontSize={FONT_SIZE.popupHeading}>{children}</Text> : null;
