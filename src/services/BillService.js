import axios from "axios";
import AuthService from "@/services/AuthService";

const api_endpoint = process.env.VUE_APP_API_URL || "http://localhost:8000";
export default {
  async getAllBill(filter) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/bills/all`;
    let body = {
      room_number: filter.search,
      status: filter.status,
      type: filter.type,
      month: filter.month,
      year: filter.year,
    };
    console.log(body);
    let res = await axios.post(url, body, headers);
    console.log(res);
    return res.data;
  },
  async createBill(bill) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/bills/create`;
    let body = {
      room_id: bill.roomId,
      amount: bill.amount,
      month: bill.month,
      year: bill.year,
      type: bill.type,
    };
    console.log(body);
    let res = await axios.post(url, body, headers);
    console.log(res);
    return res.data;
  },
  async deleteBill(id) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/bills/delete/${id}`;

    let res = await axios.delete(url, headers);
    console.log(res);
    return res.data;
  },
  async getBill(id) {
    let headers = AuthService.getHeader();
    let url = `${api_endpoint}/bills/${id}`;
    let res = await axios.get(url, headers);
    console.log(res);
    return res.data;
  },
  async editBill(bill) {
    let headers = AuthService.getHeader();
    let url = ` ${api_endpoint}/bills/update/${bill.id}`;
    let body = {
      room_id: bill.room_id,
      amount: bill.amount,
      month: bill.month,
      year: bill.year,
      type: bill.type,
    };
    let res = await axios.put(url, body, headers);
    console.log(res);
    return res.data;
  },
  async updateStatus(bill) {
    let headers = AuthService.getHeader();
    let url = ` ${api_endpoint}/bills/updateStatus/${bill.id}`;
    let body = {
      id: bill.id,
      status: bill.status,
    };
    let res = await axios.post(url, body, headers);
    console.log(res);
    return res.data;
  },
};
