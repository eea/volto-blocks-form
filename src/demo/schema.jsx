export const ColumnsBlockSchema = {
  title: 'Columns block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'nrColumns'],
    },
  ],
  properties: {
    title: {
      title: 'Block title',
      default: 'Columns demo',
    },
    nrColumns: {
      title: 'Number of columns',
      type: 'number',
      defaultValue: 2,
    },
  },
  required: ['title'],
};
