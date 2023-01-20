<template>
  <div>
    <button class="btn btn-primary pt-2 float-end" @click="addPopup">
      +<BootstrapIcon icon="receipt-cutoff" size="md" variant="light" />
      เพิ่มบิล
    </button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
// import BillService from "../services/BillService";
import RoomService from "../services/RoomService";
import BillService from "@/services/BillService";
export default {
  name: "AddBill",

  data() {
    return {
      bill: {
        roomId: "",
        amount: "",
        month: "",
        year: "",
        type: "",
      },
      currentMonth: "",
      currentYear: "",
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
      option: "",
      roomNotFree: [],
      roomOption: "",
    };
  },

  async mounted() {
    var date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear() + 543;
    this.option = this.getMonth();
    console.log(this.option);
    console.log(this.currentYear);

    this.roomNotFree = await RoomService.getRoomNotFree();
    console.log(this.roomNotFree);
    this.roomOption = this.getNotFree();
    console.log(this.roomOption);
  },

  methods: {
    getMonth() {
      let option = ``;
      this.arrayMonth.forEach((element, index) => {
        if (index == this.currentMonth) {
          option += `<option selected value="${element}">${element}</option>`;
        } else {
          option += `<option value="${element}">${element}</option>`;
        }
      });
      console.log(option);
      return option;
    },
    getNotFree() {
      let option = ``;
      this.roomNotFree.forEach((room) => {
        option += `<option value="${room.id}">${room.number}</option>`;
      });
      console.log(option);
      return option;
    },
    async addPopup() {
      const { value: formValues } = await Swal.fire({
        title: "เพิ่มรายการบิล",
        showCancelButton: true,
        html: `<label for="roomNumber" style="display: inline-block; width: 180px">หมายเลขห้อง:</label>
          <select name="roomNumber" id="roomNumber" class="swal2-input" style="display: inline; width: 180px" >
              <option selected>เลือกห้อง</option>
              ${this.roomOption}
          </select>
          <br>
          <label for="type" style="display: inline-block; width: 180px">ประเภท:</label>
          <select name="type" id="type" class="swal2-input" style="display: inline; width: 180px">
          <option selected>เลือกประเภท</option>
          <option value="rent">ค่าเช่าห้อง</option>
          <option value="water">ค่าน้ำ</option>
          <option value="electricity">ค่าไฟ</option>
          </select>
          <br>
          <label for="amount" style="display: inline-block; width: 180px">จำนวนเงิน:</label>
          <input type="number" id="amount" class="swal2-input" style="display: inline; width: 180px"/>
          <br>
          <label for="month" style="display: inline-block; width: 180px">เดือน:</label>
          <select name="month" id="month" class="swal2-input" style="display: inline; width: 180px" value="mmm">
          ${this.option}
          </select>
          <br>
          <label for="year" style="display: inline-block; width: 180px">ปี:</label>
          <input type="number" id="year" class="swal2-input" style="display: inline; width: 180px" value=${this.currentYear}
          />
          <br>`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            roomNumber: document.getElementById("roomNumber").value,
            type: document.getElementById("type").value,
            amount: document.getElementById("amount").value,
            month: document.getElementById("month").value,
            year: document.getElementById("year").value,
          };
        },
      });
      if (formValues) {
        (this.bill.roomId = formValues.roomNumber),
          (this.bill.type = formValues.type),
          (this.bill.amount = formValues.amount),
          (this.bill.month = formValues.month),
          (this.bill.year = formValues.year),
          console.log(this.bill);

        try {
          let res = await BillService.createBill(this.bill);
          console.log(res);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "เกิดความผิดพลาด!",
            text: "กรอกข้อมูลไม่ครบถ้วน",
          });
        }

        this.$emit("update");
      }
    },
  },
};
</script>
