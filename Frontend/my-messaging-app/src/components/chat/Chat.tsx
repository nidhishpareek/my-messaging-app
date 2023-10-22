import { Flex } from "@chakra-ui/react";

import { ChatRoom } from "./ChatRoom";
import { SideBar } from "./Sidebar";

const Chat = () => {
  return (
    <Flex>
      <SideBar />
      <ChatRoom />
    </Flex>
  );
};

export default Chat;
