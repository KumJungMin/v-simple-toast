<template>
  <div>
    <Toast mode="stack" />
    <!-- <Toast mode="sequential" /> -->

    <button @click="showToast">토스트 열기</button>
    <button @click="showToast">토스트 열기2</button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from './@lib/toast/composables/useToast';


function showToast(): void {
  useToast().add('안녕하세요! 토스트 메시지입니다.');
}
</script>
