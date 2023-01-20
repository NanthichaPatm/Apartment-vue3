<template>
  <div class="body">
    <div class="container">
      <h1>ล็อคอินเข้าสู่ระบบ</h1>
      <hr />
      <div>
        <div class="form-control">
          <label for="username">Username </label>
          <input
            type="e-mail"
            v-model="infoLogin.username"
            placeholder="e-mail"
          />
        </div>
        <div class="form-control">
          <label for="passsword">Password </label>
          <input
            type="password"
            v-model="infoLogin.password"
            placeholder="*******"
            id="myInput"
          />
          <div class="text-end">
            <input
              type="checkbox"
              @click="showPassword()"
              class="d-inline-block align-middle"
              style="width: 20px"
            />
            <span class="d-inline-block">Show Password</span>
          </div>
        </div>

        <button @click="login()" class="btn btn-success mt-3 mb-3">
          เข้าสู่ระบบ
        </button>
        <p class="text">Don't have an account? <a href="">Register</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  name: "LoginComponent",

  data() {
    return {
      infoLogin: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      console.log(this.infoLogin);
      let res = await AuthService.loginAuth(this.infoLogin);
      if (res == false) {
        alert("เกิดข้อผิดพลาด!");
        this.clearForm();
      } else {
        this.$router.push({ name: "home" });
      }
    },
    showPassword() {
      let x = document.getElementById("myInput");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    clearForm() {
      this.infoLogin = {
        username: "",
        password: "",
      };
    },
  },
};
</script>
<style scoped>
.body {
  color: #fff;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  height: 100vh;

  overflow: hidden;

  margin: 0;
}
.container {
  background-color: rgb(67, 67, 67);

  padding: 20px 40px;

  border-radius: 10px;
  width: 50%;
  height: 80%;
}
.container a {
  text-decoration: none;

  color: lightblue;
}
h1 {
  margin-top: 1rem;
}
hr {
  margin: 2rem auto 3rem auto;
}
.form-control {
  margin: 20px 0 40px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  background: whitesmoke;
}
.form-control label {
  font-size: 20px;
}
.form-control input {
  border: 0;
  border-bottom: 1px rgb(90, 91, 92) solid;

  width: 100%;

  padding: 10px 0;

  font-size: 18px;
  background-color: transparent;
}
.form-control:hover {
  background: white;
}

.form-control input:focus {
  outline: 0;
  font-size: 25px;
  border-bottom: 3px solid rgb(39, 50, 119);
}
.form-control input[type="checkbox"] {
  font-size: 25px;
}
</style>
