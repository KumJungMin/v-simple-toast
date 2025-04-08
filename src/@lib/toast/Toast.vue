<template>
  <teleport to="body">
    <div class="toast-container">
      <SequentialToast 
        v-if="props.mode === MODE.SEQUENTIAL"
        ref="seqToastRef" 
      />
      <StackToast 
        v-else 
        ref="stackToastRef" 
        :max-toast-count="maxToastCount" 
      />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, defineExpose } from 'vue';
import SequentialToast from './components/SequentialToast.vue';
import StackToast from './components/StackToast.vue';
import toastEventBus from '../helpers/eventBus';

import symbol from './symbol';

const MODE = {
  SEQUENTIAL: 'sequential',
  STACK: 'stack'
} as const;

type ToastMode = typeof MODE[keyof typeof MODE];

const props = defineProps<{
  mode?: ToastMode;
  maxToastCount?: number;
}>();
const mode = props.mode || MODE.SEQUENTIAL;
const maxToastCount = props.maxToastCount || 5;

const seqToastRef = ref<any>(null);
const stackToastRef = ref<any>(null);

function onAddToast(payload: { message: string }): void {
  if (mode === MODE.SEQUENTIAL) {
    seqToastRef.value?.addToast(payload.message);
  } else {
    stackToastRef.value?.addToast(payload.message);
  }
}

function onRemoveToast(payload: { id: number }): void {
  if (mode === MODE.SEQUENTIAL) {
    seqToastRef.value?.removeToast(payload.id);
  } else {
    stackToastRef.value?.removeToast(payload.id);
  }
}

onMounted(() => {
  toastEventBus.on(symbol.addToast, onAddToast);
  toastEventBus.on(symbol.removeToast, onRemoveToast);
});
onUnmounted(() => {
  toastEventBus.off(symbol.removeToast, onAddToast);
  toastEventBus.off(symbol.removeToast, onRemoveToast);
});

/** if you want to use this component as a plugin, you can use this function */
defineExpose({
  addToast: (message: string) => {
    if (mode === MODE.SEQUENTIAL) {
      seqToastRef.value?.addToast(message);
    } else {
      stackToastRef.value?.addToast(message);
    }
  },
  removeToast: (id: number) => {
    if (mode === MODE.SEQUENTIAL) {
      seqToastRef.value?.removeToast(id);
    } else {
      stackToastRef.value?.removeToast(id);
    }
  }
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
