import React from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';
import { defineMessages } from 'react-intl';
import { blocks } from '~/config';
import { getColumns, empty } from './utils';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

function renderColumn(content, props) {
  const { location, intl } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return hasBlocksData(content) ? (
    <div>
      {map(content[blocksLayoutFieldname].items, (block) => {
        const Block =
          blocks.blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.[
            'view'
          ] || null;
        return Block !== null ? (
          <Block
            key={block}
            id={block}
            properties={content}
            data={content[blocksFieldname][block]}
            path={getBaseUrl(location?.pathname || '')}
          />
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        );
      })}
    </div>
  ) : (
    ''
  );
}

const ColumnsBlockView = (props) => {
  const { coldata = empty(), block_title } = props.data;
  const columnList = getColumns(coldata);
  return (
    <div>
      {block_title ? <h3>{block_title}</h3> : ''}
      <Grid columns={columnList.length}>
        {columnList.map(([id, column], index) => {
          return (
            <Grid.Column className="demo-column" key={id}>
              <h4>{`Column ${index}`}</h4>
              {renderColumn(column, props)}
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
};

export default ColumnsBlockView;
