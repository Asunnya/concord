import Meeting from "../models/Meeting";
import ApiGenerics from "./ApiGenerics";


export default class ApiMeeting extends ApiGenerics<Meeting> {
    constructor() {
        super("/meeting");
    }
}