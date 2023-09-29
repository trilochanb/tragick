import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useAuthStore = create((set, get) => ({
    allUserData: null, // Use this to store all user data
    loading: false,
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
        email : get().allUserData?.email || null,
        first_name : get().allUserData?.first_name || null,
        last_name : get().allUserData?.last_name || null,
        vendor_name : get().allUserData?.vendor_name || null,
        location_lat : get().allUserData?.location_lat || null,
        location_long : get().allUserData?.location_long || null,
        balance: get().allUserData?.balance || null
    }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => get().allUserData !== null,
}));

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', useAuthStore);
}

export { useAuthStore };
