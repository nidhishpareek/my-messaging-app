import { FULL_VIEWPORT_HEIGHT } from "@/theme/constants";
import { Button, Center, Input, Stack, useToast } from "@chakra-ui/react";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import { Title } from "../common/TextTypes";
import { SignInComponent } from "./SignIn";
import { useUserName } from "@/GraphQl/Hooks/useUserName";
import { useSession } from "next-auth/react";
import { usernamePattern } from "@/util/constants";

interface IAuthProps {
  session: Session | null;
}

export const TakeUserName = () => {
  // TODO: change this to react hook form
  const [username, setUserName] = useState("");
  const { update } = useSession();
  const toast = useToast();

  const {
    mutation: { loading },
    createUserNameFn,
  } = useUserName();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.closeAll();

    if (loading) return;
    if (!username || !usernamePattern.test(username)) {
      toast({
        title: `Please enter a valid username`,
        variant: "solid",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const { success, error } = await createUserNameFn({ username });
      if (error) throw new Error(error);
      toast({
        title: `Username added successfully`,
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });
      if (success) update();
    } catch (err: any) {
      console.log(err);
      toast({
        title: err.message || "Username update failed",
        variant: "solid",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Stack textAlign={"center"}>
      <Title>Enter your username</Title>
      <form onSubmit={onSubmit}>
        <Stack gap={"2rem"}>
          <Input onChange={(e) => setUserName(e.target.value)} />
          <Button type="submit" w={"100%"} disabled={loading}>
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

// TODO: add revalidate session
const Auth: React.FC<IAuthProps> = ({ session }) => {
  return (
    <Center height={FULL_VIEWPORT_HEIGHT}>
      {session ? (
        <TakeUserName></TakeUserName>
      ) : (
        <SignInComponent></SignInComponent>
      )}
    </Center>
  );
};

export default Auth;
