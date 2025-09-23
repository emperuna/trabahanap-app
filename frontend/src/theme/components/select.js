const Select = {
  variants: {
    glass: {
      field: {
        bg: 'whiteAlpha.200',
        border: '1px solid',
        borderColor: 'whiteAlpha.300',
        color: 'white',
        backdropFilter: 'blur(12px)',
        _focus: {
          borderColor: 'blue.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)',
          bg: 'whiteAlpha.300'
        }
      },
      icon: { color: 'gray.300' }
    }
  },
  defaultProps: {
    size: 'lg'
  }
};
export default Select;