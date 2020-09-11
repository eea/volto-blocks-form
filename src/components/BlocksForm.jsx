import React from 'react';
import { useRecoilState } from 'recoil';
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
import { formStateFamily } from '../state';
import { settings } from '~/config';
import EditBlockWrapper from './EditBlockWrapper';

const DEBUG = false;

const BlocksForm = (props) => {
  const { pathname, formId, onChangeField, properties, setFormData } = props;

  // due to HMR, this will yield warnings in developer console, see recoil issues on that
  const [state, setState] = useRecoilState(formStateFamily(formId));
  // const [state, setState] = React.useState({});
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
      onAddBlock(settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  };

  const onFocusPreviousBlock = (currentBlock, blockNode) => {
    const prev = previousBlockId(properties, currentBlock);
    if (prev === null) return;

    blockNode.blur();

    setState({ ...state, selected: prev });
  };

  const onFocusNextBlock = (currentBlock, blockNode) => {
    const next = nextBlockId(properties, currentBlock);
    if (next === null) return;

    blockNode.blur();

    setState({ ...state, selected: next });
  };

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(properties, id, value);
    setFormData(formId, newFormData);
  };

  const onAddBlock = (type, index) => {
    const [id, newFormData] = addBlock(properties, type, index);
    setFormData(formId, newFormData);
    return id;
  };

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(properties, id, value);
    setFormData(formId, newFormData);
  };

  const onDeleteBlock = (id, selectPrev) => {
    const previous = previousBlockId(properties, id);

    setFormData(formId, deleteBlock(properties));

    setState({ ...state, selected: selectPrev ? previous : null });
  };

  const onMoveBlock = (dragIndex, hoverIndex) => {
    setFormData(formId, moveBlock(properties, dragIndex, hoverIndex));
  };

  return (
    <div className="ui container">
      {DEBUG ? <pre>{JSON.stringify(properties, null, 2)}</pre> : ''}
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
        renderBlock={(block, blockId, index, draginfo) => (
          <EditBlockWrapper
            block={block}
            blockId={blockId}
            draginfo={draginfo}
            selected={state.selected === blockId}
          >
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
              onSelectBlock={(id) => setState({ ...state, selected: id })}
              pathname={pathname}
              properties={properties}
              selected={state.selected === blockId}
              type={block['@type']}
            />
          </EditBlockWrapper>
        )}
      />
    </div>
  );
};

export default BlocksForm;
