import React from 'react';
import { EditBlock } from '@plone/volto/components';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  getBlocks,
  // getBlocksFieldname,
  // getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
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

const BlocksForm = (props) => {
  const { pathname, onChangeField } = props;
  const [formData, setState] = React.useState({});
  const [selected, setSelected] = React.useState(props.selected);
  const blockList = getBlocks(formData);
  // const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

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
    setState({ formData: newFormData });
  };

  const onAddBlock = React.useCallbac((formData, type, index) => {
    const [id, newFormData] = addBlock(formData, type, index);
    setSelected(id);
    setState({ formData: newFormData });
  }, []);

  const onChangeBlock = (id, value) => {
    const newFormData = changeBlock(formData, id, value);
    setState({ formData: newFormData });
  };

  // TODO: get it as prop
  // const onChangeField = React.useCallback((id, value) => {
  //   setState({
  //     formData: {
  //       ...formData,
  //       // We need to catch also when the value equals false this fixes #888
  //       [id]: value || (value !== undefined && isBoolean(value)) ? value : null,
  //     },
  //   });
  // }, []);

  const onDeleteBlock = (id, selectPrev) => {
    const previous = previousBlockId(formData, id);

    setState({
      formData: deleteBlock(formData),
    });
    setSelected(selectPrev ? previous : null);
  };

  const onMoveBlock = (dragIndex, hoverIndex) => {
    this.setState({
      formData: moveBlock(formData, dragIndex, hoverIndex),
    });
  };

  return (
    <div className="ui container">
      <div>Empty column</div>
      <DragDropForm
        blockList={blockList}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          setState({
            formData: moveBlock(formData, source.index, destination.index),
          });
          return true;
        }}
        renderBlock={(block, index) => (
          <EditBlock
            block={block}
            data={block}
            handleKeyDown={handleKeyDown}
            id={block}
            index={index}
            key={block}
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
            selected={selected === block}
            type={block['@type']}
          />
        )}
      />
    </div>
  );
};

export default BlocksForm;
