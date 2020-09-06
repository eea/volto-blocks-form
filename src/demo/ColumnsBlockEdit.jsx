import React from 'react';
import ColumnsBlockView from './ColumnsBlockView';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import { ColumnsBlockSchema } from './schema';

const ColumnsBlockEdit = (props) => {
  const { selected, block, data, onChangeBlock } = props;
  const { columns = 1 } = data;
  return (
    <>
      {/* <ColumnsBlockView {...props} /> */}
      <div>Columns edit</div>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={ColumnsBlockSchema}
          title={ColumnsBlockSchema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default ColumnsBlockEdit;
