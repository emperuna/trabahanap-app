const Input = {
  baseStyle: {
    field: {
      borderRadius: 'lg',
      _placeholder: { color: 'gray.400' }
    }
  },
  sizes: {
    lg: {
      field: { h: 14, px: 5, fontSize: 'sm' }
    }
  },
  variants: {
    glass: {
      field: {
        bg: 'whiteAlpha.200',
        backdropFilter: 'blur(12px)',
        border: '1px solid',
        borderColor: 'whiteAlpha.300',
        color: 'white',
        _focus: {
          borderColor: 'purple.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
          bg: 'whiteAlpha.300'
        }
      }
    },
    subtle: {
      field: {
        bg: 'gray.100',
        _focus: {
          bg: 'white',
          borderColor: 'purple.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)'
        }
      }
    }
  },
  defaultProps: {
    size: 'lg'
  }
};
export default Input;