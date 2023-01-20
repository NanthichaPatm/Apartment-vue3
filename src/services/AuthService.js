import axios from "axios";

const api_endpoint = process.env.VUE_APP_API_URL || "http://localhost:8000";

export default {
  async loginAuth(infoLogin) {
    let url = `${api_endpoint}/login`;
    let body = {
      email: infoLogin.username,
      password: infoLogin.password,
    };
    console.log(body);
    let res = await axios.post(url, body);
    console.log(res);

    if (res.data.status == true) {
      console.log("success");
      console.log(res.data.authorization.token);
      localStorage.setItem("apartment-auth", res.data.authorization.token);
      console.log(localStorage.getItem("apartment-auth"));
    } else {
      console.log("error");
    }
    return res.data;
  },
  getHeader() {
    console.log(localStorage.getItem("apartment-auth"));
    let token = localStorage.getItem("apartment-auth");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // return "hello";
  },
};
