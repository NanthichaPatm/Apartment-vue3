import axios from "axios";

const api_endpoint = process.env.VUE_APP_API_URL || "http://localhost:8000";

export default {
  async getAllRooms() {
    let url = `${api_endpoint}/rooms/all`;
    // let header = {
    //   Origin: "http://localhost:8000",
    // };
    // let body = {
    //   tableId: tableId,
    // };
    let res = await axios.get(url);
    console.log(res);
    return res.data;
  },
  async createRoom(number) {
    let url = `${api_endpoint}/rooms/create`;
    let body = {
      number: number,
    };
    let res = await axios.post(url, body);
    console.log(res);
    return res.data;
  },
  async deleteRoom(id) {
    let url = `${api_endpoint}/rooms/delete/${id}`;

    let res = await axios.delete(url);
    console.log(res);
    return res.data;
  },
  async getRoom(id) {
    let url = `${api_endpoint}/rooms/${id}`;
    let res = await axios.get(url);
    console.log(res);
    return res.data;
  },
  async editRoom(room) {
    let url = `${api_endpoint}/rooms/update/${room.id}`;
    let body = {
      number: room.number,
    };
    let res = await axios.put(url, body);
    console.log(res);
    return res.data;
  },
  //
};
