const Input = {
  baseStyle: {
    field: {
      borderRadius: 'xl',
      transition: 'all 0.2s ease',
    },
  },
  variants: {
    glass: {
      field: {
        bg: 'whiteAlpha.200',
        border: '1px solid',
        borderColor: 'whiteAlpha.300',
        color: 'white',
        _placeholder: {
          color: 'whiteAlpha.600',
        },
        _focus: {
          borderColor: 'whiteAlpha.500',
          bg: 'whiteAlpha.300',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.2)',
        },
      },
    },
    modern: {
      field: {
        bg: 'bg.card',
        border: '1px solid',
        borderColor: 'border.subtle',
        _focus: {
          borderColor: 'blue.400',
          boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.2)',
        },
      },
    },
  },
  sizes: {
    lg: {
      field: {
        h: 12,
        px: 4,
      },
    },
  },
};

export default Input;