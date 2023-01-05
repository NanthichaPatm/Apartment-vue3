<template>
  <div class="listCustomer">
    <header>รายการลูกค้า</header>
    <div><AddCustomer @update="updateCustomer" /></div>
    <hr />
    <section>
      <div>
        <div class="d-flex mb-3" role="search">
          <input
            class="form-control"
            style="width: 200px"
            type="text"
            placeholder="ชื่อลูกค้า หรือ เบอร์โทร ..."
            aria-label="Search"
            v-model="filter.search"
          />

          <select
            class="form-select ms-2 me-2"
            aria-label="Default select example"
            style="width: 150px"
            v-model="filter.status"
          >
            <option selected value="null">สถานะทั้งหมด</option>
            <option value="active">เช่าอยู่</option>
            <option value="inactive">ไม่เช่าอยู่</option>
          </select>
          <button class="btn btn-secondary" @click="searchCustomer()">
            ค้นหา
          </button>
        </div>

        <table class="custTable table table-hover table-class">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">ชื่อลูกค้า</th>
              <th scope="col">เบอร์โทร</th>
              <th scope="col" class="middleTable">สถานะ</th>
              <th scope="col" class="middleTable text-secondary">แก้ไข</th>
              <th scope="col" class="middleTable text-secondary">ลบ</th>
            </tr>
          </thead>
          <tbody class="roomList align-middle">
            <tr
              class="custID"
              v-for="(customer, index) in customers"
              :key="index"
            >
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.phone }}</td>
              <td
                v-if="customer.status == 'active'"
                class="middleTable text-bg-success rounded"
              >
                เช่าอยู่
              </td>
              <td
                v-else-if="customer.status == 'inactive'"
                class="middleTable text-bg-danger rounded"
              >
                ไม่เช่าอยู่
              </td>
              <td class="middleTable">
                <button class="btn btn-light">
                  <BootstrapIcon
                    icon="pencil-fill"
                    size="md"
                    variant="primary"
                    @click="get_customer(customer)"
                  />
                </button>
              </td>
              <td class="middleTable">
                <button
                  class="btn btn-light"
                  v-if="customer.status == 'active'"
                >
                  <BootstrapIcon
                    icon="house-dash-fill"
                    size="md"
                    variant="danger"
                    @click="confirmDelete(customer.id)"
                  />
                </button>
                <p
                  v-else-if="customer.status == 'inactive'"
                  class="status btn"
                ></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import CustomerService from "../services/CustomerService";
import AddCustomer from "../components/AddCustomer";
import Swal from "sweetalert2";
export default {
  name: "ListCust",
  components: { AddCustomer },

  data() {
    return {
      customers: [],
      filter: {
        search: null,
        status: null,
      },
    };
  },

  async mounted() {
    this.customers = await CustomerService.getAllCustomer(this.filter);
    console.log(this.customers);
  },

  methods: {
    async updateCustomer() {
      this.customers = await CustomerService.getAllCustomer(this.filter);
    },
    async deleteCustomer(id) {
      this.customers = await CustomerService.deleteCustomer(id);
      this.updateCustomer();
    },
    confirmDelete(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "ลบรายการลูกค้า",
          text: "ยืนยันการลบลูกค้ารายการนี้?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยีน",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "ลบรายการ!",
              "ลบลูกค้ารายการนี้สำเร็จ!",
              "success"
            );
            this.deleteCustomer(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "ยกเลิกการลบ",
              "ยกเลิกการลบรายการนี้สำเร็จ!",
              "error"
            );
          }
        });
    },
    get_customer(customer) {
      this.$router.push(`/edit_customer/${customer.id}`);
      console.log(customer.id);
    },
    async searchCustomer() {
      console.log(this.filter.search);
      if (this.filter.status == "null") {
        this.filter.status = null;
      }
      this.customers = await CustomerService.getAllCustomer(this.filter);
      console.log(this.customers);
    },
  },
};
</script>

<style scoped>
.listCustomer {
  margin-left: 250px; /* Same width as the sidebar + left position in px */
  margin-top: 20px;
  padding: 0px 10px;
  font-family: "Kanit", sans-serif;
}
header {
  font-size: 30px;
  font-weight: bolder;
  padding: 0 0 20px 0;
  text-align: start;
  margin-top: 3rem;
  font-family: "Kanit", sans-serif;
}
.custTable {
  font-size: 1.15rem;
  text-align: start;
}
.middleTable {
  text-align: center;
}
</style>
