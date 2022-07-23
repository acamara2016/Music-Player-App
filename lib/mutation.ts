import fetcher from "./fetcher";

export const auth = async (
  mode: "signin" | "signup",
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }
) => {
  const result = await fetcher(`${mode}`, body);
  return result;
};
