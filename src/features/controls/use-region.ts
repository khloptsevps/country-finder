import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { setRegion } from './controls-slice';
import { selectRegion } from './controls-selectors';
import { CountryOption } from './CustomSelect';
import { SingleValue } from 'react-select';
import { Region } from 'types';

type OnSelect = (reg: SingleValue<CountryOption>) => void;

export const useRegion = (): [Region | '', OnSelect] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);

  const handleSelect: OnSelect = (reg) => {
    if (reg) {
      dispatch(setRegion(reg.value));
    } else {
      dispatch(setRegion(''));
    }
  };

  return [region, handleSelect];
};
