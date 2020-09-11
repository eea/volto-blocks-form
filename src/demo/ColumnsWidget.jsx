import React from 'react';
import move from 'lodash-move';
import DragDropList from '../components/DragDropList';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import plusSVG from '@plone/volto/icons/circle-plus.svg';

export function moveColumn(formData, source, destination) {
  return {
    ...formData,
    columns_layout: {
      items: move(formData.columns_layout?.items, source, destination),
    },
  };
}

const ColumnsWidget = (props) => {
  console.log(props);
  const { value = {}, id, onChange } = props;
  const { columns = {} } = value;
  const columnsList = (value.columns_layout.items || []).map((id) => [
    id,
    columns[id],
  ]);
  return (
    <FormFieldWrapper
      {...props}
      draggable={false}
      className="drag-drop-list-widget"
    >
      <div className="columns-area">
        <DragDropList
          childList={columnsList}
          onMoveItem={(result) => {
            const { source, destination } = result;
            if (!destination) {
              return;
            }
            const newFormData = moveColumn(
              value,
              source.index,
              destination.index,
            );
            onChange(id, newFormData);
            return true;
          }}
          renderChild={(child, childId, index, draginfo) => (
            <div ref={draginfo.innerRef} {...draginfo.draggableProps}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    visibility: 'visible',
                    display: 'inline-block',
                  }}
                  {...draginfo.dragHandleProps}
                  className="drag handle wrapper"
                >
                  <Icon name={dragSVG} size="18px" />
                </div>
                <div className="column-area">
                  <div className="label">Column {index}</div>
                  <button
                    onClick={() => {
                      console.log('click');
                    }}
                  >
                    <Icon name={trashSVG} size="18px" />
                  </button>
                </div>
              </div>
            </div>
          )}
        />
        <button
          onClick={() => {
            console.log('click');
          }}
        >
          <Icon name={plusSVG} size="18px" />
        </button>
      </div>
    </FormFieldWrapper>
  );
};

export default ColumnsWidget;
