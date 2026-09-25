import { create } from 'zustand';

const useNotificationStore = create((set) => ({

  notifications: [],

    addNotification: (notification) =>
        set((state) => ({ notifications: [...state.notifications, {id: Date.now(), type: notification.type, duration: 3000, ...notification}], })),

    removeNotification: (id) =>
        set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
    })),

    clearNotifications: () => set({ notifications: [] }),

}));

export default useNotificationStore;