<template>
  <section class="panel">
    <div
      class="panel-title"
      :style="{
        'background-color': titleBackgroundColor,
        color: titleTextColor,
      }"
    >
      {{ title }}
      <div class="icon-slot"><slot name="title-icon"></slot></div>
    </div>
    <div class="panel-content">
      <slot name="top-content"></slot>
      <slot></slot>
      <slot name="bottom-content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      default: "Panel Title",
      type: String,
    },
    titleBackgroundColor: {
      default: null,
      type: String,
    },
    titleTextColor: {
      default: "white",
      type: String,
    },
  },
};
</script>


<style scoped lang="scss">
@import "../../scss/_variables.scss";
.panel {
  display: inline-flex;
  flex-direction: column;
  min-width: 100px;
  border: 1px solid $black;
  border-radius: $rounded;

  max-height: 100%;
  max-width: 100%;
  background-color: $white;

  /* box-shadow: $shadow-lg; */
}
.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  margin: $space-0;
  border: none;
  font-weight: $font-normal;
  background-color: $cleBlue;
  padding: $space-0_5 $space_1;
  color: $white;
  font-size: $text-base;
  font-weight: $font-semibold;
  text-align: start;
  display: flex;
  /* @include disable-selection; */

  .icon-slot {
    float: right;
    svg {
      display: block;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
.panel-content {
  display: flex;
  flex-direction: column;
  padding: $space-2;
  flex-grow: 1;
  max-width: 100%;
  max-height: 100%;
}
</style>
