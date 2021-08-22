import BaseAPI from "../base/BaseAPI";

class PositionAPI extends BaseAPI {
  constructor() {
    super();
    this.controller = "api/v1/positions";
  }
}

export default new PositionAPI();