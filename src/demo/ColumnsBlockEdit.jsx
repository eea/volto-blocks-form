import React from 'react';
import { v4 as uuid } from 'uuid';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import { ColumnsBlockSchema } from './schema';
import BlocksForm from '../components/BlocksForm';
import { RecoilRoot } from 'recoil';

import './styles.less';

const empty = () => {
  const id = uuid();
  return {
    columns: { [id]: {} },
    columns_layout: {
      items: [id],
    },
  };
};

const getColumns = (coldata) => {
  return (coldata?.columns_layout?.items || []).map((id) => [
    id,
    coldata.columns?.[id],
  ]);
};

const ColumnsBlockEdit = (props) => {
  const {
    selected,
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
  } = props;
  const { coldata = empty() } = data;
  return (
    <>
      <RecoilRoot>
        <div className="columns-demo-block">
          <h3>{data.title}</h3>
          {getColumns(coldata).map(([id, column]) => {
            return (
              <div className="demo-column" key={id}>
                <BlocksForm
                  formData={column}
                  formId={id}
                  onChangeField={onChangeField}
                  pathname={pathname}
                />
              </div>
            );
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
