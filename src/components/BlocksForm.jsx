import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { Component } from 'react';
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
} from 'lodash';
import { EditBlock, Icon } from '@plone/volto/components';
import dragSVG from '@plone/volto/icons/drag.svg';

class BlocksForm extends Component {
  render() {
    const renderBlocks = [];
    const blocksDict = {};
    const { formData, placeholderProps } = this.state;

    return (
      <div className="ui container">
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.handleDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <Droppable droppableId="edit-form">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ position: 'relative' }}
              >
                {map(renderBlocks, (block, index) => (
                  <Draggable draggableId={block} index={index} key={block}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`block-editor-${blocksDict[block]['@type']}`}
                      >
                        <div style={{ position: 'relative' }}>
                          <div
                            style={{
                              visibility:
                                this.state.selected === block &&
                                !this.hideHandler(blocksDict[block])
                                  ? 'visible'
                                  : 'hidden',
                              display: 'inline-block',
                            }}
                            {...provided.dragHandleProps}
                            className="drag handle wrapper"
                          >
                            <Icon name={dragSVG} size="18px" />
                          </div>

                          <EditBlock
                            id={block}
                            index={index}
                            type={blocksDict[block]['@type']}
                            key={block}
                            handleKeyDown={this.handleKeyDown}
                            onAddBlock={this.onAddBlock}
                            onChangeBlock={this.onChangeBlock}
                            onMutateBlock={this.onMutateBlock}
                            onChangeField={this.onChangeField}
                            onDeleteBlock={this.onDeleteBlock}
                            onSelectBlock={this.onSelectBlock}
                            onMoveBlock={this.onMoveBlock}
                            onFocusPreviousBlock={this.onFocusPreviousBlock}
                            onFocusNextBlock={this.onFocusNextBlock}
                            properties={formData}
                            data={blocksDict[block]}
                            pathname={this.props.pathname}
                            block={block}
                            selected={this.state.selected === block}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {!isEmpty(placeholderProps) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: `${placeholderProps.clientY}px`,
                      height: `${placeholderProps.clientHeight + 18}px`,
                      background: '#eee',
                      width: `${placeholderProps.clientWidth}px`,
                      borderRadius: '3px',
                    }}
                  />
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default BlocksForm;
