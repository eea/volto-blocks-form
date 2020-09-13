import { v4 as uuid } from 'uuid';
import { emptyForm } from '../utils';

export const getColumns = (coldata) => {
  return (coldata?.columns_layout?.items || []).map((id) => [
    id,
    coldata.columns?.[id],
  ]);
};

export const empty = () => {
  const id = uuid();
  return {
    columns: { [id]: emptyForm() },
    columns_layout: {
      items: [id],
    },
  };
};
