import { ServiceResponse } from "../utils/types";

export default interface IService<T> {
    findById(id: number): ServiceResponse<T>;
}

