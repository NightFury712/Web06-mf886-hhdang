import EmployeeAPI from "../../api/components/EmployeeAPI";
import DepartmentAPI from "../../api/components/DepartmentAPI"
import PositionAPI from "../../api/components/PositionAPI"


const state = {
  employees: [],
  departments: [],
  positions: [],
  employee: null,
  sortFlag: {
    EmployeeCode: false,
    EmployeeName: false,
    DateOfBirth: false,
    Gender: false,
    IdentityNumber: false,
    IdentityDate: false,
    IdentityPlace: false,
    Email: false,
    Address: false,
    PhoneNumber: false,
    DepartmentId: false,
    EmployeePosition: false,
    TelephoneNumber: true,
    BankAccountNumber: true,
    BankName: true,
    BankBranchName: true,
  },
  formRef: {
  },
  empDeleteList: [],
  newEmployeeCode: '',
  pageInfo: {
    pageIndex: 0,
    pageSize: 10,
    totalRecord: null,
    totalPage: null,
    departmentId: null,
    positionId: null,
  },
  pageArr: [],
  employeeFilter: 'nv',
  empResponse: null,
  notFound: false,
};

const actions = {
  /**
   * Load dữ liệu
   * Author: HHDang (14/7/2021)
   */
  async loadData({ commit }) {
    try {
      const res = await EmployeeAPI.getAll();
      commit("loadData", res.data);
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * Thêm 1 bản ghi mới vào database
   * Author: HHDang (14/7/2021)
   */
  async add({commit}, employee) {
    try {
      const res = await EmployeeAPI.add(employee);
      commit("setEmployeeResponse", res.data);
      return res.data;
    } catch (error) {
      commit("setEmployeeResponse", error.response.data);
      console.log(error.response.data);

      return error.response.data
    }
  },
  /**
   * Cập nhật 1 bản ghi
   * Author: HHDang (14/7/2021)
   */
  async edit({commit}, employee) {
    let res
    try {
      res = await EmployeeAPI.update(employee, employee.EmployeeId);
      commit("setEmployeeResponse", res.data);
      return res.data;
    } catch(error) {
      commit("setEmployeeResponse", error.response.data);
      return error.response.data
    }
  },
  /**
   * Xóa 1 bản ghi
   * Author: HHDang (14/7/2021)
   */
  async delete({commit}, id) {
    try {
      const res = await EmployeeAPI.delete(id);
      commit("delete");
      return res.status;
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * Xóa nhiều bản ghi
   * Author: HHDang (20/7/2021)
   */
  async deleteManyEmp({commit}, list) {
    try{
      const res = await EmployeeAPI.deletes(list);
      commit("deleteManyEmp", res.data);
      return res.data;
    } catch(err) {
      console.log(err)
      return err.response.data;
    }
  },
  /**
   * lấy thông tin chi tiết nhân viên
   * Author: HHDang (17/7/2021)
   */
  async getEmployeeById({commit}, id) {
    const res = await EmployeeAPI.getById(id);
    commit("getEmployeeById", res.data) 
  },
  /**
   * Load dữ liệu phòng ban
   * Author: HHDang (15/7/2021)
   */
  async loadDataDepartment({ commit }) {
    const response = await DepartmentAPI.getAll();
    commit("loadDataDepartment", response.data);
  },
  /**
   * Load dữ liệu vị trí công việc
   * Author: HHDang (15/7/2021)
   */
  async loadDataPosition({ commit }) {
    const response = await PositionAPI.getAll();
    commit("loadDataPosition", response.data);
  },
  /**
   * Lấy mã nhân viên mới
   * Author: HHDang (19/7/2021)
   */
  async getNewEmployeeCode({commit}) {
    const res = await EmployeeAPI.getNewEmployeeCode();
    commit("getNewEmployeeCode", res.data)
    return res.data;
  },
  /**
   * Hàm lọc dữ liệu và phân trang
   * @param {Object} pageInfo : Thông tin để lọc dữ liệu
   */
  async filterData({commit}) {
    try {
      const params = {
        pageSize: state.pageInfo.pageSize,
        pageIndex: state.pageInfo.pageIndex,
        employeeFilter: state.employeeFilter,
        // departmentId: state.pageInfo.departmentId,
        // positionId: state.pageInfo.positionId
      }
      // console.log(params);
      const res = await EmployeeAPI.paging("employeeFilter", params)
      commit("filterData", res.data.Data);
      commit("setTotalPage", res.data.TotalPage);
      commit("setTotalRecord", res.data.TotalRecord);
      commit("setSortFlagFalse");
      if(res.data.TotalRecord === 0) {
        commit("setNotFound", true);
      } else {
        commit("setNotFound", false);
      }
    } catch (error) {
      return error.response.data
    }
    
  },
  setPageArr({commit}, arr) {
    commit("setPageArr", arr);
  },
  setEmployee({ commit }, employee) {
    commit("setEmployee", employee);
  },
  setNewEmployee({commit}) {
    commit("setNewEmployee");
  },
  addFormRef({commit}, ref) {
    commit('addFormRef', ref);
  },
  handlerEmpDeleteList({commit}, item) {
    commit('handlerEmpDeleteList', item)
  },
  addEmpDeleteList({commit}, item) {
    commit('addEmpDeleteList', item)
  },
  setPageNum({commit}, num) {
    commit('setPageNum', num);
  },
  setPageSize({commit}, size) {
    commit("setPageSize", size);
  },
  clearDeleteList({commit}) {
    commit("clearDeleteList")
  },
  setEmployeeFilter({commit}, employeeFilter) {
    commit("setEmployeeFilter", employeeFilter)
  },
  setDepartmentFilter({commit}, id) {
    commit("setDepartmentFilter", id);
  },
  setPositionFilter({commit}, id) {
    commit("setPositionFilter", id);
  },
  toggleSortFlag({commit}, flagName) {
    commit("toggleSortFlag", flagName)
  }
};

const getters = {
  allEmployees(state) {
    return state.employees;
  },
  getEmployeeDetail(state) {
    return state.employee;
  },
};

const mutations = {
  loadData(state, employees) {
    state.employees = employees;
  },
  setEmployee(state, employee) {
    state.employee = employee;
  },
  loadDataDepartment(state, departments) {
    state.departments = departments;
  },
  loadDataPosition(state, positions) {
    state.positions = positions;
  },
  getNewEmployeeCode(state, code) {
    state.newEmployeeCode = code;
  },
  filterData(state, data) {
    state.employees = data
  },
  setPageArr(state, arr) {
    state.pageArr = [...arr]
  },
  setTotalPage(state, totalPage) {
    state.pageInfo.totalPage = totalPage;
  },
  setEmployeeResponse(state, res) {
    state.empResponse = res;
  },
  delete() {
    console.log("delete success!");
  },
  deleteManyEmp(state, res) {
    console.log(res);
  },
  getEmployeeById(state, employee) {
    state.employee = employee;
  },
  addFormRef(state, ref) {
    state.formRef[ref.name] = ref.info;
  },
  handlerEmpDeleteList(state, id) {
    const index = state.empDeleteList.indexOf(id);
    if(index === -1) {
      state.empDeleteList.push(id);
    } 
    else {
      state.empDeleteList.splice(index, 1);
    }
  },
  addEmpDeleteList(state, id) {
    const index = state.empDeleteList.indexOf(id);
    if(index === -1) {
      state.empDeleteList.push(id);
    }
  },
  setPageNum(state, num) {
    state.pageInfo.pageIndex = num;
  },
  setTotalRecord(state, totalRecord) {
    state.pageInfo.totalRecord = totalRecord;
  },
  setPageSize(state, size) {
    state.pageInfo.pageSize = size;
  },
  setDepartmentFilter(state, id) {
    state.pageInfo.departmentId = id
  },
  setPositionFilter(state, id) {
    state.pageInfo.positionId = id;
  },
  clearDeleteList(state) {
    state.empDeleteList = [];
  },
  setEmployeeFilter(state, employeeFilter) {
    state.employeeFilter = employeeFilter;
  },
  setNotFound(state, flag) {
    state.notFound = flag;
  },
  toggleSortFlag(state, flagName) {
    Object.keys(state.sortFlag).forEach((item) => {
      if(item === flagName) {
        state.sortFlag[item] = !state.sortFlag[flagName]; 
      } else {
        state.sortFlag[item] = false; 
      }
    })
  },
  setSortFlagFalse(state) {
    Object.keys(state.sortFlag).forEach((item) => {
      state.sortFlag[item] = false;
    })
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
