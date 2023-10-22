import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface HeaderContainerProps {
  children: React.ReactElement;
}
const HEADER_CONTAINER_HEIGHT = "4rem";
export const HeaderContainer = ({
  children,
  flexProps,
}: {
  children: ReactElement;
  flexProps?: FlexProps;
}) => (
  <Flex
    alignItems="center"
    padding="0.5rem 1rem"
    justifyContent={"space-between"}
    height={HEADER_CONTAINER_HEIGHT}
    borderBottomWidth="1px"
    {...{ flexProps }}
  >
    {children}
  </Flex>
);
