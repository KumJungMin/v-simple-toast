<template>
  <transition-group name="toast-slide" tag="div">
    <div v-for="toast in stackToasts" :key="toast.id" class="toast" :class="props.toastClass" :style="props.toastStyle">
      {{ toast.message }}
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, defineExpose, onUnmounted, defineProps } from 'vue';

interface ToastMessage {
  id: number;
  message: string;
}

const props = defineProps<{ durationTime:number; maxToastCount?: number, toastClass?: string, toastStyle?: string }>();
const maxToastCount = props.maxToastCount || 5;

let messageId = 0;

const stackToasts = ref<ToastMessage[]>([]);
const stackTimers = new Map<number, number>();

function addToast(message: string): void {
  const isExceedsMaxCount = stackToasts.value.length >= maxToastCount;
  if (isExceedsMaxCount) {
    removeToast(stackToasts.value[0].id);
  }
  const toast: ToastMessage = { id: messageId++, message };
  stackToasts.value.push(toast);

  const timerId = window.setTimeout(() => removeToast(toast.id), props.durationTime);
  stackTimers.set(toast.id, timerId);
}

function removeToast(id: number): void {
  stackToasts.value = stackToasts.value.filter(toast => toast.id !== id);
  const timerId = stackTimers.get(id);
  if (timerId) {
    clearTimeout(timerId);
    stackTimers.delete(id);
  }
}

onUnmounted(() => {
  for (const timerId of stackTimers.values()) {
    clearTimeout(timerId);
  }
});

defineExpose({
  addToast,
  removeToast
});
</script>

<style scoped>
.toast {
  background: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 5px 0;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.toast-slide-enter-to,
.toast-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
