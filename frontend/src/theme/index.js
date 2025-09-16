import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors';
import typography from './foundations/typography';
import shadows from './foundations/shadows';
import radii from './foundations/radii';
import semanticTokens from './semantic-tokens';

import Button from './components/button';
import Input from './components/input';
import Select from './components/select';
import Heading from './components/heading';
import Link from './components/link';
import Container from './components/container';
import Card from './components/card';

const components = {
  Button,
  Input,
  Select,
  Heading,
  Link,
  Container,
  Card
};

const theme = extendTheme({
  colors,
  ...typography,
  shadows,
  radii,
  semanticTokens,
  styles: {
    global: {
      body: {
        bg: 'bg.surface',
        color: 'gray.800',
        _dark: { bg: 'gray.900', color: 'gray.100' }
      }
    }
  },
  components
});

export default theme;