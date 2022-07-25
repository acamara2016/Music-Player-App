import {
  Box,
  Flex,
  Input,
  Button,
  Wrap,
  Avatar,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useState } from "react";
import { auth } from "../lib/mutation";
import Logo from "./logo";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, {
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
    router.push("/");
    setIsLoading(false);
  };
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <Logo />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box
          justifyContent="center"
          padding="50px"
          bg="gray.900"
          borderRadius="6px"
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              {mode === "signup" && (
                <>
                  <Wrap>
                    <Avatar
                      size="2xl"
                      name="Segun Adebayo"
                      src={`https://avatars.dicebear.com/api/adventurer/${avatar}.svg`}
                    />{" "}
                  </Wrap>
                  <FormLabel htmlFor="avatar">Pick an avatar</FormLabel>
                  <Input
                    id="avatar"
                    placeholder="Avatar"
                    type="text"
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                bg="green.500"
                marginTop="10px"
                isLoading={loading}
                sx={{
                  "&:hover": {
                    bg: "green.300",
                  },
                }}
              >
                {mode}
              </Button>
              <FormHelperText>
                {mode === "signin" ? (
                  <NextLink href="/signup">Click here to sign up</NextLink>
                ) : (
                  <NextLink href="/signin">Click here to sign in</NextLink>
                )}
              </FormHelperText>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};
export default AuthForm;
