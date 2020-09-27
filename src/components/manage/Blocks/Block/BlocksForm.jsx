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
      {blockList.map(([blockId, block], index) =>
        children(
          {
            block,
            blockId,
            draginfo: {},
            selected: selectedBlock === blockId,
            onMutateBlock,
            onDeleteBlock,
            allowedBlocks,
          },

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
            onSelectBlock={onSelectBlock}
            pathname={pathname}
            properties={properties}
            selected={selectedBlock === blockId}
            type={block['@type']}
            manage={manage}
            allowedBlocks={allowedBlocks}
            formTitle={title}
            formDescription={description}
          />,
        ),
      )}
    </div>
  );

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
        renderChild={(block, blockId, index, draginfo) =>
          renderBlock ? (
            renderBlock(block, blockId, index, draginfo)
          ) : (
            <BlockWrapper
              key={blockId}
              block={block}
              blockId={blockId}
              draginfo={draginfo}
              selected={selectedBlock === blockId}
              onDeleteBlock={onDeleteBlock}
              onMutateBlock={onMutateBlock}
              allowedBlocks={allowedBlocks}
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
                onSelectBlock={onSelectBlock}
                pathname={pathname}
                properties={properties}
                selected={selectedBlock === blockId}
                type={block['@type']}
                manage={manage}
                allowedBlocks={allowedBlocks}
                formTitle={title}
                formDescription={description}
              />
            </BlockWrapper>
          )
        }
      />
    </div>
  );
};

export default BlocksForm;
