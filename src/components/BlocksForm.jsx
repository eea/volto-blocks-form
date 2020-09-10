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
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import DragDropForm from './DragDropForm';
import { deleteBlock, moveItem } from '../utils';
import { settings } from '~/config';
import { v4 as uuid } from 'uuid';

const BlocksForm = (props) => {
  const { pathname } = props;
  const { formData } = this.state;
  const [selected, setSelected] = React.useState(props.selected);
  const blockList = getBlocks(formData);
  // const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  const onMoveItem = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    this.setState({
      formData: moveItem(formData, source.index, destination.index),
    });
    return true;
  };

  const handleKeyDown = React.useCallback(
    (
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
    },
    [],
  );

  const onFocusPreviousBlock = React.useCallback((currentBlock, blockNode) => {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const currentIndex = this.state.formData[
      blocksLayoutFieldname
    ].items.indexOf(currentBlock);

    if (currentIndex === 0) {
      // We are already at the top block don't do anything
      return;
    }
    const newindex = currentIndex - 1;
    blockNode.blur();

    this.onSelectBlock(
      this.state.formData[blocksLayoutFieldname].items[newindex],
    );
  }, []);

  /**
   *
   * @method onFocusNextBlock
   * @param {string} currentBlock The id of the current block
   * @param {node} blockNode The id of the current block
   * @returns {undefined}
   */
  const onFocusNextBlock = React.useCallback((currentBlock, blockNode) => {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const currentIndex = this.state.formData[
      blocksLayoutFieldname
    ].items.indexOf(currentBlock);

    if (
      currentIndex ===
      this.state.formData[blocksLayoutFieldname].items.length - 1
    ) {
      // We are already at the bottom block don't do anything
      return;
    }

    const newindex = currentIndex + 1;
    blockNode.blur();

    this.onSelectBlock(
      this.state.formData[blocksLayoutFieldname].items[newindex],
    );
  }, []);

  const onAddBlock = React.useCallbac((type, index) => {
    const id = uuid();
    const idTrailingBlock = uuid();
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[blocksLayoutFieldname].items.length;
    const insert = index === -1 ? totalItems : index;

    this.setState({
      formData: {
        ...this.state.formData,
        [blocksLayoutFieldname]: {
          items: [
            ...this.state.formData[blocksLayoutFieldname].items.slice(
              0,
              insert,
            ),
            id,
            ...(type !== settings.defaultBlockType ? [idTrailingBlock] : []),
            ...this.state.formData[blocksLayoutFieldname].items.slice(insert),
          ],
        },
        [blocksFieldname]: {
          ...this.state.formData[blocksFieldname],
          [id]: {
            '@type': type,
          },
          ...(type !== settings.defaultBlockType && {
            [idTrailingBlock]: {
              '@type': settings.defaultBlockType,
            },
          }),
        },
      },
      selected: id,
    });

    return id;
  }, []);

  const onChangeBlock = React.useCallback((id, value) => {
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    this.setState({
      formData: {
        ...this.state.formData,
        [blocksFieldname]: {
          ...this.state.formData[blocksFieldname],
          [id]: value || null,
        },
      },
    });
  }, []);

  const onMutateBlock = React.useCallback((id, value) => {
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const index =
      this.state.formData[blocksLayoutFieldname].items.indexOf(id) + 1;

    // Test if block at index is already a placeholder (trailing) block
    const trailId = this.state.formData[blocksLayoutFieldname].items[index];
    if (trailId) {
      const block = this.state.formData[blocksFieldname][trailId];
      if (!blockHasValue(block)) {
        this.setState({
          formData: {
            ...this.state.formData,
            [blocksFieldname]: {
              ...this.state.formData[blocksFieldname],
              [id]: value || null,
            },
          },
        });
        return;
      }
    }

    const idTrailingBlock = uuid();
    this.setState({
      formData: {
        ...this.state.formData,
        [blocksFieldname]: {
          ...this.state.formData[blocksFieldname],
          [id]: value || null,
          [idTrailingBlock]: {
            '@type': settings.defaultBlockType,
          },
        },
        [blocksLayoutFieldname]: {
          items: [
            ...this.state.formData[blocksLayoutFieldname].items.slice(0, index),
            idTrailingBlock,
            ...this.state.formData[blocksLayoutFieldname].items.slice(index),
          ],
        },
      },
    });
  }, []);

  // TODO: get it as prop
  const onChangeField = React.useCallback((id, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        // We need to catch also when the value equals false this fixes #888
        [id]: value || (value !== undefined && isBoolean(value)) ? value : null,
      },
    });
  }, []);

  const onDeleteBlock = (id, selectPrev) => {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);

    this.setState({
      formData: deleteBlock(formData),
      selected: selectPrev
        ? this.state.formData[blocksLayoutFieldname].items[
            this.state.formData[blocksLayoutFieldname].items.indexOf(id) - 1
          ]
        : null,
    });
  };

  return (
    <div className="ui container">
      <div>Empty column</div>
      <DragDropForm
        blockList={blockList}
        onMoveItem={onMoveItem}
        renderBlock={(block, index) => (
          <EditBlock
            id={block}
            index={index}
            type={block['@type']}
            key={block}
            handleKeyDown={handleKeyDown}
            onAddBlock={onAddBlock}
            onChangeBlock={onChangeBlock}
            onMutateBlock={onMutateBlock}
            onChangeField={onChangeField}
            onDeleteBlock={onDeleteBlock}
            onSelectBlock={(id) => setSelected(id)}
            onMoveBlock={this.onMoveBlock}
            onFocusPreviousBlock={onFocusPreviousBlock}
            onFocusNextBlock={onFocusNextBlock}
            properties={formData}
            data={block}
            pathname={pathname}
            block={block}
            selected={selected === block}
          />
        )}
      />
    </div>
  );
};

export default BlocksForm;
