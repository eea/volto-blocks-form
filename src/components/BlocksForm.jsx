import React from 'react';
import { EditBlock } from '@plone/volto/components';
import { useRecoilState } from 'recoil';
import { getBlocks } from '@plone/volto/helpers';
import DragDropForm from './DragDropForm';
import {
  addBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '../utils';
import { settings } from '~/config';
import { formStateFamily } from '../state';

const BlocksForm = (props) => {
  console.log('blocksForm', props);
  const { pathname, formId, onChangeField } = props;
  const [formData, setFormData] = useRecoilState(formStateFamily(formId));
  const [selected, setSelected] = React.useState(props.selected);
  const blockList = getBlocks(formData);

  const handleKeyDown = (
    e,
    index,
    block,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) => {
    if (e.key === 'ArrowUp' && !disableArrowUp) {
      onFocusPreviousBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown) {
      onFocusNextBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter) {
      onAddBlock(settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onFocusPreviousBlock = (currentBlock, blockNode) => {
    const prev = previousBlockId(formData, currentBlock);
    if (prev === null) return;

    blockNode.blur();

    setSelected(prev);
  };

  const onFocusNextBlock = (currentBlock, blockNode) => {
    const next = nextBlockId(formData, currentBlock);
    if (next === null) return;

    blockNode.blur();

    setSelected(next);
  };

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(formData, id, value);
    setFormData(newFormData);
  };

  const onAddBlock = (type, index) => {
    const [id, newFormData] = addBlock(formData, type, index);
    setSelected(id);
    setFormData(newFormData);
  };

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(formData, id, value);
    setFormData(newFormData);
  };

  const onDeleteBlock = (id, selectPrev) => {
    const previous = previousBlockId(formData, id);

    setFormData(deleteBlock(formData));
    setSelected(selectPrev ? previous : null);
  };

  const onMoveBlock = (dragIndex, hoverIndex) => {
    setFormData(moveBlock(formData, dragIndex, hoverIndex));
  };

  return (
    <div className="ui container">
      <DragDropForm
        blockList={blockList}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          setFormData(moveBlock(formData, source.index, destination.index));
          return true;
        }}
        renderBlock={(block, blockId, index) => (
          <EditBlock
            block={blockId}
            data={block}
            handleKeyDown={handleKeyDown}
            id={blockId}
            index={index}
            key={blockId}
            onAddBlock={onAddBlock}
            onChangeBlock={onChangeBlock}
            onChangeField={onChangeField}
            onDeleteBlock={onDeleteBlock}
            onFocusNextBlock={onFocusNextBlock}
            onFocusPreviousBlock={onFocusPreviousBlock}
            onMoveBlock={onMoveBlock}
            onMutateBlock={onMutateBlock}
            onSelectBlock={(id) => setSelected(id)}
            pathname={pathname}
            properties={formData}
            selected={selected === blockId}
            type={block['@type']}
          />
        )}
      />
    </div>
  );
};

export default BlocksForm;
