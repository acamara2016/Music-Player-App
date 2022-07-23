import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import { Image } from "@chakra-ui/react";
import Player from "./player";
import VolumeController from "./volumeController";

const PlayerBar = ({ isExpanded, handleExpand }) => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box
      height={`${isExpanded ? "80vh" : "100px"}`}
      width="100vw"
      color="white"
      bg="gray.700"
    >
      {activeSong && (
        <>
          {isExpanded && (
            <Center height="67vh">
              <Box>
                <Image src={activeSong?.thumbnail} />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {activeSong?.name}
                  </Text>
                  <Text fontSize="small" fontWeight="bold">
                    {activeSong?.Artist.name}
                  </Text>
                </Box>
              </Box>
            </Center>
          )}
          <Flex bg="gray.900" height="100px" align="center">
            {activeSong ? (
              <Box padding="20px" width="30%" color="white">
                <Text fontSize="large">{activeSong.name}</Text>
                <Text fontSize="sm">{activeSong.Artist.name}</Text>
              </Box>
            ) : null}
            <Box width="40%">
              {activeSong ? (
                <Player songs={songs} activeSong={activeSong} />
              ) : null}
            </Box>
            <Box
              display="flex"
              placeContent="flex-end"
              marginRight="10px"
              width="30%"
            >
              {activeSong ? (
                <VolumeController handleExpand={handleExpand} />
              ) : null}
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default PlayerBar;
