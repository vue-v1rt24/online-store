import {ref} from 'vue';

export const UseModal = () => {
    const isModalVisible = ref(false);

    const modalOpen = () => {
        isModalVisible.value = true;
    };

    return {
        isModalVisible,
        modalOpen,
    };
};