import UserVideo from "../models/UserVideo";
import ApiGenerics from "./ApiGenerics";


export default class ApiUserVideo extends ApiGenerics<UserVideo> {
    constructor() {
        super("/user_video");
    }
}