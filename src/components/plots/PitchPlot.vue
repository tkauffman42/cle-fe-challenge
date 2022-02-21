<template>
  <div :style="{ width: width }" ref="container" class="pitch-plot-container">
    <div
      class="pitch-plot"
      :style="{
        width: width,
      }"
    >
      <svg
        style="display: block"
        :width="width"
        :viewBox="
          coordSystem.minX +
          ' ' +
          coordSystem.minY +
          ' ' +
          coordSystem.width +
          ' ' +
          coordSystem.height
        "
        preserveAspectRatio="xMidYMid meet"
        :style="{ 'background-color': backgroundColor }"
        ref="svg"
        @mouseup="mouseupFunc($event)"
        @mousedown="mousedownFunc($event)"
        @mousemove="mousemoveFunc($event)"
      >
        <template v-for="(p, i) in filteredPitchType">
          <circle
            :key="'pitch-' + i"
            v-show="p.isVisible && !p.hidden"
            :class="[
              p.classList,
              { visible: p.isVisible },
              { selected: p.isSelected },
            ]"
            :cx="p.x"
            :cy="scaleY(p.y)"
            :r="p.radius"
            :fill="p.fill"
            :fill-opacity="p.isSelected ? 1 : p.fillOpacity"
            :stroke="p.isSelected ? p.selectedStroke : p.stroke"
            :stroke-opacity="
              p.isSelected ? p.selectedStrokeOpacity : p.strokeOpacity
            "
            :stroke-width="p.isSelected ? p.selectedStrokeWidth : p.strokeWidth"
          />
        </template>
        <rect
          :x="strikezoneCoords.x"
          :y="scaleY(strikezoneCoords.y)"
          :width="strikezoneCoords.width"
          :height="strikezoneCoords.height"
          stroke="#000000"
          :stroke-width="0.02"
          fill-opacity="0"
        ></rect>
        <rect
          :x="lassoCoords.x"
          :y="lassoCoords.y"
          :width="lassoCoords.width"
          :height="lassoCoords.height"
          stroke="#000000"
          :stroke-width="0.04"
          fill-opacity="0"
        ></rect>
      </svg>
    </div>
  </div>
</template>



<script>
import { selectableMixin } from "../../utility/selectable";

export default {
  mixins: [selectableMixin],
  props: {
    width: {
      default: "200px",
      type: String,
    },
    backgroundColor: {
      default: "#DFDFDF",
      type: String,
    },
    pitches: {
      type: Array,
      default: () => [],
    },
    selectedGame: {
      type: Object,
    },
    filteredPitch: {
      type: String,
    },
  },

  data() {
    const min = 4 / 12;
    const max = 56 / 12;
    const coordSystem = {
      minX: 0 - (max - min) / 2,
      maxX: 0 + (max - min) / 2,
      minY: min,
      maxY: max,
      width: max - min,
      height: max - min,
    };

    return {
      height: null,
      svg: null,
      coordSystem,
      strikezoneCoords: {
        x: -8.5 / 12,
        y: 40 / 12,
        width: 17 / 12,
        height: 20 / 12,
      },
    };
  },
  computed: {
    selectableItems() {
      return this.pitches.filter((p) => p.isSelectable);
    },
    filteredPitchType() {
      if (this.filteredPitch != null) {
        return this.pitches.filter((fp) => fp.pitchType === this.filteredPitch);
      } else {
        return this.pitches;
      }
    },
  },
  methods: {
    scaleY(v) {
      return this.coordSystem.maxY - v + this.coordSystem.minY;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
