import axios from "axios";

class ApiGenerics<T> {
    static axiosInstance = axios.create({
        baseURL: "http://localhost:8000",
    })

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    create = (obj: T) =>
        ApiGenerics.axiosInstance
            .post(this.endpoint + "/create/", obj)
            .then((res) => res.data)

    delete = (id: number) =>
        ApiGenerics.axiosInstance
            .delete(this.endpoint + "/delete/" + id)
            .then((res) => res.data)

    update = (obj: T) =>
        ApiGenerics.axiosInstance
            .put(this.endpoint + "/update/", obj)
            .then((res) => res.data)

    getAll = () =>
        ApiGenerics.axiosInstance
            .get<T[]>(this.endpoint).then((rest) => rest.data)

    getById = (id: string) =>
        ApiGenerics.axiosInstance
            .get<T>(this.endpoint + "/getById/" + id).then(
                (res) => res.data)
    getByRoom = (room: string) =>
        ApiGenerics.axiosInstance
        .get<T>(this.endpoint + "/getByRoomCode/" + room).then(
            (res) => res.data)

}

export default ApiGenerics;