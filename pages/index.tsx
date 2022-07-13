import GameStateProvider from '../context/GameState';
import ScreenSwitcher from '../components/ScreenSwitcher';
import SettingsProvider from '../context/Settings';
import { Container, Flex } from '@chakra-ui/react';

export default function Index() {
  return (
    <Container minW="full" bgGradient="linear(to-br, #313186, #3987f5, #23d0ee)">
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <GameStateProvider>
          <SettingsProvider>
            <ScreenSwitcher />
          </SettingsProvider>
        </GameStateProvider>
      </Flex>
    </Container>
  );
}
