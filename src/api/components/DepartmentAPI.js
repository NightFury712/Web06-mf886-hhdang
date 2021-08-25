import BaseAPI from '../base/baseapi';

class DepartmentAPI extends BaseAPI {
  constructor(){
      super();
      this.controller = "api/v1/departments";
  }
}

export default new DepartmentAPI();
