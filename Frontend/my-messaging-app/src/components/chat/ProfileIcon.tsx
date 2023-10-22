import {
  Avatar,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const menuItems = [
  [
    {
      name: "Profile",
      action: () => {},
      id: 1,
      Comp: Text,
      compProps: {},
    },
    {
      name: "Settings",
      action: () => {},
      id: 2,
      Comp: Text,
      compProps: {},
    },
  ],
  [
    {
      name: "Sign out",
      action: () => signOut(),
      id: 3,
      Comp: Text,
      compProps: {},
    },
  ],
];

export const ProfileIcon: () => JSX.Element = () => (
  <HStack spacing={{ base: "0", md: "6" }}>
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            {/* TODO: add the Avatar image  here  */}
            <Avatar size={"sm"} src={""} />
          </HStack>
        </MenuButton>
        <MenuList>
          {menuItems.map((menuGroup, index) => (
            <>
              {menuGroup.map(({ id, Comp, compProps, action, name }) => (
                <MenuItem key={id}>
                  <Comp {...compProps} onClick={action}>
                    {name}
                  </Comp>
                </MenuItem>
              ))}
              {index !== menuItems.length - 1 && <MenuDivider />}
            </>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  </HStack>
);
