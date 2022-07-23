import { Flex, Box, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { Text, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { validateToken } from "../lib/auth";
import prisma from "../lib/prisma";

const PlaylistLibrary = ({ playlists }) => {
  return (
    <Flex padding="16px 0px 0px 10px" flexWrap="wrap" gap="10px">
      {playlists.map((artist) => {
        return (
          <Box key={artist.id} paddingX="10px" width="23%">
            <LinkBox
              bg="#1c1b1b"
              borderRadius="1px"
              cursor="pointer"
              width="100%"
              padding="8px"
            >
              <NextLink
                href={{
                  pathname: "/playlist/[id]",
                  query: { id: artist.id },
                }}
                passHref
              >
                <LinkOverlay>
                  <Image src={artist.thumbnail} />
                  <Box color="white" paddingTop="10px">
                    <Text fontSize="small" fontWeight="bold">
                      {artist.name.substring(0, 10)}
                      {artist.name.length > 10 && "..."}
                    </Text>
                    <Text fontSize="x-small">{artist.name}</Text>
                  </Box>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </Box>
        );
      })}
    </Flex>
  );
};

export default PlaylistLibrary;
