  
import BaseAPI from '../base/baseapi';
import BaseAPIConfig from '../base/baseapiconfig';

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