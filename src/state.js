import { atomFamily } from 'recoil';
import { emptyForm } from './utils';

export const formStateFamily = atomFamily({
  key: 'form-state',
  default: () => emptyForm(),
});
