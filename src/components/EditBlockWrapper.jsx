import { Icon } from '@plone/volto/components';
import dragSVG from '@plone/volto/icons/drag.svg';
import React from 'react';
import { blockHasValue } from '@plone/volto/helpers';

const EditBlockWrapper = (props) => {
  const { provided, block, selected, children } = props;

  const hideHandler = React.useCallback((data) => {
    return !blockHasValue(data);
  }, []);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={`block-editor-${block['@type']}`}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: selected && !hideHandler(block) ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          {...provided.dragHandleProps}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default EditBlockWrapper;
