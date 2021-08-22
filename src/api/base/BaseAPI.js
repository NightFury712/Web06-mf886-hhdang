import BaseAPIConfig from "./BaseAPIConfig";

export default class BaseAPI {
  constructor() {
    this.controller = null;
  }
  /**
   * Hàm lấy tất cả dữ liệu
   */
  getAll() {
    return BaseAPIConfig.get(`${this.controller}`);
  }
  /**
   * Hàm lấy dữ liệu theo id
   */
  getById(id) {
    return BaseAPIConfig.get(`${this.controller}/${id}`)
  }
  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   */
  paging(filterName, params) {
    return BaseAPIConfig.get(`${this.controller}/${filterName}`, {params: params});
  }
  /**
   * Hàm thêm dữ liệu
   * @param {*} body
   */
  add(body) {
    return BaseAPIConfig.post(`${this.controller}`, body);
  }
  /**
   * Hàm cập nhật dữ liệu
   * @param {*} id
   * @param {*} body
   */
  update(body, id) {
    return BaseAPIConfig.put(`${this.controller}/${id}`, body);
  }
  /**
   * Hàm xóa bản ghi
   * @param {*} id
   */
  delete(id) {
    return BaseAPIConfig.delete(`${this.controller}/${id}`);
  }
}