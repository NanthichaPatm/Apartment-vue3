<template>
  <div class="listBill">
    <header>รายการบิล</header>
    <div><AddBill @update="updateBills" /></div>
    <hr />
    <section>
      <!-- filter -->
      <div>
        <div class="d-flex mb-3" role="search">
          <input
            class="form-control"
            style="width: 150px"
            type="text"
            placeholder="ค้นหา เช่น เลขห้อง..."
            aria-label="Search"
            v-model="filter.search"
          />
          <select
            class="form-select ms-2"
            aria-label="Default select example"
            style="width: 150px"
            v-model="filter.status"
          >
            <option selected value="null">สถานะทั้งหมด</option>
            <option value="active">จ่ายแล้ว</option>
            <option value="inactive">ยังไม่จ่าย</option>
          </select>
          <select
            class="form-select ms-2"
            aria-label="Default select example"
            style="width: 150px"
            v-model="filter.type"
          >
            <option selected value="null">ประเภททั้งหมด</option>
            <option value="rent">ค่าห้อง</option>
            <option value="water">ค่าน้ำ</option>
            <option value="electricity">ค่าไฟฟ้า</option>
          </select>
          <select
            class="form-select ms-2 me-2"
            aria-label="Default select example"
            style="width: 150px"
            v-model="filter.month"
          >
            <option value="null">เดือนทั้งหมด</option>
            <option
              :value="month"
              v-for="(month, index) in arrayMonth"
              :key="index"
            >
              {{ month }}
            </option>
          </select>
          <input
            class="form-control me-2"
            style="width: 80px"
            type="number"
            placeholder="พ.ศ."
            min="2565"
            max="2600"
            v-model="filter.year"
          />
          <button class="btn btn-success" @click="searchBill()">ค้นหา</button>
          <button class="btn btn-secondary ms-1" @click="clearFilter()">
            ล้าง
          </button>
        </div>
        <!-- table -->
        <table class="billTable table table-hover table-class">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">เลขห้อง</th>
              <th scope="col" class="middleTable">สถานะ</th>
              <th scope="col">ประเภท</th>
              <th scope="col">จำนวนเงิน</th>
              <th scope="col">เดือน/ปี</th>
              <th scope="col" class="middleTable text-secondary">แก้ไข</th>
              <th scope="col" class="middleTable text-secondary">แจ้งชำระ</th>
            </tr>
          </thead>
          <tbody class="billList align-middle">
            <tr class="billID" v-for="(bill, index) in bills" :key="index">
              <td scope="col">{{ index + 1 }}</td>
              <td scope="col">{{ bill.room.number }}</td>
              <td
                v-if="bill.status == 'paid'"
                class="middleTable text-bg-success rounded"
              >
                จ่ายแล้ว
              </td>
              <td
                v-else-if="bill.status == 'not_paid'"
                class="middleTable text-bg-danger rounded"
              >
                ยังไม่จ่าย
              </td>
              <td
                v-if="bill.type == 'water'"
                class="middleTable text-bg-info rounded"
              >
                <!-- <BootstrapIcon icon="water" size="2x" variant="info" />  -->
                ค่าน้ำ
              </td>
              <td
                v-else-if="bill.type == 'electricity'"
                class="middleTable text-bg-warning rounded"
              >
                <!-- <BootstrapIcon
                  icon="lightning-fill"
                  size="2x"
                  variant="warning"
                /> -->
                ค่าไฟฟ้า
              </td>
              <td
                v-else-if="bill.type == 'rent'"
                class="middleTable text-bg-secondary rounded"
              >
                <!-- <BootstrapIcon
                  icon="house-fill"
                  size="2x"
                  variant="secondary"
                /> -->
                ค่าห้อง
              </td>
              <td scope="col">{{ bill.amount }} บาท</td>
              <td scope="col">{{ bill.month }}/{{ bill.year }}</td>
              <td class="middleTable">
                <div class="dropdown dropstart">
                  <a
                    class="btn btn-secondary dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style="width: 50px"
                  >
                    <BootstrapIcon
                      icon="gear-wide-connected"
                      size="md"
                      variant="light"
                    />
                  </a>

                  <ul class="dropdown-menu" style="width: 50px">
                    <li>
                      <a class="dropdown-item" @click="get_bill(bill)"
                        ><BootstrapIcon
                          icon="pencil-fill"
                          size="md"
                          variant="primary"
                        />
                        แก้ไขข้อมูล</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" @click="confirmDelete(bill.id)"
                        ><BootstrapIcon
                          icon="house-dash-fill"
                          size="md"
                          variant="danger"
                        />
                        ลบ</a
                      >
                    </li>
                  </ul>
                </div>
                <!-- 
                <button class="btn btn-light">
                  <BootstrapIcon
                    icon="pencil-fill"
                    size="md"
                    variant="primary"
                    @click="get_bill(bill)"
                  />
                </button> -->
              </td>
              <td class="middleTable">
                <button class="btn btn-light">
                  <BootstrapIcon
                    icon="currency-dollar"
                    size="md"
                    variant="success"
                    @click="updateStatus(bill)"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import BillService from "../services/BillService";
import AddBill from "../components/AddBill.vue";
import Swal from "sweetalert2";
export default {
  name: "ListBill",
  components: { AddBill },

  data() {
    return {
      bills: [],
      filter: {
        search: null,
        status: null,
        type: null,
        month: null,
        year: null,
      },
      arrayMonth: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
    };
  },

  async mounted() {
    this.bills = await BillService.getAllBill(this.filter);
    console.log(this.bills);
  },

  methods: {
    async updateBills() {
      this.bills = await BillService.getAllBill(this.filter);
    },
    async deleteBill(id) {
      this.bills = await BillService.deleteBill(id);
      await this.updateBills();
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
          title: "ลบรายการบิล",
          text: "ยืนยันการลบบิลรายการนี้?",
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
              "ลบบิลรายการนี้สำเร็จ!",
              "success"
            );
            this.deleteBill(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "ยกเลิกการลบ",
              "ยกเลิกการลบรายการนี้สำเร็จ!",
              "error"
            );
          }
        });
    },
    get_bill(bill) {
      this.$router.push(`/edit_bill/${bill.id}`);
      console.log(bill.id);
    },
    async searchBill() {
      console.log(this.filter.search);
      if (this.filter.status == "null") {
        this.filter.status = null;
      }
      if (this.filter.type == "null") {
        this.filter.type = null;
      }
      if (this.filter.month == "null") {
        this.filter.month = null;
      }
      if (this.filter.year == "null") {
        this.filter.year = null;
      }
      this.bills = await BillService.getAllBill(this.filter);
      console.log(this.bills);
    },
    clearFilter() {
      (this.filter.search = null),
        (this.filter.status = null),
        (this.filter.type = null),
        (this.filter.month = null),
        (this.filter.year = null);
    },
    async updateStatus(bill) {
      if (bill.status == "not_paid") {
        bill.status = "paid";
      } else {
        bill.status = "not_paid";
      }
      await BillService.updateStatus(bill);
    },
  },
};
</script>

<style scoped>
.listBill {
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
.dropdown-menu.show {
  display: block;
}
</style>
