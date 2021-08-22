const state = {
  sidebarFlag: false,
  dialogFlag: false,
  popupFlag: {
    dialog: false,
    delete: false,
    deleteMany: false,
    error: false,
  },
  mdBtn: {
   Flag: false,
   clientX: 0,
   clientY: 0, 
  },
  formFlag: {
    EmployeeCode: true,
    EmployeeName: true,
    DateOfBirth: true,
    Gender: true,
    Address: true,
    IdentityNumber: true,
    IdentityDate: true,
    IdentityPlace: true,
    Email: true,
    EmployeePosition: true,
    PhoneNumber: true,
    DepartmentId: true,
    TelephoneNumber: true,
    BankAccountNumber: true,
    BankName: true,
    BankBranchName: true,
    departmentFilter: true,
    positionFilter: true,
    company: true,
    pagination: true
  },
  cbxFlag: {
    company: true,
    department: true,
    position: true,
    Gender: true,
    addDepartment: true,
    addPosition: true,
    WorkStatus: true,
    pagination: true
  },
  drdFlag: {
    company: true,
    pagesize: true,
    table: true
  },
  formMode: {
    status: 0
  },
  pageType: null,
  spinner: false,
  skeleton: false,
  loadingBtn: {
    add: false,
    save: false,
  },
  tableDrdPosition: {
    x: 0,
    y: 0
  },
  tableDrdId: null
}

const actions = {
  toggleSidebar({commit}) {
    commit('toggleSidebar')
  },
  toggleDialog({commit}) {
    commit('toggleDialog');
  },
  togglePopup({commit}, flagName) {
    commit('togglePopup', flagName);
  },
  showPopup({commit}, flagName) {
    commit("showPopup", flagName);
  },
  hidePopup({commit}, flagName) {
    commit("hidePopup", flagName);
  },
  showMDBtn({commit}, e) {
    commit('showMDBtn', e);
  },
  hideMDBtn({commit}) {
    commit('hideMDBtn');
  },
  setCbxFlagTrue({commit}, flagName) {
    commit('setCbxFlagTrue', flagName);
  },
  toggleCbx({commit}, flagName) {
    commit('toggleCbx', flagName)
  },
  toggleDrd({commit}, flagName) {
    commit('toggleDrd', flagName)
  },
  showDrd({commit}, flagName) {
    commit('showDrd', flagName)
  },
  hideDrd({commit}, flagName) {
    commit('hideDrd', flagName)
  },
  showCbx({commit}, flagName) {
    commit('showCbx', flagName)
  },
  hideCbx({commit}, flagName) {
    commit('hideCbx', flagName);
  },
  setFormFlagTrue({commit}) {
    commit('setFormFlagTrue')
  },
  updateFormFlag({commit}, flag) {
    commit("updateFormFlag", flag)
  },
  setPageType({commit}, pageType) {
    commit("setPageType", pageType);
  },
  showSpinner({commit}) {
    commit("showSpinner")
  },
  hideSpinner({commit}) {
    commit("hideSpinner")
  },
  showSkeleton({commit}) {
    commit("showSkeleton");
  },
  hideSkeleton({commit}) {
    commit("hideSkeleton");
  },
  showLoadingBtn({commit}, flagName) {
    commit("showLoadingBtn", flagName);
  },
  hideLoadingBtn({commit}, flagName) {
    commit("hideLoadingBtn", flagName)
  },
  setTableDrbPosition({commit}, position) {
    commit("setTableDrbPosition", position);
  },
  setTableDrdId({commit}, id) {
    commit("setTableDrdId", id)
  }
}

const getters = {
}

const mutations = {
  toggleSidebar(state) {
    state.sidebarFlag = !state.sidebarFlag
  },
  toggleDialog(state) {
    state.dialogFlag = !state.dialogFlag;
  },
  togglePopup(state, flagName) {
    state.popupFlag[flagName] = !state.popupFlag[flagName];
  },
  showPopup(state, flagName) {
    state.popupFlag[flagName] = true;
  },
  hidePopup(state, flagName) {
    state.popupFlag[flagName] = false;
  },
  showMDBtn(state, e) {
    state.mdBtn.clientX = e.clientX;
    state.mdBtn.clientY = e.clientY;
    state.mdBtn.Flag = true;
  },
  hideMDBtn(state) {
    state.mdBtn.Flag = false;
  },
  setCbxFlagTrue(state, flagName) {
    state.cbxFlag[flagName] = true
  },
  toggleCbx(state, flagName) {
    state.cbxFlag[flagName] = !state.cbxFlag[flagName];
  },
  toggleDrd(state, flagName) {
    state.drdFlag[flagName] = !state.drdFlag[flagName]
  },
  showDrd(state, flagName) {
    state.drdFlag[flagName] = false;
  },
  hideDrd(state, flagName) {
    state.drdFlag[flagName] = true;
  },
  showCbx(state, flagName) {
    state.cbxFlag[flagName] = false;
  },
  hideCbx(state, flagName) {
    state.cbxFlag[flagName] = true;
  },
  setFormFlagTrue() {
    Object.keys(state.formFlag).forEach((item) => {
      state.formFlag[item] = true;
    })
  },
  updateFormFlag(state, flag) {
    state.formFlag[flag.name] = flag.state;
  },
  setPageType(state, pageType) {
    state.pageType = pageType;
  },
  showSpinner(state) {
    state.spinner = true;
  },
  hideSpinner(state) {
    state.spinner = false;
  },
  showSkeleton(state) {
    state.skeleton = true;
  },
  hideSkeleton(state) {
    state.skeleton = false;
  },
  showLoadingBtn(state, flagName) {
    state.loadingBtn[flagName]= true;
  },
  hideLoadingBtn(state, flagName) {
    state.loadingBtn[flagName] = false;
  },
  setTableDrbPosition(state, position) {
    state.tableDrdPosition.x = position.x
    state.tableDrdPosition.y = position.y
  },
  setTableDrdId(state, id) {
    state.tableDrdId = id
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};