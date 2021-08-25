<template>
  <div class="skeleton" :style="_styles"></div>
</template>

<script>
export default {
  name: "BaseSkeleton",
  props: {
    width: {
      type: [String, Number],
      default: "100%"
    },
    height: {
      type: [String, Number],
      default: 20
    }
  }, 
  computed: {
    _styles() {
      return {
        width: this._width,
        height: this._height,
      }
    },
    _width() {
      return this.isNumeric(this.width) ? this.width + "px" : this.width;
    },
    _height() {
      return this.isNumeric(this.height) ? this.height + "px" : this.height;
    }
  },
  methods: {
    /**
     * Hàm kiểm tra giá trị đầu vào có là số
     * @param value giá trị kiểm tra
     * @returns True/False
     * Author: HHDang (20/08/2021)
     */
    isNumeric(value) {
      return /^d+$/.test(value)
    }
  }
} 
</script>

<style lang="css" scoped>
.skeleton {
  position: relative;
  min-height: 20px;
  background: #e5e5e5;
  overflow: hidden;
  margin: 5px;
  border-radius: 10px;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg, 
    transparent, 
    #fff,
    transparent);
  animation: wave 1s linear infinite;
}

@keyframes wave {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  65% {
    opacity: 1;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(100%);
  }
}
</style>