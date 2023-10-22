import { FULL_VIEWPORT_HEIGHT } from "@/theme/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUserNameInput } from "@/util/types";
import { Button, Center, Stack, useToast } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useUserName } from "@/GraphQl/Hooks/useUserName";
import { usernamePattern } from "@/util/constants";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

import { SignInComponent } from "./SignIn";
import { ControlledInput } from "../Form/Input";
import { Title } from "../common/TextTypes";

interface IAuthProps {
  session: Session | null;
}

const usernameForm: (show: string[]) => Record<string, any> = (show) => ({
  formTitle: "Welcome aboard",
  schema: object({
    username: string()
      .min(3, "Username must be more than 3 characters")
      .max(24, "Username must be less than 24 characters")
      .matches(usernamePattern, "Username must be alphanumeric, _ or .")
      .required("The UserName is required"),
  }),
  formElements: {
    username: {
      id: "1",
      Comp: ControlledInput,
      name: "username",
      placeholder: "Enter your signature name",
      label: "Enter your username",
    },
  },
});

export const TakeUserName = () => {
  const { update } = useSession();
  const toast = useToast();
  const formFields = ["username"];
  const { schema, formTitle, formElements } = usernameForm(formFields);
  const formData = useForm<CreateUserNameInput>({
    resolver: yupResolver(schema),
  });

  const {
    mutation: { loading },
    createUserNameFn,
  } = useUserName();

  const onSubmit = async (data: CreateUserNameInput) => {
    try {
      const { success, error } = await createUserNameFn(data);
      if (error) throw new Error(error);
      toast({
        title: `Username added successfully`,
        variant: "left-accent",
        status: "success",
        isClosable: true,
      });
      if (success) update();
    } catch (err: any) {
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
      <FormProvider {...formData}>
        <form onSubmit={formData.handleSubmit(onSubmit)}>
          <Stack gap={"2rem"}>
            <Title>{formTitle}</Title>
            {formFields?.map((elementName: string) => {
              if (![elementName]) return null;
              const { Comp, ...props } = formElements[elementName];
              return (
                <Comp key={props.id} {...props} focusFlow={formFields}></Comp>
              );
            })}
            <Button
              type="submit"
              w={"100%"}
              disabled={loading}
              isLoading={loading}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </FormProvider>
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
