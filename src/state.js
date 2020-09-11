import { atomFamily, selector, waitForAll, selectorFamily } from 'recoil';

export const formStateFamily = atomFamily({
  key: 'form-state',
  default: () => ({}),
});

export const formStateQuery = selectorFamily({
  key: 'form-state-query',
  get: (formIds) => ({ get }) => {
    const formStates = get(waitForAll(formIds.map(formStateFamily)));
    return formStates;
  },
  set: (formIds) => ({ set, get }, newFormData) => {
    const formStateAtoms = get(waitForAll(formIds.map(formStateFamily)));
    console.log('ff', formStateAtoms, formIds);
    // formStateAtoms.forEach((atom) => {
    //   set(atom, (prevState) => ({ ...prevState, ...newFormData }));
    // });
  },
});
