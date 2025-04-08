<script setup lang="ts">
import { useTemplateRef } from "vue";

const toastEl = useTemplateRef('toast');
const stackedToastEl = useTemplateRef('stackedToast');

function showToast1(): void {
  toastEl.value?.addToast('hello! this is toast message');
}
function showToast2(): void {
  toastEl.value?.addToast('hello! this is toast message2');
}
function showToast3(): void {
  stackedToastEl.value?.addToast('hello! this is toast message');
}
function showToast4(): void {
  stackedToastEl.value?.addToast('hello! this is toast message');
}
</script>

<template>
  <Toast mode="sequential" ref="toast"/>

  <header class="header">
    <h1>Vue Simple Toast Component</h1>
    <a href="https://github.com/KumJungMin/v-simple-toast" key="github-link">
      GitHub Link
    </a>
  </header>
  <div class="content">
    <h2>Toast</h2>
    <h4>Default Toast(Sequential)</h4>
    <p> only one toast can be opened at a time</p>

    <table class="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type (Default)</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>intervalTime</code></td>
          <td><code>number (200)</code> (optional)</td>
          <td>Time (in ms) between toasts in sequential mode</td>
        </tr>
        <tr>
          <td><code>durationTime</code></td>
          <td><code>number (3000)</code> (optional)</td>
          <td>Duration (in ms) each toast stays visible</td>
        </tr>
        <tr>
          <td><code>toastClass</code></td>
          <td><code>string</code> (optional)</td>
          <td>Custom CSS class applied to each toast element</td>
        </tr>
        <tr>
          <td><code>toastStyle</code></td>
          <td><code>string</code> (optional)</td>
          <td>Inline style applied to each toast element</td>
        </tr>
      </tbody>
    </table><br />


    <div class="code-container">
      <code>
        <span class="keyword">&lt;template&gt;</span>
        <br/><span class="keyword">&lt;Toast</span> <span class="attribute">mode</span>="sequential" <span class="attribute">ref</span>="toast" <span class="keyword">/&gt;</span>
        <br/><span class="keyword">&lt;/template&gt;</span><br/>


        <br/><br/><span class="keyword">&lt;script setup&gt;</span><br/>
        <span class="keyword">const</span> toastEl = <span class="keyword">useTemplateRef</span>('toast');<br/><br/>
        <span class="keyword">function</span> showToast1() {<br />
        &nbsp;&nbsp;<span class="value">toastEl.value.useToast().add</span>('hello! this is toast message');<br />
        }<br /><br />
        <span class="keyword">function</span> showToast2() {<br />
        &nbsp;&nbsp;<span class="value">toastEl.value.useToast().add</span>('hello! this is toast message2');<br />
        }
        <br/><span class="keyword">&lt;/script&gt;</span>
      </code>
    </div>
    <br />
    <button @click="showToast1">open Toast1</button>
    <button @click="showToast2">open Toast2</button>
    <br /> <br />
    <hr />
    <br />

    <Toast ref="stackedToast" mode="stack" />
    <h4>Stack Toast</h4>
    <p>multiple toasts can be opened at the same time</p>
    
    <table class="props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type (Default)</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>durationTime</code></td>
          <td><code>number (3000)</code> (optional)</td>
          <td>Time (in milliseconds) each toast is visible</td>
        </tr>
        <tr>
          <td><code>maxToastCount</code></td>
          <td><code>number (5)</code> (optional)</td>
          <td>Maximum number of toasts shown at once (stack mode)</td>
        </tr>
        <tr>
          <td><code>toastClass</code></td>
          <td><code>string</code> (optional)</td>
          <td>Custom class applied to each toast element</td>
        </tr>
        <tr>
          <td><code>toastStyle</code></td>
          <td><code>string</code> (optional)</td>
          <td>Custom inline style applied to each toast element</td>
        </tr>
      </tbody>
    </table><br />

    <div class="code-container">
      <code>
        <span class="keyword">&lt;template&gt;</span>
        <br/><span class="keyword">&lt;Toast</span> <span class="attribute">mode</span>="stack" <span class="attribute">ref</span>="stackedToastEl" <span class="keyword">/&gt;</span>
        <br/><span class="keyword">&lt;/template&gt;</span><br/>


        <br/><br/><span class="keyword">&lt;script setup&gt;</span><br/>
        <span class="keyword">const</span> stackedToastEl = <span class="keyword">useTemplateRef</span>('stackedToastEl');<br/><br/>
        <span class="keyword">function</span> showToast1() {<br />
        &nbsp;&nbsp;<span class="value">stackedToastEl.value.useToast().add</span>('hello! this is toast message');<br />
        }<br /><br />
        <span class="keyword">function</span> showToast2() {<br />
        &nbsp;&nbsp;<span class="value">stackedToastEl.value.useToast().add</span>('hello! this is toast message2');<br />
        }
        <br/><span class="keyword">&lt;/script&gt;</span>
      </code>
    </div>
    <br />
    <button @click="showToast3">open Toast3</button>
    <button @click="showToast4">open Toast4</button>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  backdrop-filter: blur(10px);
  padding: 20px;
  background-color: #2e2e2e;
  color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
}

.content {
  max-width: 1000px;
  margin: 60px auto 200px;
}

.code-container {
  background-color: #2e2e2e;
  color: #e0e0e0;
  border-radius: 5px;
  padding: 15px;
  overflow-x: auto;
  max-width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
pre {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}
code {
  display: block;
  text-align: left;
}
.keyword {
  color: #f92672;
  font-weight: bold;
}
.attribute {
  color: #66d9ef;
}
.value {
  color: #a6e22e;
}

button {
  margin-right: 6px;
  background-color: #c6c6c6;         /* 테마의 액센트 컬러 */
  color: #ffffff;                    /* 흰색 텍스트 */
  padding: 10px 20px;                /* 적당한 패딩 */
  border: none;                      /* 불필요한 테두리 제거 */
  border-radius: 4px;                /* 약간의 둥근 모서리 */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #e31760;         /* hover 상태에서 살짝 어두운 색상 */
  transform: translateY(-2px);         /* 살짝 올라가는 느낌 */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

button:active {
  background-color: #d01558;         /* active 상태에서 더 어두운 색상 */
  transform: translateY(1px);         /* 클릭 시 살짝 내려감 */
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
}


.props-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #ffffff;
  color: #333;
  font-family: monospace;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.props-table thead {
  background-color: #f5f5f5;
  font-weight: bold;
}

.props-table th,
.props-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.props-table code {
  color: #d63384;
  background-color: #f8f9fa;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.95em;
}

</style>