import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMembers,
  createMember,
  updateMember,
  renewMember,
  archiveMember,
  forceDeleteMember,
  restoreMember,
  setFilters,
  setSorting,
  clearError,
} from '../store/slices/memberSlice';
import { fetchMemberships } from '../store/slices/membershipSlice';

export const useMembers = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters, sorting } = useSelector((state) => state.members);
  const { list: memberships } = useSelector((state) => state.memberships);

  useEffect(() => {
    dispatch(fetchMembers({ ...filters, ...sorting }));
    dispatch(fetchMemberships());
  }, [dispatch, filters, sorting]);

  const addMember = async (memberData) => {
    const result = await dispatch(createMember(memberData));
    if (!result.error) {
      dispatch(fetchMembers({ ...filters, ...sorting }));
    }
    return result;
  };

  const editMember = async (id, memberData) => {
    const result = await dispatch(updateMember({ id, data: memberData }));
    if (!result.error) {
      dispatch(fetchMembers({ ...filters, ...sorting }));
    }
    return result;
  };

  const renewMembership = async (id, membershipId) => {
    const result = await dispatch(renewMember({ id, membershipId }));
    if (!result.error) {
      dispatch(fetchMembers({ ...filters, ...sorting }));
    }
    return result;
  };

  const archive = async (id) => {
    const result = await dispatch(archiveMember(id));
    if (!result.error) {
      dispatch(fetchMembers({ ...filters, ...sorting }));
    }
    return result;
  };

  const forceDelete = async (id) => {
    const result = await dispatch(forceDeleteMember(id));
    if (!result.error) {
      dispatch(fetchMembers({ ...filters, ...sorting }));
    }
    return result;
  };

  const restore = async (id) => {
    const result = await dispatch(restoreMember(id));
    if (!result.error) {
      dispatch(fetchMembers({ ...filters, ...sorting }));
    }
    return result;
  };

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const updateSorting = (newSorting) => {
    dispatch(setSorting(newSorting));
  };

  const clearMemberError = () => {
    dispatch(clearError());
  };

  return {
    members: list,
    memberships,
    loading,
    error,
    filters,
    sorting,
    addMember,
    editMember,
    renewMembership,
    archive,
    forceDelete,
    restore,
    updateFilters,
    updateSorting,
    clearError: clearMemberError,
    refresh: () => dispatch(fetchMembers({ ...filters, ...sorting })),
  };
};