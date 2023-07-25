import { Button, Image, Stack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { Title } from "../common/TextTypes";

export const SignInComponent = () => (
  <Stack textAlign="center">
    <Title>Sign In</Title>

    <Button
      onClick={() => signIn("google")}
      leftIcon={
        <Image height="30px" src="/Images/GoogleLogo.svg" alt="Google Logo" />
      }
    >
      Continue with Google
    </Button>
  </Stack>
);
