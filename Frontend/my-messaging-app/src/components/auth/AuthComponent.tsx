import { FULL_VIEWPORT_HEIGHT } from "@/theme/constants";
import { Button, Card, CardBody, Center, Input, Stack } from "@chakra-ui/react";
import { Session } from "next-auth";
import { FormEvent, useState } from "react";
import { Title } from "../common/TextTypes";
import { SignInComponent } from "./SignIn";
import { useUserName } from "@/GraphQl/Hooks/useUserName";
// TODO: add revalidate session
interface IAuthProps {
  session: Session | null;
}

export const TakeUserName = () => {
  // TODO: change this to react hook form
  const [username, setUserName] = useState("");
  const {
    mutation: { data, loading, error },
    createUserNameFn,
  } = useUserName();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    try {
      await createUserNameFn({ username });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack textAlign={"center"}>
      <Title>Enter your username</Title>
      <form onSubmit={onSubmit}>
        <Stack gap={"2rem"}>
          <Input onChange={(e) => setUserName(e.target.value)} />
          <Button type="submit" w={"100%"}>
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
