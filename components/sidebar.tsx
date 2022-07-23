import {
  Box,
  List,
  ListIcon,
  ListItem,
  Stack,
  Divider,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { Button, Icon } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { Image } from "@chakra-ui/react";
import {
  MdSettings,
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { usePlaylist } from "../lib/hook";
import { useEffect } from "react";
type IOption = {
  icon: IconType;
  label: string;
  route: string;
};

const Sidebar = () => {
  const { playlists, isLoading } = usePlaylist();
  const options: [IOption] = [
    { icon: MdHome, label: "home", route: "/" },
    { icon: MdSearch, label: "search", route: "/search" },
    { icon: MdLibraryMusic, label: "Your library", route: "/your-library" },
    <br />,
    {
      icon: MdPlaylistAdd,
      label: "Create playlist",
      route: "/create-playlist",
    },
    { icon: MdFavorite, label: "Liked songs", route: "/liked-song" },
    <Divider color="gray.800" />,
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
          {options.map((option) => {
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
