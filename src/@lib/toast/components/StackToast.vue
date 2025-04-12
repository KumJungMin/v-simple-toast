<template>
  <transition-group
    name="toast-slide"
    tag="div"
    @after-enter="onAfterEnter"
  >
    <div
      v-for="toast in activeToasts"
      :key="toast.id"
      :style="{ marginBottom: `${props.gap}px` }"
    >
      <div
        :class="props.toastClass"
        :style="props.toastStyle"
        class="toast"
      >
        {{ toast.message }}
      </div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, defineExpose, onBeforeUnmount } from 'vue';

interface ToastMessage {
  id: number;
  message: string;
}

interface Props {
  durationTime?: number;
  maxCount?: number;
  toastClass?: string;
  toastStyle?: string;
  gap?: number;
}

const props = withDefaults(defineProps<Props>(), {
  gap: 10,
});

/** "대기열(pending)"과 "현재 표시 중(active)" 목록 */
const pendingToasts = ref<ToastMessage[]>([]);
const activeToasts = ref<ToastMessage[]>([]);

const removeTimers = new Map<number, number>();
let toastId = 0;

/** 
 * 현재 "enter 애니메이션이 진행 중"인지 여부
 * → true일 때는 새 토스트를 바로 넣지 않고 대기
 */
let isAnimating = false;
let isMaxCountReached = false;

onBeforeUnmount(() => {
  removeTimers.forEach((timer) => clearTimeout(timer));
  removeTimers.clear();
});


/**
 * 어떤 토스트가 enter 애니메이션을 완전히 마치면 
 * → isAnimating = false
 * → 다음 토스트를 밀어넣을 수 있다.
 */
function onAfterEnter() {
  isAnimating = false;
  activeNextToast();
}

/**
 * 새로운 토스트를 등록(add)하면, "대기열(pending)"에 쌓는다.
 */
function addToast(message: string) {
  const newToast: ToastMessage = { id: toastId++, message };
  pendingToasts.value.push(newToast);
  activeNextToast();
}

/**
 * isEntering이 true라면, "enter 중"이므로 대기
 * → 대기열(pending)에서 토스트를 하나 꺼내서 activeToasts에 넣는다.
 * → activeToasts의 개수가 maxCount를 초과하면, 가장 오래된 토스트를 삭제
 * → activeToasts에 넣은 토스트는 durationTime 후에 삭제
 */
function activeNextToast() {
  if (isAnimating || pendingToasts.value.length === 0) return;

  isMaxCountReached = activeToasts.value.length >= props.maxCount!;
  if (isMaxCountReached) return;
  
  isAnimating = true;
  const nextToast = pendingToasts.value.shift()!;
  activeToasts.value.push(nextToast);

  const timerId = window.setTimeout(() => {
    removeToast(nextToast.id);
  }, props.durationTime);
  removeTimers.set(nextToast.id, timerId);
}

function removeToast(id: number) {
  activeToasts.value = activeToasts.value.filter((t) => t.id !== id);

  if (removeTimers.has(id)) {
    clearTimeout(removeTimers.get(id));
    removeTimers.delete(id);
  }
  if (isMaxCountReached) {
    activeNextToast();
  }
}

defineExpose({
  addToast,
  removeToast,
});
</script>

<style scoped>


.toast {
  width: fit-content;
  margin: 0 auto;
  background-color: #333;
  color: #fff;
  padding: 10px 16px;
  border-radius: 4px;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
.toast-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.toast-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.toast-slide-move {
  transition: transform 0.2s ease;
}
</style>
