import api from "../http";

export default class AccountService {
    static async login(login, password) {
        return api.post("/api/v1/account/login", { login: login, password: password });
    }

    static async getInfo() {
        return api.get("/api/v1/account/info");
    }
}