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
import NextImage from "next/image";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { Image } from "@chakra-ui/react";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { usePlaylist } from "../lib/hook";

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
    { icon: MdLibraryMusic, label: "Your library", route: "/your-library" },
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
        <Box marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.jpeg" height={60} width={140} />
        </Box>
      </Box>
      <Box marginBottom="20px">
        <List spacing={2} alignContent="start">
          {section1.map((option) => {
            return option.icon ? (
              <ListItem fontSize="16px" paddingX="20px" key={option.label}>
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
              <ListItem fontSize="16px" paddingX="20px" key={option.label}>
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
        <List spacing={2}>
          {!isLoading &&
            playlists &&
            playlists?.map((playlist) => (
              <ListItem key={playlist.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <Box display="flex" alignItems="center" gap="5px">
                      <Image width="25%" src={playlist.thumbnail} />
                      <LinkOverlay width="75%">{playlist.name}</LinkOverlay>
                    </Box>
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
