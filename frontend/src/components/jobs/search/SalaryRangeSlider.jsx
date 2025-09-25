import React from 'react';
import { 
  FormControl, FormLabel, HStack, Text, 
  RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb 
} from '@chakra-ui/react';
import { HiCurrencyDollar } from 'react-icons/hi';

const SalaryRangeSlider = ({ salaryRange, onChange }) => {
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <FormControl>
      <FormLabel fontWeight="600" fontSize="sm">
        <HStack>
          <HiCurrencyDollar />
          <Text>Salary Range: {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}</Text>
        </HStack>
      </FormLabel>
      <RangeSlider
        value={salaryRange}
        onChange={onChange}
        min={0}
        max={200000}
        step={5000}
        colorScheme="blue"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </FormControl>
  );
};

export default SalaryRangeSlider;