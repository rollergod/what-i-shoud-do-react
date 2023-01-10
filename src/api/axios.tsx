import axios from "axios";

import { host } from "./api_constants";

export default axios.create({
    baseURL: host
});