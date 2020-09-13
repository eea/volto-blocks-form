import React from 'react';
import { Grid } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import { ColumnsBlockSchema } from './schema';
import BlocksForm from '../components/BlocksForm';
import { RecoilRoot } from 'recoil';
import { emptyForm } from '../utils';
import { getColumns, empty } from './utils';
import BlockSelection from './BlockSelection';

import './styles.less';

const ColumnsBlockEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    onChangeField,
    pathname,
    selected,
  } = props;

  React.useEffect(() => {
    if (!data.coldata) {
      onChangeBlock(block, { ...data, coldata: empty() });
    }
  });

  const { coldata = empty() } = data;
  const columnList = getColumns(coldata);

  return (
    <>
      <RecoilRoot>
        <div className="columns-demo-block">
          <BlockSelection
            block={block}
            columns={coldata?.columns_layout?.items || []}
            selected={selected}
            title={<h3>{data.block_title}</h3>}
          >
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
          </BlockSelection>
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
