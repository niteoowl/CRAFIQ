export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const STORAGE_KEY = 'crafiq_data';

export const storage = {
    get(key) {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            const parsed = data ? JSON.parse(data) : {};
            return key ? parsed[key] : parsed;
        } catch (e) {
            console.error('Storage Error', e);
            return null;
        }
    },
    set(key, value) {
        try {
            const current = this.get() || {};
            current[key] = value;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        } catch (e) {
            console.error('Storage Save Error', e);
        }
    }
};
