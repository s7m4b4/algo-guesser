import * as React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';

import { GameStateContextType } from '../types/gamestate';
import { GameContext } from '../context/GameState';
import Settings from './Settings';

export default function LandingScreen() {
  const { setGameState } = React.useContext(GameContext) as GameStateContextType;

  return (
    <Flex gap="8" direction="column">
      <Heading
        as="h1"
        size="xl"
        fontFamily="Inter"
        letterSpacing="6px"
        borderBottom="2px"
        color="white"
        fontWeight="light"
        textAlign="center"
      >
        AlgoGuesser
      </Heading>
      <Settings />
      <Button
        w="full"
        bgColor="white"
        color="black"
        onClick={() => {
          setGameState('game');
        }}
      >
        Begin
      </Button>
    </Flex>
  );
}
