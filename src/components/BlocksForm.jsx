import React from 'react';
import { EditBlock } from '@plone/volto/components';
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

// import { useRecoilState } from 'recoil';
// import { formStateFamily } from '../state';
// const [formData, setFormData] = useRecoilState(formStateFamily(formId));

const BlocksForm = (props) => {
  const { pathname, formId, onChangeField, properties, setFormData } = props;
  console.log('formId', formId);
  const [selected, setSelected] = React.useState(props.selected);
  const blockList = getBlocks(properties);

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
      console.log('onaddblock');
      onAddBlock(settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onFocusPreviousBlock = (currentBlock, blockNode) => {
    const prev = previousBlockId(properties, currentBlock);
    if (prev === null) return;

    blockNode.blur();

    setSelected(prev);
  };

  const onFocusNextBlock = (currentBlock, blockNode) => {
    const next = nextBlockId(properties, currentBlock);
    if (next === null) return;

    blockNode.blur();

    setSelected(next);
  };

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(properties, id, value);
    setFormData(formId, newFormData);
  };

  const onAddBlock = (type, index) => {
    const [id, newFormData] = addBlock(properties, type, index);
    setSelected(id);
    console.log(JSON.stringify(properties), id);
    console.log(JSON.stringify(newFormData));
    setFormData(formId, newFormData);
  };

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(properties, id, value);
    setFormData(formId, newFormData);
  };

  const onDeleteBlock = (id, selectPrev) => {
    const previous = previousBlockId(properties, id);

    setFormData(formId, deleteBlock(properties));
    setSelected(selectPrev ? previous : null);
  };

  const onMoveBlock = (dragIndex, hoverIndex) => {
    setFormData(formId, moveBlock(properties, dragIndex, hoverIndex));
  };

  return (
    <div className="ui container">
      <pre>{JSON.stringify(properties, null, 2)}</pre>
      <DragDropForm
        blockList={blockList}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          setFormData(
            formId,
            moveBlock(properties, source.index, destination.index),
          );
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
            properties={properties}
            selected={selected === blockId}
            type={block['@type']}
          />
        )}
      />
    </div>
  );
};

export default BlocksForm;
