import { Box } from "@chakra-ui/react";
import { Resizable } from "re-resizable";
import { IconType } from "react-icons";

import { AiFillCheckCircle } from "react-icons/ai";
import { AppLogo } from "../common/AppLogo";
import { HeaderContainer } from "../common/HeaderContainer";
import { ProfileIcon } from "./ProfileIcon";
import { NavItem } from "./SideBarItem";
import { HEADER_CONTAINER_HEIGHT } from "@/theme/constants";
import { ReactElement } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = new Array(30).fill({
  name: `abc `,
  icon: AiFillCheckCircle,
});
const ContentRemainingSize = (
  header: string,
  contentMax?: string = "100vh",
  footer?: string = "0rem"
) => {
  contentHeight = `calc('')`;
};
const SidebarContent = ({ ...rest }) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      w={"100%"}
      {...rest}
      overflow={"hidden"}
    >
      <Box>
        <HeaderContainer headerHeight={HEADER_CONTAINER_HEIGHT}>
          <AppLogo />
          <ProfileIcon />
        </HeaderContainer>
      </Box>
      <Box h={`calc(100vh - ${HEADER_CONTAINER_HEIGHT})`} overflow="scroll">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

const MAX_SIDEBAR_WIDTH: string = "800px";
const MIN_SIDEBAR_WIDTH: string = "300px";

export const SideBar = () => {
  return (
    <Box position="relative">
      <Resizable
        defaultSize={{
          //TODO: Improve UX by adding value in LocalStorage
          width: 400,
          height: "100dvh",
        }}
        maxWidth={MAX_SIDEBAR_WIDTH}
        minWidth={MIN_SIDEBAR_WIDTH}
      >
        <SidebarContent />
      </Resizable>
    </Box>
  );
};
