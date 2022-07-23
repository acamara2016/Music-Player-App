/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable no-return-assign */
import { Box, Flex } from "@chakra-ui/layout";
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  BsArrowsAngleExpand,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

const VolumeController = ({ handleExpand }) => {
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(40);
  const [updatingVolume, setUpdatingVolume] = useState(false);
  const handleTurnOnMute = () => {
    setMute(() => {
      return true;
    });
  };
  const handleTurnOffMute = () => {
    setMute(() => {
      return false;
    });
  };
  const handleVolume = (e) => {
    setVolume((state) => {
      // eslint-disable-next-line prefer-destructuring
      return (state = e[0]);
    });
  };
  return (
    <Box>
      <Flex paddingLeft="20px" alignItems="center" color="white">
        <Box>
          <ButtonGroup>
            {mute ? (
              <IconButton
                onClick={() => handleTurnOffMute()}
                aria-label="mute"
                bg="transparent"
                icon={<BsVolumeMuteFill />}
              />
            ) : (
              <IconButton
                onClick={() => handleTurnOnMute()}
                aria-label="mute"
                bg="transparent"
                icon={<BsFillVolumeUpFill />}
              />
            )}
          </ButtonGroup>
        </Box>
        <Box paddingLeft="10px" paddingRight="10px" width="90%">
          <RangeSlider
            width="150px"
            aria-label={["min", "max"]}
            step={0.1}
            min={0}
            max={100}
            onChangeStart={() => setUpdatingVolume(true)}
            onChangeEnd={() => setUpdatingVolume(false)}
            onChange={handleVolume}
            onDrag={handleVolume}
            value={[volume]}
            id="volume-range"
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="gray.600" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
        <IconButton
          fontSize="small"
          sx={{
            "&:hover": {
              bg: "none",
            },
          }}
          bg="transparent"
          color="white"
          onClick={() => handleExpand()}
          aria-label="expand"
          icon={<BsArrowsAngleExpand />}
        />
      </Flex>
    </Box>
  );
};

export default VolumeController;
