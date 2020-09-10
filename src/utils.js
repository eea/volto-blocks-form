import { v4 as uuid } from 'uuid';
import { settings } from '~/config';
import {
  findIndex,
  isEmpty,
  keys,
  map,
  mapValues,
  omit,
  pickBy,
  uniq,
  without,
  move,
  isBoolean,
} from 'lodash';
// import isBoolean from 'lodash/isBoolean';
// import move from 'lodash-move';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  difference,
  blockHasValue,
} from '@plone/volto/helpers';

export function emptyForm() {
  const id = uuid();
  return {
    blocks: {
      [id]: {
        '@type': settings.defaultBlockType,
      },
    },
    blocks_layout: { items: [id] },
  };
}

export function moveItem(formData, source, destination) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  return {
    ...formData,
    [blocksLayoutFieldname]: {
      items: move(
        this.state.formData[blocksLayoutFieldname].items,
        source.index,
        destination.index,
      ),
    },
  };
}

export const deleteBlock = (formData, blockId) => {
  const blocksFieldname = getBlocksFieldname(this.state.formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);

  return {
    ...formData,
    [blocksLayoutFieldname]: {
      items: without(formData[blocksLayoutFieldname].items, blockId),
    },
    [blocksFieldname]: omit(formData[blocksFieldname], [blockId]),
  };
};
