import { useSelector } from 'react-redux';
import { setSearch } from './controls-slice';

import { selectSearch } from './controls-selectors';
import { useAppDispatch } from 'store';
import { ChangeEventHandler } from 'react';

type OnSearch = React.ChangeEventHandler<HTMLInputElement>;

export const useSearch = (): [string, OnSearch] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const handleSearch: OnSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [search, handleSearch];
};
