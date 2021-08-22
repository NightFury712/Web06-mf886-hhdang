<template>
  <div>
    <div class="tooltip-container">
      <input
        @blur="inputBlur()"
        :ref="inputInfo.name"
        :type="inputInfo.type"
        :tabindex="inputInfo.tabindex"
        :maxlength="inputInfo.maxLength"
        :class="['text-box', {'border-red' : !formFlag[inputInfo.name]}]"
        :style="'width: ' + inputInfo.width + 'px'"
        @mouseover="mouseOver($event)"
      />
      <span 
        class="tooltiptext" 
        v-show="!formFlag[inputInfo.name]"
        :style="{'top': mousePosition.y + 'px', 'left': mousePosition.x + 'px'}"
      >
        {{ inputInfo.tooltip }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {validateForm} from '../../js/validate'
import {FormatFunction} from "../../js/common"
import {HandlerTooltip} from "../../js/tooltip"

export default {
  name: "BaseTextBox",
  mixins: [validateForm, FormatFunction, HandlerTooltip],
  props: {
    inputInfo: Object,
  },
  computed: {
    ...mapState('event', ["formFlag"]),
    ...mapState('emp', ["formRef"]),
  },
  data() {
    return {
      mousePosition: {
        x: 0,
        y: 0
      } 
    }
  },
  methods: {
    ...mapActions('emp', ["addFormRef"]),
    /**
     * Validate khi blur input
     * Author: HHDang (16/08/2021)
     */
    inputBlur: function() {
      this.formFlag[this.inputInfo.name] = this.validateOption(this.inputInfo.name, this.$refs[this.inputInfo.name].value.trim());  
    },
    /**
     * Lấy vị trí con trỏ chuột
     * Author: HHDang (16/08/2021)
     */
    mouseOver(position) {
      this.mousePosition = this.getMousePosition(position);
    }
  },
  mounted() {
    // lưu ref cho mỗi textbox
    let ref = {
      name: this.inputInfo.name,
      info: this.$refs[this.inputInfo.name]
    }
    this.addFormRef(ref);
  }
};
</script>

<style>
@import url("../../css/common/input.css");
@import url("../../css/common/tooltip.css");

.tooltip .text-align-right {
  text-align: right;
  padding-right: 54px;
}
</style>
