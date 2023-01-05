<template>
  <div>
    <nav class="sidenav nav flex-column">
      <router-link to="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5352/5352132.png"
          style="height: 6rem; width: 9.25rem"
        />
      </router-link>
      <a
        id="manage"
        class="nav-link"
        data-bs-toggle="collapse"
        data-bs-target="#listRoom"
        href="#"
        @click="onClick1"
      >
        <BootstrapIcon icon="houses" size="md" />
        <strong> จัดการห้อง</strong>
      </a>
      <div id="listRoom" class="collapse">
        <router-link to="/manage/listRoom">
          <a class="nav-link float-end">รายการห้อง</a>
        </router-link>
      </div>
      <a
        id="manageCustomers"
        class="nav-link"
        data-bs-toggle="collapse"
        data-bs-target="#listCust"
        href="#"
        @click="onClick2"
      >
        <BootstrapIcon icon="people" size="md" />
        <strong> จัดการลูกค้า</strong>
      </a>
      <router-link to="/manage/listCustomer">
        <div id="listCust" class="collapse">
          <a class="nav-link float-end">รายการลูกค้า</a>
        </div>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "sideNav",

  data() {
    return {
      isVisible1: false,
      isVisible2: false,
    };
  },

  mounted() {},

  methods: {
    onClick1() {
      this.isVisible1 = !this.isVisible1;
    },
    onClick2() {
      this.isVisible2 = !this.isVisible2;
    },
  },
};
</script>
<style scoped>
nav {
  padding-top: 0px;
  text-align: start;
  background: rgb(215, 215, 215);
  font-family: "Kanit", sans-serif;
}
.sidenav {
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 20px;
  left: 20px;
  background: #eee;
  overflow-x: hidden;
  padding: 0px 0;
}
.sidenav a {
  padding: 6px 8px 8px 16px;
  text-decoration: none;
  color: #3d3d3d;
  display: block;
  text-align: start;
  padding-left: 25px;
}
.sidenav a:hover {
  color: rgb(0, 53, 186);
}
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 1.1rem;
  }
  .nav-link {
    margin-left: 200px; /* Same as the width of the sidenav */
    font-size: 28px; /* Increased text to enable scrolling */
    padding: 0px 10px;
  }
}
</style>
