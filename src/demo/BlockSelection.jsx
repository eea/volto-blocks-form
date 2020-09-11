import React from 'react';
import { useRecoilState } from 'recoil';
import { formStateQuery } from '../state'; // , formStateSelectorFamily

const BlockSelection = (props) => {
  const { children, block, columns, selected } = props;
  const blockNode = React.useRef(null);
  const attachedEvent = React.useRef();

  const [formStates, setFormStates] = useRecoilState(formStateQuery(columns));

  const focusBlock = React.useCallback(
    (evt) => {
      // console.log('focus null', block, evt);
      // TODO: optimize so that we only set to null when needed
      // Right now there's an extra set to null before it's properly set by the
      // form
      setFormStates({ selected: null });
    },
    [setFormStates],
  );

  React.useEffect(() => {
    if (!selected) {
      setFormStates({ selected: null });
    }
  }, [setFormStates, selected]);

  React.useEffect(() => {
    const { current = {} } = blockNode;

    if (!attachedEvent.current && current) {
      current.addEventListener('click', focusBlock, false);
      attachedEvent.current = true;
    }

    return () => {
      current.removeEventListener('mousedown', focusBlock, false);
    };
  });

  return (
    <div ref={blockNode}>
      <ul>
        {(formStates || []).map((s) => (
          <li>{JSON.stringify(s)}</li>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default BlockSelection;
