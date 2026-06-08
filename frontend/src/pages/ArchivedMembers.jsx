import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Members from './Members';
import { setFilters } from '../store/slices/memberSlice';

const ArchivedMembers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // set archived filter on mount
    dispatch(setFilters({ status: 'archived' }));
    return () => {
      // reset to all when leaving
      dispatch(setFilters({ status: 'all' }));
    };
  }, [dispatch]);

  return <Members />;
};

export default ArchivedMembers;
