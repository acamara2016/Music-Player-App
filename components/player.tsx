/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Box,
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";

import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions, useStoreState } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  const soundRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const repeatRef = useRef(repeat);
  const [shuffle, setShuffle] = useState(false);
  const volume = useStoreState((store: any) => store.volume);
  const [duration, setDuration] = useState(0.0);
  const currentActiveSongs = useStoreState((store: any) => store.activeSongs);
  const changeSong = useStoreActions((store: any) => store.changeActiveSong);
  const setPlayState = (value) => {
    setPlaying(value);
  };
  const onShuffle = () => {
    setShuffle((state) => !state);
  };
  const onRepeat = () => {
    setRepeat((state) => !state);
  };
  const onSkipPrevious = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };
  const onSkipNext = () => {
    setIndex((state: any) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          return onSkipNext();
        }
        return next;
      }
      return state + 1;
    });
  };
  const onEnd = () => {
    if (repeatRef.current) {
      soundRef.current.seek(0.0);
      setSeek(0);
    } else {
      onSkipNext();
    }
  };
  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setSeek(0);
    setDuration(songDuration);
  };
  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);
  useEffect(() => {
    changeSong(songs[index]);
  }, [index]);
  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => {
        cancelAnimationFrame(timerId);
      };
    }
    cancelAnimationFrame(timerId);
  }, [seek, playing]);
  return (
    <Box>
      <Box>
        <ReactHowler
          onEnd={onEnd}
          onLoad={onLoad}
          volume={volume}
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            onClick={() => onShuffle()}
            color={shuffle ? "white" : "gray.600"}
            fontSize="20px"
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            color="white"
            onClick={() => onSkipPrevious()}
            aria-label="skip-previous"
            fontSize="20px"
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              onClick={() => setPlayState(false)}
              color="white"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              onClick={() => setPlayState(true)}
              color="white"
              fontSize="40px"
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            onClick={() => onSkipNext()}
            aria-label="skip-next"
            color="white"
            fontSize="20px"
            icon={<MdSkipNext />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            onClick={() => onRepeat()}
            color={repeat ? "white" : "gray.600"}
            fontSize="20px"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="x-sm">{formatTime(seek)}</Text>
          </Box>
          <Box paddingLeft="10px" paddingRight="10px" width="90%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              onChange={onSeek}
              onDrag={onSeek}
              value={[seek]}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="x-sm">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default Player;
