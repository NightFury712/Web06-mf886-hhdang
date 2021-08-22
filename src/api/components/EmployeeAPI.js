  
import BaseAPI from '../base/BaseAPI';
import BaseAPIConfig from '../base/BaseAPIConfig';

class EmployeeAPI extends BaseAPI {
  constructor(){
    super();
    this.controller = "api/v1/Employees";
  }

  getNewEmployeeCode() {
    return BaseAPIConfig.get(`${this.controller}/newEmployeeCode`);
  }

  deletes(empDeleteList) {
    return BaseAPIConfig.post(`${this.controller}/deletes`, empDeleteList)
  }
}

export default new EmployeeAPI();