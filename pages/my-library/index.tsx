import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { useState } from "react";
import {
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import PlaylistLibrary from "../../components/playlistLibrary";

const MyLibrary = ({ playlists }) => {
  const [currentTab, setCurrentTab] = useState();
  const tabs: string[] = ["Playlists", "Podcasts", "Artists", "Albums"];
  return (
    <Box height="100%" paddingTop="30px" overflowY="auto" bg="black">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          {tabs.map((tab) => {
            return <Tab key={tab}>{tab}</Tab>;
          })}
        </TabList>
        <TabPanels height="calc(100vh - 100px)">
          <TabPanel>
            <PlaylistLibrary playlists={playlists} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export const getServerSideProps = async ({ req }) => {
  let user;
  try {
    user = await validateToken(req.cookies.BAMAKO_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
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
    props: { playlists },
  };
};
export default MyLibrary;
