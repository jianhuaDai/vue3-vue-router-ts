<template>
  <div class="hello">
    <h1>{{ nums }}</h1>
  </div>
  <button @click="add">+</button>
  <div>
    计算属性：
    {{remain}}
  </div>
  <div>
    方法结构继承响应式数值
    {{x}}
  </div>
  <div>
    响应式对象
    {{state.foo}}
    {{state.bar}}
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, watch } from "vue";
function useData() {
  const x = ref(123);
  return {
    x,
  };
}
export default {
  setup() {
    const nums = ref(0);
    const { x } = useData();
    const state = reactive({
      foo: 1,
      bar: 2
    });
    const add = () => {
      nums.value += 1;
      x.value += 1;
      state.foo += 2;
      state.bar += 3;
    };
    const remain = computed(() => nums.value + 1);
    watch(nums, (nums) => {
      console.log(nums, 'nums');
      
    });
    return {
      nums,
      add,
      remain,
      x,
      state,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
