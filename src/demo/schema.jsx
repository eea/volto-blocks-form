export const ColumnsBlockSchema = {
  title: 'Columns block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'columns'],
    },
  ],
  properties: {
    title: {
      title: 'Block title',
      default: 'Columns demo',
    },
    columns: {
      title: 'Number of columns',
      default: 2,
      type: 'number',
    },
  },
  required: ['title'],
};
