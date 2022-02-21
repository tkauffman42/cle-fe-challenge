/* 
Example usage in pitch plots

relative container must listen to these events
<div class='pitch-plot-container'  
    @mousedown='mousedownFunc($event)' 
    @mouseup='mouseupFunc($event)' 
    @mousemove='mousemoveFunc($event)'
    @mouseout='mouseoutFunc($event)'
    >  
    
Must include this as sibling to svg in container where items are drawn
<div ref='lasso' :style='lassoStyle' ></div>

Must create data or computed property named selectableItems.
Must set ref='selectableItems' on selectable elements.  Each item must have a unique key. 
If youre planning on reordering, will need to define some new unique key. 

example: 
<circle
...
ref='selectableItems'
:data-key='item.uniqueKey'
>

*/

const selectableMixin = {
  data() {
    return {
      svg: null,
      mousedown: false,
      x1: null,
      y1: null,
      x2: null,
      y2: null
    };
  },
  mounted() {
    this.svg = this.$refs.svg;
  },
  computed: {
    lassoCoords() {
      return {
        x: this.x2 > this.x1 ? this.x1 : this.x2,
        y: this.y2 > this.y1 ? this.y1 : this.y2,
        width: this.x2 - this.x1 > 0 ? this.x2 - this.x1 : this.x1 - this.x2,
        height: this.y2 - this.y1 > 0 ? this.y2 - this.y1 : this.y1 - this.y2
      };
    }
  },
  methods: {
    getSvgCoord(evt) {
      var pt = this.svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      return pt.matrixTransform(this.svg.getScreenCTM().inverse());
    },
    mouseupFunc() {
      const vm = this;
      let selected = [];
      vm.selectableItems.forEach((obj) => vm.$set(obj, "isSelected", false));
      // lasso
      if (vm.x1 !== vm.x2 && vm.y1 !== vm.y2) {
        const minX = vm.x1 > vm.x2 ? vm.x2 : vm.x1;
        const maxX = vm.x1 < vm.x2 ? vm.x2 : vm.x1;
        const minY = vm.y1 > vm.y2 ? vm.y2 : vm.y1;
        const maxY = vm.y1 < vm.y2 ? vm.y2 : vm.y1;
        vm.selectableItems.forEach((p) => {
          if (
            p.isVisible &&
            p.x > minX &&
            p.x < maxX &&
            vm.coordSystem.maxY - p.y + vm.coordSystem.minY > minY &&
            vm.coordSystem.maxY - p.y + vm.coordSystem.minY < maxY
          ) {
            vm.$set(p, "isSelected", true);
            selected.push(p);
          } else {
            vm.$set(p, "isSelected", false);
          }
        });
      }
      // click
      else {
        vm.selectableItems.forEach((p) => {
          const dist = Math.sqrt(
            (p.x - vm.x1) ** 2 +
              (vm.coordSystem.maxY - p.y + vm.coordSystem.minY - vm.y1) ** 2
          );
          if (dist < p.radius) {
            vm.$set(p, "isSelected", true);
            selected.push(p);
          } else {
            vm.$set(p, "isSelected", false);
          }
        });
      }
      // console.log('selected', selected);
      // vm.$emit('newSelection', selected);
      vm.mousedown = false;
      vm.x1 = 0;
      vm.y1 = 0;
      vm.x2 = 0;
      vm.y2 = 0;
    },
    mousedownFunc(e) {
      const point = this.getSvgCoord(e);
      this.x1 = point.x;
      this.y1 = point.y;
      this.x2 = point.x;
      this.y2 = point.y;
      this.mousedown = true;
    },
    mousemoveFunc(e) {
      const newPoint = this.getSvgCoord(e);
      if (this.mousedown) {
        this.x2 = newPoint.x;
        this.y2 = newPoint.y;
        if (
          newPoint.x > this.coordSystem.maxX - 0.05 ||
          newPoint.x < this.coordSystem.minX + 0.05 ||
          newPoint.y > this.coordSystem.maxY - 0.05 ||
          newPoint.y < this.coordSystem.minY + 0.05
        ) {
          this.x1 = null;
          this.y1 = null;
          this.x2 = null;
          this.y2 = null;
          this.mousedown = false;
        }
      }
    }
  },
  watch: {
    selectableItems: {
      handler() {
        const selected = this.selectableItems.filter((s) => s.isSelected);
        // console.log('emit', selected);
        this.$emit("selected-pitches", selected);
      },
      deep: true
    }
  }
};

export { selectableMixin };
