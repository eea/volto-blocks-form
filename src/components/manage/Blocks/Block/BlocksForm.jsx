import React from 'react';
import EditBlock from './Edit';
import { DragDropList } from '@eeacms/volto-blocks-form/components';
import { getBlocks } from '@plone/volto/helpers';
import {
  addBlock,
  changeBlock,
  deleteBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
} from '@eeacms/volto-blocks-form/helpers';
import { settings } from '~/config';
// import EditBlockWrapper from './EditBlockWrapper';

const BlocksForm = (props) => {
  const mounted = React.useRef();
  React.useEffect(() => {
    if (!mounted.current) console.log('mount block form');
    mounted.current = true;
  });
  const {
    pathname,
    onChangeField,
    properties,
    onChangeFormData,
    renderBlock,
    selectedBlock,
    onSelectBlock,
    allowedBlocks,
    title,
    description,
    manage,
    children,
  } = props;

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

    onSelectBlock(prev);
  };

  const onFocusNextBlock = (currentBlock, blockNode) => {
    const next = nextBlockId(properties, currentBlock);
    if (next === null) return;

    blockNode.blur();

    onSelectBlock(next);
  };

  const onMutateBlock = (id, value) => {
    const newFormData = mutateBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  const onAddBlock = (type, index) => {
    const [id, newFormData] = addBlock(properties, type, index);
    onChangeFormData(newFormData);
    return id;
  };

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(properties, id, value);
    onChangeFormData(newFormData);
  };

  const onDeleteBlock = (id, selectPrev) => {
    const previous = previousBlockId(properties, id);

    const newFormData = deleteBlock(properties, id);
    onChangeFormData(newFormData);

    onSelectBlock(selectPrev ? previous : null);
  };

  const onMoveBlock = (dragIndex, hoverIndex) => {
    const newFormData = moveBlock(properties, dragIndex, hoverIndex);
    onChangeFormData(newFormData);
  };
  return (
    <div className="ui container blocks-form" title={title}>
      <DragDropList
        childList={blockList}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          const newFormData = moveBlock(
            properties,
            source.index,
            destination.index,
          );
          onChangeFormData(newFormData);
          // setState({ ...state, selected: selectPrev ? previous : null });
          return true;
        }}
      >
        {(dragProps) => {
          const { child, childId, index } = dragProps;
          return children(
            dragProps,
            <EditBlock
              block={childId}
              key={childId}
              id={childId}
              data={child}
              handleKeyDown={handleKeyDown}
              index={index}
              onAddBlock={onAddBlock}
              onChangeBlock={onChangeBlock}
              onChangeField={onChangeField}
              onDeleteBlock={onDeleteBlock}
              onFocusNextBlock={onFocusNextBlock}
              onFocusPreviousBlock={onFocusPreviousBlock}
              onMoveBlock={onMoveBlock}
              onMutateBlock={onMutateBlock}
              onSelectBlock={onSelectBlock}
              pathname={pathname}
              properties={properties}
              selected={selectedBlock === childId}
              type={child['@type']}
              manage={manage}
              allowedBlocks={allowedBlocks}
              formTitle={title}
              formDescription={description}
            />,
          );
        }}
      </DragDropList>
    </div>
  );
};

export default BlocksForm;
