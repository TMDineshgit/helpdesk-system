import { create } from 'zustand';

const useFilterStore = create((set) => ({
  search: '',
  status: 'ALL',
  priority: 'ALL',
  category: 'ALL',

  setSearch: (search) => set({ search }),

  setStatus: (status) => set({ status }),

  setPriority: (priority) => set({ priority }),

  setCategory: (category) => set({ category }),

  resetFilters: () =>
    set({
      search: '',
      status: 'ALL',
      priority: 'ALL',
      category: 'ALL',
    }),
}));

export default useFilterStore;