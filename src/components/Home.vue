<template>
  <div>
    <div class="header">头部</div>
    <div class="layout">
      <div class="left-menu">
        <ul
          role="menubar"
          class="el-menu-vertical-demo el-menu"
          style="background-color: rgb(84, 92, 100);width: 200px;height: 100%;"
        >
          <li
            role="menuitem"
            aria-haspopup="true"
            class="el-submenu is-opened"
            aria-expanded="true"
          >
            <div
              class="el-submenu__title"
              style="padding-left: 20px; color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
            >
              <i class="el-icon-location"></i>
              <span>导航一</span>
              <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
            </div>
            <ul
              role="menu"
              class="el-menu el-menu--inline"
              style="background-color: rgb(84, 92, 100);"
              data-old-padding-top
              data-old-padding-bottom
              data-old-overflow
            >
              <li class="el-menu-item-group">
                <ul>
                  <li
                    role="menuitem"
                    tabindex="-1"
                    class="el-menu-item"
                    style="padding-left: 60px; color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
                  >选项1</li>
                  <li
                    role="menuitem"
                    tabindex="-1"
                    class="el-menu-item"
                    style="padding-left: 60px; color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
                  >选项2</li>
                </ul>
              </li>
              <li class="el-menu-item-group">
                <ul>
                  <li
                    role="menuitem"
                    tabindex="-1"
                    class="el-menu-item"
                    style="padding-left: 60px; color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
                  >选项3</li>
                </ul>
              </li>
            </ul>
          </li>
          <li
            role="menuitem"
            tabindex="-1"
            class="el-menu-item"
            style="padding-left: 20px; color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);"
          >
            <i class="el-icon-setting"></i>
            <span>导航四</span>
          </li>
        </ul>
      </div>
      <div class="right-content">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
// function useData() {
//   const x = ref(123);
//   return {
//     x,
//   };
// }
export default {
  setup() {
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");
    const mode = ref(false);
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const toggle = (modeType) => {
      mode.value = !modeType;
    };
    return {
      // 方法
      handleSelect,
      toggle,
      //   变量
      activeIndex,
      activeIndex2,
      mode,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.header {
  background: #000;
  opacity: 0.7;
  color: #fff;
  height: 60px;
  line-height: 60px;
}
.layout {
    display: flex;
    .left-menu {
        width: 200px;
        height: calc(100vh - 80px);
    }
    .right-content {
        width: calc(100% - 200px)
    }
}
</style>
