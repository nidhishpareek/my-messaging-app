import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export const HeaderContainer = ({
  children,
  flexProps,
  headerHeight = "4rem",
}: {
  children: ReactElement[];
  headerHeight: string;
  flexProps?: FlexProps;
}) => (
  <>
    <Flex
      padding="0.5rem 1rem"
      justifyContent={"space-between"}
      height={headerHeight}
      borderBottomWidth="1px"
      position="absolute"
      top="0"
      width="100%"
      {...flexProps}
    >
      {children}
    </Flex>
    <Box
      padding="0.5rem 1rem"
      justifyContent={"space-between"}
      height={headerHeight}
      borderBottomWidth="1px"
      {...flexProps}
    />
  </>
);
