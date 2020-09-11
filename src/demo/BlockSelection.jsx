import React from 'react';
import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';
import { formStateFamily, formStateQuery } from '../state'; // , formStateSelectorFamily

// const ColumnSelection = (props) => {
//   const { column, globalselected, onSelect } = props;
//
//   const [formState, setFormState] = useRecoilState(formStateFamily(column));
//
//   const oldGlobalselected = React.useRef(globalselected);
//   const oldFormSelected = React.useRef(formState.selected);
//
//   React.useEffect(() => {
//     const { selected } = formState;
//
//   });
//
//   // if (selected && selected !== oldGlobalselected.current) {
//   //   onSelect(selected);
//   // }
//   // if (
//   //   globalselected === null &&
//   //   globalselected !== oldGlobalselected.current &&
//   //   formState.selected
//   // ) {
//   //   setFormState({ selected: null });
//   //   return;
//   // }
//   // React.useEffect(() => {
//   //   if (globalselected !== oldGlobalselected.current) {
//   //     oldGlobalselected.current = globalselected;
//   //     setFormState({ selected: globalselected });
//   //   }
//   // });
//
//   return <div>{JSON.stringify(formState)}</div>;
// };

const BlockSelection = (props) => {
  const { children, block, columns, onSelectBlock } = props;
  const blockNode = React.useRef(null);
  const attachedEvent = React.useRef();
  const [selected, setSelected] = React.useState();

  const [formStates, setFormStates] = useRecoilState(formStateQuery(columns));

  const focusBlock = React.useCallback(() => {
    console.log('focus null', block);
    // onSelectBlock(block);
    setSelected(null);
    setFormStates({ selected: null });
  }, [block, setFormStates, columns]); // , onSelectBlock

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

  //  {columns.map((col) => (
  //    <ColumnSelection
  //      column={col}
  //      key={`col-${block}-${col}`}
  //      globalselected={selected}
  //      onSelect={(id) => {
  //        setSelected(id);
  //      }}
  //    />
  //  ))}

  return (
    <div ref={blockNode}>
      <div>Column selection: {selected}</div>
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
