import { extendTheme } from '@chakra-ui/react';

// Foundations
import colors from './foundations/colors';
import typography from './foundations/typography';
import shadows from './foundations/shadows';
import radii from './foundations/radii';

// Semantic tokens
import semanticTokens from './semantic-tokens';

// Component overrides
import Button from './components/button';
import Input from './components/input';
import Card from './components/card';
import Container from './components/container';
import Heading from './components/heading';
import Link from './components/link';
import Select from './components/select';

const theme = extendTheme({
  colors,
  fonts: typography,
  shadows,
  radii,
  semanticTokens,
  components: {
    Button,
    Input,
    Card,
    Container,
    Heading,
    Link,
    Select,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      // Custom scrollbar using Chakra tokens
      '::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'purple.400',
        borderRadius: '3px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'purple.500',
      },
      html: {
        scrollbarWidth: 'thin',
        scrollbarColor: 'purple.400 transparent',
      },
    },
  },
});

export default theme;