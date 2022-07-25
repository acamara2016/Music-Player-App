import { Box, Flex, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaSearch } from "react-icons/fa";
import getBGColor from "../../utils/getBGColor";

const Search = () => {
  const genres = [
    "Hip-Hop",
    "Pop",
    "R&B",
    "Indie",
    "Podcasts",
    "Made for you",
    "Charts",
    "New Releases",
    "Discover",
    "Concerts",
    "Country",
    "Rock",
    "Latin",
    "Workout",
    "Mood",
    "Happy Holidays",
    "Sleep",
    "Dance / Electronic",
    "Christian & Gospel",
    "Chill",
    "Regional",
    "Decades",
    "Fresh Finds",
    "Frequency",
    "Student",
    "Focus",
    "EQUAL",
    "Party",
  ];
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState("");
  return (
    <Box bg="black">
      <Box padding="30px 0px 20px 0px" id="search-box">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<FaSearch color="gray.300" />}
          />
          <Input
            color="black"
            borderRadius="30px"
            bg="white"
            type="tel"
            onChange={(e) => setSearch(e.target.value)}
            width="300px"
            placeholder="Search music, artist, album"
          />
        </InputGroup>
      </Box>
      <Box
        overflowY="auto"
        height="calc(100vh - 100px)"
        id="all-genres"
        padding="16px 0px 0px 10px"
        color="white"
      >
        <Text fontSize="xl" fontWeight="bold">
          Browse all
        </Text>
        <br />
        <Flex marginBottom="120px" flexWrap="wrap" gap="22px">
          {genres.map((genre) => {
            return (
              <Box
                bg={`${getBGColor(genre)}`}
                key={genre}
                paddingX="10px"
                height="250px"
                borderRadius="6px"
                width="250px"
                color="white"
              >
                <LinkBox height="inherit" position="relative" padding="10px">
                  <NextLink
                    href={{
                      pathname: "/search/[id]",
                      query: { id: genre },
                    }}
                    passHref
                  >
                    <LinkOverlay width="inherit">
                      <Text
                        padding="10px 0px 0px 10px"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        {genre}
                      </Text>
                      <Image
                        position="absolute"
                        width="50%"
                        borderRadius="5px"
                        bottom="0px"
                        right="10px"
                        src={`https://picsum.photos/400?random=${genre}`}
                      />
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </Box>
            );
          })}
          <br />
          <br />
        </Flex>
      </Box>
    </Box>
  );
};

export default Search;
