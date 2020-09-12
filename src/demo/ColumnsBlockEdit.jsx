import React from 'react';
import { Grid } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import { ColumnsBlockSchema } from './schema';
import BlocksForm from '../components/BlocksForm';
import { RecoilRoot } from 'recoil';
import { emptyForm } from '../utils';
import BlockSelection from './BlockSelection';

import './styles.less';

const empty = () => {
  const id = uuid();
  return {
    columns: { [id]: emptyForm() },
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
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
  } = props;
  const { coldata = empty() } = data;
  const columnList = getColumns(coldata);

  return (
    <>
      <RecoilRoot>
        <BlockSelection
          block={block}
          columns={coldata?.columns_layout?.items || []}
          selected={selected}
        >
          <div className="columns-demo-block">
            <h3>{data.block_title}</h3>
            <Grid columns={columnList.length}>
              {columnList.map(([id, column], index) => {
                return (
                  <Grid.Column className="demo-column" key={id}>
                    <h4>{`Column ${index}`}</h4>
                    <BlocksForm
                      properties={isEmpty(column) ? emptyForm() : column}
                      setFormData={(id, value) => {
                        onChangeBlock(block, {
                          ...data,
                          coldata: {
                            ...coldata,
                            columns: {
                              ...coldata.columns,
                              [id]: value,
                            },
                          },
                        });
                      }}
                      formId={id}
                      onChangeField={onChangeField}
                      pathname={pathname}
                    />
                  </Grid.Column>
                );
              })}
            </Grid>
          </div>
        </BlockSelection>
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
