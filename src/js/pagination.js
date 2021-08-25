import { mapActions, mapState } from "vuex";
import { FormatFunction } from "./common";

export const Pagination = {
  computed: {
    ...mapState("emp", ["formRef", "employeeFilter", "pageInfo"]),
    // ...mapState("ctm", ["ctmPageInfo"]),
  },
  mixins: [FormatFunction],
  methods: {
    ...mapActions("emp", ["setPageArr", "filterData"]),
    // ...mapActions("ctm", ["setCtmPageArr", "filterCustomerData"]),
    /**
     * Hàm phân trang cho trang nhân viên
     * Author: HHDang (17/08/2021)
     */
    async getPageNum() {
      // call api paging
      const response = await this.filterData();

      // Tạo mảng số trang (hiển thị 5 trang)
      let arr = this.initPagingArray(this.pageInfo);
      this.setPageArr(arr);
      return response;
    },
    /**
     * Hàm phân trang cho trang khách hàng 
     */
    // async getCtmFilterPaging()  {
    //   const customerGroupId = null

    //   // Tạo thông tin phân trang
    //   const pageInfomation = {
    //     customerGroupId: customerGroupId
    //   }

    //   // call api paging 
    //   await this.filterCustomerData(pageInfomation);

    //   // Tạo mảng số trang (hiển thị 5 trang)
    //   let arr = this.initPageArray(this.ctmPageInfo);
    //   this.setCtmPageArr(arr);
    // },
    /**
     * Hàm khởi tạo mảng số trang (hàm cũ)
     * @param {Object} pageInfo Thông tin phân trang 
     * @returns Mảng số trang
     * Author: HHDang (19/08/2021)
     */
    initPageArray(pageInfo) {
      let start = 0;
      let end = 4;
      if (pageInfo.pageIndex >= 2) {
        start = pageInfo.pageIndex - 2;
        if (pageInfo.pageIndex + 2 < pageInfo.totalPage) {
          end = pageInfo.pageIndex + 2;
        } else {
          if(pageInfo.totalPage >= 5) {
            start = pageInfo.totalPage - 5;
            end = pageInfo.totalPage - 1;
          }
        }
      }
      if (pageInfo.totalPage < 5) {
        end = pageInfo.totalPage - 1;
      }
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    }, 
    /**
     * Hàm khởi tạo mảng số trang
     * @param {Object} pageInfo Thông tin phân trang 
     * @returns Mảng số trang
     * Author: HHDang (19/08/2021)
     */
    initPagingArray(pageInfo) {
      let arr = [];
      let totalPage = pageInfo.totalPage;
      let pageIndex = pageInfo.pageIndex
      if(totalPage <= 5) {
        for(let i = 0; i < totalPage; i++) {
          arr.push(i);
        }
        return arr;
      }
      if(totalPage == 6 && pageIndex < 3) {
        arr = [0, 1, 2, 3, -1, 5];
        return arr;
      } 
      if(totalPage == 6 && pageIndex >= 3) {
        arr = [0, -1, 2, 3, 4, 5];
        return arr;
      }
      if(pageIndex < 3) {
        arr = [0, 1, 2, 3, -1, totalPage - 1];
        return arr;
      }
      if(pageIndex >= 3 && (pageIndex < totalPage - 3)) {
        arr = [0, -1, pageIndex- 1, pageIndex, pageIndex + 1, -1, totalPage-1];
        return arr;
      }
      if(pageIndex >= 3 && (pageIndex >= totalPage - 3)) {
        arr = [0, -1, totalPage - 4, totalPage - 3, totalPage -2, totalPage - 1];
        return arr;
      }
    }
  },
} 