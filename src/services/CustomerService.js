import axios from "axios";

const api_endpoint = process.env.VUE_APP_API_URL || "http://localhost:8000";

export default {
  async getAllCustomer(filter) {
    let url = `${api_endpoint}/customers/all`;
    let body = {
      search: filter.search,
      status: filter.status,
    };
    console.log(body);
    let res = await axios.post(url, body);
    console.log(res);
    return res.data;
  },
  async createCustomer(name, id_number, phone) {
    let url = `${api_endpoint}/customers/create`;
    let body = {
      name: name,
      id_number: id_number,
      phone: phone,
    };
    let res = await axios.post(url, body);
    console.log(res);
    return res.data;
  },
  async deleteCustomer(id) {
    let url = `${api_endpoint}/customers/delete/${id}`;

    let res = await axios.delete(url);
    console.log(res);
    return res.data;
  },
  async getCustomer(id) {
    let url = `${api_endpoint}/customers/${id}`;
    let res = await axios.get(url);
    return res.data;
  },
  async editCustomer(customer) {
    let url = ` ${api_endpoint}/customers/update/${customer.id}`;
    let body = {
      name: customer.name,
      id_number: customer.id_number,
      phone: customer.phone,
    };
    let res = await axios.put(url, body);
    console.log(res);
    return res.data;
  },
  async assignCustomerToRoom(room_id, customer_id) {
    let url = ` ${api_endpoint}/customers/assign`;
    let body = {
      room_id: room_id,
      customer_id: customer_id,
    };
    console.log(body);
    let res = await axios.post(url, body);
    return res.data;
  },
};
