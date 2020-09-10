import React from 'react';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import { ColumnsBlockSchema } from './schema';
import BlocksForm from '../components/BlocksForm';
import { RecoilRoot } from 'recoil';

const ColumnsBlockEdit = (props) => {
  const { selected, block, data, onChangeBlock } = props;
  const { columns = 2 } = data;
  const cols = [...Array(columns)];
  return (
    <>
      <RecoilRoot>
        {/* <ColumnsBlockView {...props} /> */}
        <div className="columns-demo-block">
          {cols.map((id) => {
            return <BlocksForm key={id} />;
          })}
        </div>
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
      </RecoilRoot>
    </>
  );
};

export default ColumnsBlockEdit;

// import ColumnsBlockView from './ColumnsBlockView';
// import { v4 as uuid } from 'uuid';
// const emptyColumns = () => {
//   const uid = uuid();
//   return {
//     columns: { uid: {} },
//     columns_layout: {
//       items: [uid],
//     },
//   };
// };
