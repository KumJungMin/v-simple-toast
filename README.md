# 🥐 Vue Simple Toast Component

A Simple Vue 3 toast component with two modes:
- `sequential`: one toast at a time
- `stack`: multiple toasts displayed simultaneously

> 🔗 [Demo](https://v-simple-toast.netlify.app/) | [GitHub](https://github.com/KumJungMin/v-simple-toast)

<br/><br/>

## 🚀 How To Use

To use this component in your project:

1. **Copy the `@lib` folder** into your project.
2. **Register the component globally** in your `main.ts`.

```ts
import { createApp } from 'vue';
import App from './App.vue';

// import Toast component
import Toast from '@/lib/toast/Toast.vue';

const app = createApp(App);

// global registration
app.component('Toast', Toast);

app.mount('#app');
```

Now you can use `<Toast mode="sequential" />` or `<Toast mode="stack" />` anywhere in your templates.

<br/><br/>

## 🧪 Usage - Sequential Mode

Only one toast is shown at a time.

### ✅ Props

| Prop           | Type (Default)          | Description                                         |
|----------------|--------------------------|-----------------------------------------------------|
| `intervalTime` | `number (200)` _(optional)_ | Time (in ms) between toasts                         |
| `durationTime` | `number (3000)` _(optional)_ | Duration (in ms) each toast is visible              |
| `toastClass`   | `string` _(optional)_       | Custom CSS class for toast                          |
| `toastStyle`   | `string` _(optional)_       | Inline styles for toast                             |

### ✅ Example

```vue
<template>
  <Toast mode="sequential" ref="toast" />
  <button @click="showToast1">open Toast1</button>
  <button @click="showToast2">open Toast2</button>
</template>

<script setup>
import { useTemplateRef } from 'vue';
const toast = useTemplateRef('toast');

function showToast1() {
  toast.value.useToast().add('hello! this is toast message');
}
function showToast2() {
  toast.value.useToast().add('hello! this is toast message2');
}
</script>
```

<br/><br/>

## 🧪 Usage - Stack Mode

Multiple toasts are shown at the same time.

### ✅ Props

| Prop             | Type (Default)           | Description                                              |
|------------------|---------------------------|----------------------------------------------------------|
| `durationTime`   | `number (3000)` _(optional)_ | Time (in ms) each toast is visible                       |
| `maxToastCount`  | `number (5)` _(optional)_    | Maximum number of toasts shown at once                  |
| `toastClass`     | `string` _(optional)_        | Custom CSS class for toast                              |
| `toastStyle`     | `string` _(optional)_        | Inline styles for toast                                 |

### ✅ Example

```vue
<template>
  <Toast mode="stack" ref="stackedToast" :maxToastCount="3" />
  <button @click="showToast3">open Toast3</button>
  <button @click="showToast4">open Toast4</button>
</template>

<script setup>
import { useTemplateRef } from 'vue';
const stackedToast = useTemplateRef('stackedToast');

function showToast3() {
  stackedToast.value.useToast().add('hello! this is toast message');
}
function showToast4() {
  stackedToast.value.useToast().add('hello! this is toast message2');
}
</script>
```

<br/><br/>

## 💅 Customization

You can apply your own styles using the `toastClass` and `toastStyle` props.

```vue
<Toast
  mode="stack"
  toastClass="my-toast"
  toastStyle="background: #222; color: #fff;"
/>
```

<br/><br/>

## 📦 Features

- ✅ Composable API (`useToast().add(...)`)
- ✅ Two display modes: sequential / stack
- ✅ Custom class/style support

