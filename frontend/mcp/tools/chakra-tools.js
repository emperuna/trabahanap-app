const chakraComponents = {
  layout: ['Box', 'Container', 'Flex', 'Grid', 'SimpleGrid', 'Stack', 'HStack', 'VStack'],
  forms: ['Button', 'Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Switch'],
  dataDisplay: ['Badge', 'Card', 'Divider', 'List', 'Table', 'Tag', 'Avatar'],
  feedback: ['Alert', 'Progress', 'Skeleton', 'Spinner', 'Toast'],
  overlay: ['Modal', 'Drawer', 'Menu', 'Popover', 'Tooltip'],
  navigation: ['Breadcrumb', 'Link', 'Stepper'],
  typography: ['Text', 'Heading', 'Highlight']
};

const jobSpecificTools = [
  {
    name: "generate_job_card",
    description: "Generate a job listing card component",
    template: "job-card-template"
  },
  {
    name: "generate_search_form", 
    description: "Generate a job search form",
    template: "search-form-template"
  }
];

module.exports = { chakraComponents, jobSpecificTools };