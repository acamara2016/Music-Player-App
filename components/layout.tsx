import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import PlayerBar from "./playerBar";
import Sidebar from "./sidebar";

const Layout: React.FC = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // TODO make sidebar responsive for mobile view
  // const [menuOpen, setMenuOpen] = useState(false);
  const handleExpand = () => {
    setIsExpanded((state: any) => {
      // eslint-disable-next-line no-return-assign
      return (state = !state);
    });
  };
  return (
    <Box width="100vw" height="100vh">
      <Box width="250px" height="100vh" top="0" left="0" position="absolute">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        zIndex={10}
        width="100vw"
        height={`${isExpanded ? "78.55vh" : "100px"}`}
      >
        <PlayerBar isExpanded={isExpanded} handleExpand={handleExpand} />
      </Box>
    </Box>
  );
};

export default Layout;
