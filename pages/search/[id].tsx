import { Flex, Box, LinkBox, LinkOverlay, Center } from "@chakra-ui/layout";
import { Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
const Result = ({ playlists, artists, songs }) => {
  const color = getBGColor(0);
  return (
    <Flex padding="16px 0px 0px 10px" flexWrap="wrap" gap="10px">
      {playlists &&
        playlists.map((artist) => {
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
      {artists &&
        artists.map((artist) => {
          return (
            <Box key={artist.id} paddingX="10px" width="100%">
              <GradientLayout
                roundImage={false}
                image={`https://picsum.photos/400?random=${artist.id}`}
                title={artist.name}
                substitle="artist"
                description={`${artist.songs.length} songs`}
                color={color}
              >
                <SongsTable songs={artist.songs} />
              </GradientLayout>
            </Box>
          );
        })}
      {songs.length > 0 &&
        songs.map((artist) => {
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
                    pathname: "/artist/[id]",
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
      {playlists.length === 0 && artists === 0 && songs === 0 && (
        <Center>
          <Text fontWeight="bold" fontSize="xl">
            0 search result
          </Text>
        </Center>
      )}
    </Flex>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    // eslint-disable-next-line no-unused-vars
    user = await validateToken(req.cookies.BAMAKO_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const songs = await prisma.song.findMany({
    where: {
      name: {
        contains: query.id,
      },
    },
    include: {
      Artist: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const artists = await prisma.artist.findMany({
    where: {
      name: {
        contains: query.id,
      },
    },
    // TODO Type '(Song & { Artist: { name: string; id: number; }; })[]' is not assignable to type 'boolean | SongFindManyArgs'.
    // include: {
    //   songs,
    // },
  });

  const playlists = await prisma.playlist.findMany({
    where: {
      name: {
        contains: query.id,
      },
    },
    include: {
      songs: {
        include: {
          Artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlists, artists, songs },
  };
};
export default Result;
