import React from 'react';
import { FormControl, FormLabel, Wrap, WrapItem, Button } from '@chakra-ui/react';

const SkillsSelector = ({ selectedSkills, onChange }) => {
  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'MySQL',
    'MongoDB', 'AWS', 'Docker', 'Git', 'HTML/CSS', 'TypeScript', 'Vue.js',
    'Angular', 'Laravel', 'Spring Boot', 'PostgreSQL', 'Redis', 'GraphQL'
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <FormControl>
      <FormLabel fontWeight="600" fontSize="sm">Required Skills</FormLabel>
      <Wrap spacing={2}>
        {popularSkills.map(skill => (
          <WrapItem key={skill}>
            <Button
              size="sm"
              variant={selectedSkills.includes(skill) ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </FormControl>
  );
};

export default SkillsSelector;