import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hook";
import SongsTable from "../components/songsTable";

const Home = ({ artists, playlist }) => {
  const { user } = useMe();
  return (
    <GradientLayout
      roundImage
      title={`${user?.firstName} ${user?.lastName}`}
      image={`https://avatars.dicebear.com/api/adventurer/${user?.avatar}.svg`}
      description={`${user?.playlistCount} public playlists`}
      substitle="Profile"
      color="blue"
    >
      <Box color="white" paddingX="20px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist, index) => {
            return (
              <Box paddingX="10px" width="20%">
                <Box
                  bg="gray.800"
                  borderRadius="4px"
                  width="100%"
                  padding="15px"
                >
                  <Image
                    borderRadius="100%"
                    src={`https://picsum.photos/400?random=${index}`}
                  />
                  <Box color="white" paddingTop="10px">
                    <Text fontSize="large" fontWeight="bold">
                      {artist.name}
                    </Text>
                    <Text fontSize="x-small">{artist.name}</Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
        <SongsTable songs={playlist.songs} />
      </Box>
    </GradientLayout>
  );
};
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: 1,
      //   userId: id,
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
    props: { artists, playlist },
  };
};
export default Home;
