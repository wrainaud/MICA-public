import React from "react";
import { Flex, Text, useTheme } from "@aws-amplify/ui-react";

function CustomFooter() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center" padding={tokens.space.medium}>
      <Text>&copy; All Rights Reserved - Team Biergarten 2022</Text>
    </Flex>
  );

  }

export default CustomFooter;
