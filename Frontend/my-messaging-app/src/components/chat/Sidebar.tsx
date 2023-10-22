import { Box } from "@chakra-ui/react";
import { Resizable } from "re-resizable";
import { IconType } from "react-icons";

import { AppLogo } from "../common/AppLogo";
import { HeaderContainer } from "../common/HeaderContainer";
import { ProfileIcon } from "./ProfileIcon";
import { NavItem } from "./SideBarItem";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [];

const SidebarContent = ({ ...rest }) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      position={"relative"}
      overflow="scroll"
      w={"100%"}
      h="full"
      {...rest}
    >
      <HeaderContainer
        flexProps={{
          alignItems: "center",
          justifyContent: "space-between",
          mx: "8px",
        }}
      >
        <>
          <AppLogo />
          <ProfileIcon />
        </>
      </HeaderContainer>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const MAX_SIDEBAR_WIDTH: string = "800px";
const MIN_SIDEBAR_WIDTH: string = "300px";

export const SideBar = () => {
  return (
    <Box>
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
