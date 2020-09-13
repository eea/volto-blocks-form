import React from 'react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { useRecoilState } from 'recoil';
import { formStateQuery } from '../state'; // , formStateSelectorFamily

const DEBUG = false;

const BlockSelection = (props) => {
  const { children, columns, selected } = props;
  const blockNode = React.useRef(null);
  const innerNode = React.useRef(null);

  const [formStates, setFormStates] = useRecoilState(formStateQuery(columns));

  const focusBlock = React.useCallback(
    (evt) => {
      if (
        doesNodeContainClick(blockNode.current, evt) &&
        !doesNodeContainClick(innerNode.current, evt)
      ) {
        setFormStates({ selected: null });
      }
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

    current.addEventListener('mousedown', focusBlock, false);

    return () => {
      current.removeEventListener('mousedown', focusBlock, false);
    };
  });

  return (
    <div ref={blockNode} className="outer-selection-wrapper">
      {DEBUG ? (
        <ul>
          {(formStates || []).map((s, i) => (
            <li key={i}>{JSON.stringify(s)}</li>
          ))}
        </ul>
      ) : (
        ''
      )}
      {props.title}
      <div className="inner-selection-wrapper" ref={innerNode}>
        {children}
      </div>
    </div>
  );
};

export default BlockSelection;
