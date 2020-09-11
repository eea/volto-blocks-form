import { atomFamily, waitForAll, selectorFamily } from 'recoil';

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
  set: (formIds) => ({ set }, newFormData) => {
    const formStateAtoms = formIds.map(formStateFamily);
    formStateAtoms.forEach((atom) => {
      set(atom, (prevState) => {
        return { ...prevState, ...newFormData };
      });
    });
  },
});
