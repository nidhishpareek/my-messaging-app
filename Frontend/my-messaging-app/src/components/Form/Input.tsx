import { KeyboardEvent, MouseEvent, useState } from "react";
import { FieldError, useController, useFormContext } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { AiTwotoneEyeInvisible, AiFillEye } from "react-icons/ai";
import { findIndex, size } from "lodash";

interface UnctrlProps {
  asPassword?: boolean;
  error?:
    | FieldError
    | {
        message: string;
      };
  field?: any;
  handleClick?: (
    event: MouseEvent
  ) => MouseEvent<HTMLButtonElement, MouseEvent>;
  handleEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  leftIcon?: any;
  name?: string;
  placeholder?: string;
}

export const UncontrolledInput = ({
  asPassword,
  error,
  field,
  handleEnter,
  label,
  leftIcon,
  name,
  placeholder,
}: UnctrlProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Stack spacing={4}>
        <InputGroup flexGrow={1}>
          {leftIcon && (
            <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
          )}

          <Input
            type={asPassword && !show ? "password" : "text"}
            placeholder={placeholder}
            onKeyDown={handleEnter}
            {...field}
          />
          {asPassword && (
            <InputRightElement
              width={["0.5rem", "4.5rem"]}
              justifyContent={["right", "center"]}
            >
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                display={["none", "inline"]}
              >
                {show ? "Hide" : "Show"}
              </Button>
              <Button
                h="1rem"
                size="sm"
                onClick={handleClick}
                display={["inline", "none"]}
                background="transparent"
              >
                {show ? <AiTwotoneEyeInvisible /> : <AiFillEye />}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </Stack>
      {error?.message && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
};

interface CtrlProps extends UnctrlProps {
  defaultValue?: any;
  field: undefined;
  focusFlow?: string[];
  isLastElement?: boolean;
  name: string;
  shouldUnregister?: boolean;
}

export const ControlledInput = ({
  defaultValue,
  focusFlow,
  name,
  shouldUnregister,
  ...props
}: CtrlProps) => {
  //adding control logic to input
  const { control, setFocus } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue: defaultValue || "",
    name,
    shouldUnregister: shouldUnregister,
  });

  // Ability to change focus on enter key or submitting on last input
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!size(focusFlow)) return;
    if (event.key === "Enter") {
      const nextIndex = findIndex(focusFlow, (a) => a === name) + 1;
      if (nextIndex !== focusFlow?.length) {
        if (focusFlow?.[nextIndex]) setFocus(focusFlow[nextIndex]);
        event.preventDefault();
      }
    }
  };

  return (
    <UncontrolledInput
      error={error}
      {...props}
      field={field}
      handleEnter={handleKeyDown}
    />
  );
};
