<template>
  <div class="modalWrapper" @click.self="closeModal">
    <div class="modal">
      <div class="modal__header">
        <span>{{ title }}</span>
        <span class="modal__close" @click="closeModal">⛌</span>
      </div>

      <div class="modal__content">
        <slot/>
      </div>

      <div class="modal__footer">
        <button class="del" @click="closeModal">{{ leftNameBtn }}</button>
        <button class="btn" @click="emit('addToCart')">{{ rightNameBtn }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IModal {
  title?: string;
  leftNameBtn?: string;
  rightNameBtn?: string;
}

const props = withDefaults(defineProps<IModal>(), {
  title: 'Название',
  leftNameBtn: 'Закрыть',
  rightNameBtn: 'Хорошо',
});

const emit = defineEmits<{
  (e: 'addToCart'): void
  (e: 'close'): void
}>();

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.modalWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(132, 132, 132, .8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  max-width: 400px;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 17px 0 #cccccc;
  padding: 16px;
  z-index: 1000;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__close {
    cursor: pointer;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & button {
      margin: 0 5px;
    }
  }
}
</style>