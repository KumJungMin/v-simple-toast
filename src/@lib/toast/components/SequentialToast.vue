<template>
  <transition name="toast-slide" @after-leave="onAfterLeave">
    <div v-if="activeToast" class="toast" :key="activeToast.id" :class="props.toastClass" :style="props.toastStyle">
      {{ activeToast.message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';

interface ToastMessage {
  id: number;
  message: string;
}

const props = defineProps<{
  intervalTime: number;
  durationTime: number;
  toastClass?: string;
  toastStyle?: string;
}>();

let messageId = 0;

const queue = ref<ToastMessage[]>([]);
const activeToast = ref<ToastMessage | null>(null);
const timeout = ref<number | null>(null);

function addToast(message: string): void {
  queue.value.push({ id: messageId++, message });
  if (!activeToast.value) {
    showNextToast();
  }
}

function showNextToast(): void {
  if (queue.value.length > 0) {
    activeToast.value = queue.value.shift()!;
    /** if queue is empty, set duration to durationTime */
    /** if queue is not empty, set duration to intervalTime */ 
    const duration = queue.value.length === 0 ? props.durationTime : props.intervalTime;
    startTimer(duration);
  }
}

function startTimer(duration: number): void {
  if (timeout.value) clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => dismissToast(), duration);
}

function dismissToast(): void {
  activeToast.value = null;
}

function onAfterLeave(): void {
  showNextToast();
}

function removeToast(id: number): void {
  if (activeToast.value && activeToast.value.id === id) {
    dismissToast();
  }
  queue.value = queue.value.filter(toast => toast.id !== id)
}

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
