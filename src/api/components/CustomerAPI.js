import BaseAPI from '../base/BaseAPI';
import BaseAPIConfig from '../base/BaseAPIConfig';

class CustomerAPI extends BaseAPI {
  constructor(){
      super();
      this.controller = "api/v1/customers";
  }

  getNewCustomerCode() {
    return BaseAPIConfig.get(`${this.controller}/NewCustomerCode`);
  }
}

export default new CustomerAPI();