import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import { Image, Slide } from "@chakra-ui/react";
import Player from "./player";
import VolumeController from "./volumeController";

const PlayerBar = ({ isExpanded, handleExpand }) => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box
      height={`${isExpanded ? "78.55vh" : "100px"}`}
      width="100vw"
      color="white"
      bg="gray.700"
    >
      {activeSong && (
        <>
          <Flex bg="gray.900" height="100px" align="center">
            {activeSong ? (
              <Box padding="20px" width="30%" color="white">
                <Text fontSize="large">{activeSong.name}</Text>
                <Text fontSize="sm">{activeSong?.Artist?.name}</Text>
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
          {isExpanded && (
            <Slide direction="bottom" in={isExpanded}>
              <Center overflowY="auto" height="67vh">
                <Box marginTop="110vh">
                  <Image src={activeSong?.thumbnail} />
                  <Box>
                    <Text fontSize="xl" fontWeight="bold">
                      {activeSong?.name}
                    </Text>
                    <Text fontSize="small" fontWeight="bold">
                      By {activeSong?.Artist.name}
                    </Text>
                    <Text whiteSpace="pre-wrap">{`Song: ${activeSong?.name}
I was wondering if I should stay
Cause I don't know what to feel anymore
I keep saying I'm alright
But I think I need to go away

Tell me something I haven't felt
Or heard before cause right now
All I see is your pretty eyes in my head
And it's breaking my heart so now I have one question

Should I stay or should I leave
Cause I can't take this pain anymore
So please tell me now
What to do

Every day I see you there
With that smile on your face
It makes make me smile too
But when you're gone it goes away

Hope to see you on another windy day
But then again you break my heart
So now, how do I stop
With these tears running down my face

Tell me, tell me
How do I forget someone so perfect for me
And how do I show her she's the one for me
But I don't know I try every day

Her eyes, her smile I see every day
My heart's breaking and I don't know what to say
She know's and thinks it's his fault but
You know you can't control who you fall in love with

So there's one thing left to do
It's time to say goodbye
So I love you
And that's why I can't stay
And that's why I can't stay`}</Text>
                  </Box>
                </Box>
              </Center>
            </Slide>
          )}
        </>
      )}
    </Box>
  );
};

export default PlayerBar;
