const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'lg',
    _focusVisible: {
      boxShadow: '0 0 0 2px var(--chakra-colors-purple-400)'
    }
  },
  sizes: {
    md: { h: 11, px: 6, fontSize: 'sm' },
    lg: { h: 14, px: 8, fontSize: 'md' }
  },
  variants: {
    solid: {
      bg: 'brand.500',
      color: 'white',
      _hover: { bg: 'brand.600', transform: 'translateY(-2px)', boxShadow: 'elevated' },
      _active: { transform: 'translateY(0)' }
    },
    primaryGradient: {
      bgGradient: 'linear(to-r, purple.500, blue.500)',
      color: 'white',
      _hover: {
        bgGradient: 'linear(to-r, purple.600, blue.600)',
        transform: 'translateY(-2px)',
        boxShadow: 'glow'
      }
    },
    outline: {
      border: '2px solid',
      borderColor: 'purple.400',
      color: 'purple.400',
      _hover: {
        bg: 'purple.50'
      }
    },
    ghost: {
      color: 'gray.600',
      _hover: { bg: 'gray.100' },
      _dark: { color: 'gray.300', _hover: { bg: 'whiteAlpha.200' } }
    }
  },
  defaultProps: {
    variant: 'solid',
    size: 'md'
  }
};
export default Button;