import axios from "axios";
import AuthService from "@/services/AuthService";

const api_endpoint = process.env.VUE_APP_API_URL || "http://localhost:8000";

export default {
  async getAllRooms(filter) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/rooms/all`;
    let body = {
      search: filter.search,
      status: filter.status,
    };
    console.log(headers);
    console.log(body);
    let res = await axios.post(url, body, headers);
    console.log(res);
    return res.data;
  },
  async createRoom(number) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/rooms/create`;
    let body = {
      number: number,
    };
    let res = await axios.post(url, body, headers);
    console.log(res);
    return res.data;
  },
  async deleteRoom(id) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/rooms/delete/${id}`;

    let res = await axios.delete(url, headers);
    console.log(res);
    return res.data;
  },
  async getRoom(id) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/rooms/${id}`;
    let res = await axios.get(url, headers);
    console.log(res);
    return res.data;
  },
  async editRoom(room) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/rooms/update/${room.id}`;
    let body = {
      number: room.number,
    };
    let res = await axios.put(url, body, headers);
    console.log(res);
    return res.data;
  },
  async getRoomNotFree() {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/rooms/notFree`;
    let res = await axios.get(url, headers);
    console.log(res);
    return res.data;
  },
  //
};
