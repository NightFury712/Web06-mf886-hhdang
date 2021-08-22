<template>
  <tr @contextmenu.prevent="showMDBtn($event)" @click="ctmSelected()">
    <td>
      <input 
        type="checkbox" 
        :id="'checkbox-customer-' + index"
        v-model="checkbox"
        disabled
      >
      <label :for="'checkbox-customer-' + index">
        <i class="fas fa-check"></i>
      </label>
    </td>
    <td
      v-for="(th, idx) in ths"
      :class="['table-item', { center: th.center, right: th.right }]"
      :key="idx"
    >
      {{ formatOption(th.fieldName, customer[th.fieldName], 1) }}
    </td>
  </tr>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {FormatFunction} from "../../../js/common"
export default {
  name: "CustomerList",
  mixins: [FormatFunction],
  props: {
    customer: {
      type: Object,
    },
    ths: {
      type: Array,
    },
    index: Number,
  },
  data() {
    return {
      checkbox: false,
    }
  },
  computed: {
    ...mapState("ctm", ["ctmDeleteList"])
  },
  watch: {
    ctmDeleteList() {
      const index = this.ctmDeleteList.indexOf(this.customer.CustomerId);
      if(index !== -1) {
        this.checkbox = true;
      } else {
        this.checkbox = false;
      }
    }
  },
  methods: {
    ...mapActions("ctm", ["getCustomerById", "handlerCtmDeleteList", "addCtmDeleteList"]),
    showMDBtn(event) {
      this.$store.dispatch("event/showMDBtn", event);
      this.addCtmDeleteList(this.customer.CustomerId);
      // Call api lấy thông tin khách hàng theo id
      this.getCustomerById(this.customer.CustomerId);
    },
    ctmSelected() {
      this.handlerCtmDeleteList(this.customer.CustomerId);
      // Call api lấy thông tin khách hàng theo id
      this.getCustomerById(this.customer.CustomerId);
    }
  },
};
</script>

<style lang="css" scoped>
@import url("../../../css/common/content.css");
</style>
