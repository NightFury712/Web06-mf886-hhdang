import CustomerAPI from "../../api/components/CustomerAPI";

const state = {
  customers: [],
  customer: {},
  customerCode: "",
  ctmPageInfo: {
    pageSize: 10,
    pageIndex: 0,
    totalPage: 0,
    totalRecord: 0
  },
  pageIndex: 0,
  customerFilter: "kh",
  ctmDeleteList: [],
  ctmPageArr: [],
  ctmSortFlag: {
    CustomerCode: false,
    FullName: false,
    DateOfBirth: false,
    Gender: false,
    IdentityNumber: false,
    Email: false,
    Address: false,
    PhoneNumber: false,
    CompanyName: false,
    IsStopFollow: false,
  },
  ctmNotFound: false,
};

const getters = {

}

const actions = {
  /**
   * Load dữ liệu
   * Author: HHDang (4/8/2021)
   */
  async getCustomers({commit}) {
    try {
      const res = await CustomerAPI.getAll();
      commit("getCustomers", res.data);
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * lấy thông tin chi tiết khách hàng
   * Author: HHDang (4/8/2021)
   */
   async getCustomerById({commit}, id) {
    const res = await CustomerAPI.getById(id);
    commit("getCustomerById", res.data) 
  },
  /**
   * Thêm 1 bản ghi mới vào database
   * Author: HHDang (4/8/2021)
   */
   async save({commit}, customer) {
    try {
      const res = await CustomerAPI.add(customer);
      const msg = "Trạng thái thêm: " + res.status;
      commit('notify', msg);
      return res.status
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * Cập nhật 1 bản ghi
   * Author: HHDang (4/8/2021)
   */
   async update({commit}, customer) {
    try {
      const res = await CustomerAPI.update(customer, customer.CustomerId);
      const msg = "Trạng thái cập nhật: " + res.status;
      commit('notify', msg);
      return res.status ;

    } catch(err) {
      console.log(err);
    }
  },
  /**
   * Xóa 1 bản ghi
   * Author: HHDang (4/8/2021)
   */
  async delete({commit}, id) {
    try {
      const res = await CustomerAPI.delete(id);
      const msg = "Trạng thái xóa: " + res.status;
      commit('notify', msg);
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * Xóa nhiều bản ghi
   * Author: HHDang (4/8/2021)
   */
   async deleteManyCtm({commit}, list) {
    try{
      let res;
      list.forEach(async (item) => {
        console.log(item);
        res = await CustomerAPI.delete(item);
      })
      const msg = "Trạng thái thêm: " + res.status;
      commit('notify', msg);
    } catch(err) {
      console.log(err)
    }
  },
  /**
   * Lấy mã khách hàng mới
   * Author: HHDang (19/7/2021)
   */
   async getNewCustomerCode({commit}) {
    const res = await CustomerAPI.getNewCustomerCode();
    commit("getNewCustomerCode", res.data)
  },
  async filterCustomerData({commit}, pageInfo) {
    const params = {
      pageSize: state.ctmPageInfo.pageSize,
      pageIndex: state.ctmPageInfo.pageIndex,
      customerFilter: state.customerFilter,
      customerGroupId: pageInfo.customerGroupId
    }
    // console.log(params);
    const res = await CustomerAPI.paging("customerFilter", params)
    commit("filterCustomerData", res.data.Data);
    commit("setCtmPageInfo", { name: "totalPage", data: res.data.TotalPage});
    commit("setCtmPageInfo", { name: "totalRecord", data: res.data.TotalRecord});
    if(res.data.TotalRecord === 0) {
      commit("setCtmNotFound", true);
    } else {
      commit("setCtmNotFound", false);
    }
  },
  setCustomerFilter({commit}, data) {
    commit("setCustomerFilter", data);
  },
  setCtmPageInfo({commit}, {name, data}) {
    commit("setCtmPageInfo",{ name, data});
  },
  setCtmPageArr({commit}, arr) {
    commit("setCtmPageArr", arr);
  },
  setCustomer({commit}, customer) {
    commit("setCustomer", customer);
  },
  handlerCtmDeleteList({commit}, id) {
    commit("handlerCtmDeleteList", id);
  },
  addCtmDeleteList({commit}, id) {
    commit("addCtmDeleteList", id);
  },
  clearCtmDeleteList({commit}) {
    commit("clearCtmDeleteList");
  },
  toggleCtmSortFlag({commit}, flagName) {
    commit("toggleCtmSortFlag", flagName);
  },
  setCtmSortFlagFalse({commit}) {
    commit("setCtmSortFlagFalse");
  },
};

const mutations = {
  getCustomers(state, customers) {
    state.customers = customers;
  },
  getCustomerById(state, customer) {
    state.customer = customer;
  },
  getNewCustomerCode(state, code) {
    state.customerCode = code;
  },
  filterCustomerData(state, data) {
    state.customers = data;
  },
  setCtmPageInfo(state, {name, data}) {
    state.ctmPageInfo[name] = data;
  },
  setTotalPageCustomer(state, totalPage) {
    state.ctmPageInfo.totalPage = totalPage;
  },
  setTotalRecordCustomer(state, totalRecord) {
    state.ctmPageInfo.totalRecord = totalRecord;
  },
  notify(state, msg) {
    console.log(msg);
  },
  setCustomerFilter(state, data) {
    state.customerFilter = data;
  },
  setCtmPageArr(state, arr) {
    state.ctmPageArr = arr
  },
  setCustomer(state, customer) {
    state.customer = customer;
  },
  handlerCtmDeleteList(state, id) {
    const index = state.ctmDeleteList.indexOf(id);
    if(index === -1) {
      state.ctmDeleteList.push(id);
    } 
    else {
      state.ctmDeleteList.splice(index, 1);
    }
  },
  addCtmDeleteList(state, id) {
    const index = state.ctmDeleteList.indexOf(id);
    if(index === -1) {
      state.ctmDeleteList.push(id);
    }
  },
  clearCtmDeleteList(state) {
    state.ctmDeleteList = [];
  },
  toggleCtmSortFlag(state, flagName) {
    Object.keys(state.ctmSortFlag).forEach((item) => {
      if(item === flagName) {
        state.ctmSortFlag[item] = !state.ctmSortFlag[flagName]; 
      } else {
        state.ctmSortFlag[item] = false; 
      }
    })
  },
  setSortFlagFalse(state) {
    Object.keys(state.ctmSortFlag).forEach((item) => {
      state.ctmSortFlag[item] = false;
    })
  },
  setCtmNotFound(state, flag) {
    state.ctmNotFound = flag;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};