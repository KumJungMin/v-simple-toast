<template>
  <teleport to="body">
    <div id="toast-container">
      <SequentialToast 
        ref="sequentialToast" 
        v-if="props.mode === MODE.SEQUENTIAL"
        :interval-time="props.intervalTime"
        :duration-time="props.durationTime"
        :toast-class="props.toastClass"
        :toast-style="props.toastStyle"
      />
      <StackToast 
        v-else 
        ref="stackToastRef" 
        :duration-time="props.durationTime"
        :max-count="maxCount" 
        :gap="props.gap"
        :toast-class="props.toastClass"
        :toast-style="props.toastStyle"
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
};

type ToastMode = typeof MODE[keyof typeof MODE];

type Props = {
  mode?: ToastMode;
  maxCount?: number;
  intervalTime?: number;
  durationTime?: number;
  toastClass?: string;
  toastStyle?: string;
  gap?: number;
};

const DEFAULT_INTERVAL_TIME = 200;
const DEFAULT_DURATION_TIME = 3000;

const props = withDefaults(defineProps<Props>(), {
  mode: 'sequential',
  maxCount: 5,
  intervalTime: DEFAULT_INTERVAL_TIME,
  durationTime: DEFAULT_DURATION_TIME,
  gap: 10
});

const sequentialToast = ref<any>(null);
const stackToastRef = ref<any>(null);

onMounted(() => {
  toastEventBus.on(symbol.addToast, onAddToast);
  toastEventBus.on(symbol.removeToast, onRemoveToast);
});
onUnmounted(() => {
  toastEventBus.off(symbol.removeToast, onAddToast);
  toastEventBus.off(symbol.removeToast, onRemoveToast);
});

function onAddToast(payload: { message: string }): void {
  if (props.mode === MODE.SEQUENTIAL) {
    sequentialToast.value?.addToast(payload.message);
  } else {
    stackToastRef.value?.addToast(payload.message);
  }
}

function onRemoveToast(payload: { id: number }): void {
  if (props.mode === MODE.SEQUENTIAL) {
    sequentialToast.value?.removeToast(payload.id);
  } else {
    stackToastRef.value?.removeToast(payload.id);
  }
}

/** if you want to use this component as a plugin, you can use this function */
defineExpose({
  addToast: (message: string) => {
    if (props.mode === MODE.SEQUENTIAL) {
      sequentialToast.value?.addToast(message);
    } else {
      stackToastRef.value?.addToast(message);
    }
  },
  removeToast: (id: number) => {
    if (props.mode === MODE.SEQUENTIAL) {
      sequentialToast.value?.removeToast(id);
    } else {
      stackToastRef.value?.removeToast(id);
    }
  }
});
</script>

<style scoped>
#toast-container {
  position: fixed;
  display: flex;
  width: 100%;
  min-height: 100%;
  left: 0;
  bottom: 0;
  padding-bottom: 40px;
  flex-direction: column-reverse;
  pointer-events: none;
  z-index: 9999;
}
</style>
