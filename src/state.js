import { atomFamily } from 'recoil';
import { emptyForm } from './utils';

export const formStateFamily = atomFamily({
  key: 'form-state',
  default: () => emptyForm(),
});

// import { useRecoilState } from 'recoil';
// import { formStateFamily } from '../state';
// const [formData, setFormData] = useRecoilState(formStateFamily(formId));
