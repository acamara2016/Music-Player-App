import {
  Box,
  List,
  ListIcon,
  ListItem,
  Divider,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import NextLink from "next/link";
import { IconType } from "react-icons";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { usePlaylist } from "../lib/hook";
import Logo from "./logo";

type IOption = {
  icon: IconType;
  label: string;
  route: string;
};

const Sidebar = () => {
  const { playlists, isLoading } = usePlaylist();
  const section1: IOption[] = [
    { icon: MdHome, label: "home", route: "/" },
    { icon: MdSearch, label: "search", route: "/search" },
    { icon: MdLibraryMusic, label: "Your library", route: "/my-library" },
  ];
  const section2: IOption[] = [
    {
      icon: MdPlaylistAdd,
      label: "Create playlist",
      route: "/create-playlist",
    },
    { icon: MdFavorite, label: "Liked songs", route: "/liked-song" },
  ];
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5"
      color="white"
    >
      <Box paddingY="20px">
        <Box border="1px solid" marginBottom="20px" paddingX="30px">
          <Logo />
        </Box>
      </Box>
      <Box marginBottom="20px">
        <List spacing={2} alignContent="start">
          {section1.map((option) => {
            return option.icon ? (
              <ListItem
                fontSize="16px"
                padding="10px 0px 0px 0px !important"
                key={option.label}
              >
                <LinkBox>
                  <NextLink href={option.route} passHref>
                    <LinkOverlay
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        marginRight="20px"
                        color="white"
                        fontSize="3xl"
                        as={option.icon}
                      />
                      <Text
                        style={{ textTransform: "uppercase" }}
                        fontWeight="bold"
                        fontSize="small"
                      >
                        {option.label}
                      </Text>
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ) : (
              option
            );
          })}
          <br />
          {section2.map((option) => {
            return option.icon ? (
              <ListItem
                fontSize="16px"
                padding="10px 0px 0px 0px !important"
                key={option.label}
              >
                <LinkBox>
                  <NextLink href={option.route} passHref>
                    <LinkOverlay
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListIcon
                        marginRight="20px"
                        color="white"
                        fontSize="3xl"
                        as={option.icon}
                      />
                      <Text
                        style={{ textTransform: "uppercase" }}
                        fontWeight="bold"
                        fontSize="small"
                      >
                        {option.label}
                      </Text>
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ) : (
              option
            );
          })}
          <Divider color="gray.800" />
        </List>
      </Box>
      <Box overflowY="auto" paddingY="20px" height="60%">
        <List spacing={4}>
          {!isLoading &&
            playlists &&
            playlists?.map((playlist) => (
              <ListItem
                sx={{
                  "&:hover": {
                    bg: "rgba(255, 255, 255, 0.16)",
                  },
                }}
                fontSize="large"
                fontWeight="light"
                // padding="10px 0px 10px 0px"
                marginTop="0px !important"
                key={playlist.id}
              >
                <LinkBox padding="10px">
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
