<template>
    <date-picker
      v-model="date"
      format="DD/MM/YYYY"
      :ref="inputInfo.name"
      :input-attr="{
        placeholder: 'DD/MM/YYYY',
        tabindex: inputInfo.tabindex
      }"
      :valueType="valueType"
      :disabled-date="(date) => date > new Date()"
    >
    </date-picker>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/vi';
import { mapActions, mapState } from 'vuex';
import { FormatFunction } from '../../js/common'


export default {
  components: { DatePicker },
  mixins: [FormatFunction],
  props: {
    inputInfo: Object,
    valueType: {
      type: String,
      default: "YYYY-MM-DD"
    },
    dateBinding: {
      type: String,
      default: null
    }
  },
  watch: {
    dateBinding() {
      this.date = this.dateBinding;
    }
  },
  data() {
    return {
      date: '',
      disabledAfter: new Date()
    }
  },
  computed: {
    ...mapState('emp', ["employee"])
  },
  methods: {
    ...mapActions('emp', ["addFormRef"]),
  },
  mounted() {
    // Khởi tạo ref cho date pick
    this.date = this.dateBinding;
    let ref = {
      name: this.inputInfo.name,
      info: this.$refs[this.inputInfo.name]
    }
    this.addFormRef(ref);
  }
};
</script>

<style lang="css" scoped>
@import url("../../css/common/datepick.css");
</style>