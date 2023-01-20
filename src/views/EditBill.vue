<template>
  <div class="editBill">
    <header>
      <div>แก้ไขข้อมูลบิลห้องหมายเลข: {{ bill.room?.number }}</div>
      <div v-if="bill.room">ชื่อผู้เช่า: {{ bill.room.customer.name }}</div>
    </header>
    <button class="btn btn-danger f-2 float-end" @click="cancelEdit()">
      <BootstrapIcon icon="x-square-fill" size="md" />
      ยกเลิกการแก้ไข
    </button>
    <hr />
    <section class="mt-5">
      <form v-on:submit.prevent="edit_bill()" class="formEdit" id="Form">
        <div class="form-group">
          <label for="roomNumber" class="edit-label">หมายเลขห้อง: </label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="bill.room_id"
          >
            <option
              :value="room.id"
              v-for="(room, index) in roomNotFree"
              :key="index"
            >
              {{ room?.number }}
            </option>
          </select>
          <br />
          <label for="type" class="edit-label">ประเภท: </label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="bill.type"
          >
            <option value="rent">ค่าเช่าห้อง</option>
            <option value="water">ค่าน้ำ</option>
            <option value="electricity">ค่าไฟ</option>
          </select>
          <br />
          <label for="amount" class="edit-label">จำนวนเงิน: </label>
          <input
            type="number"
            name="amount"
            class="form-control"
            v-model="bill.amount"
          />
          <br />
          <label for="month" class="edit-label">เดือน: </label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="bill.month"
          >
            <option
              :value="month"
              v-for="(month, index) in arrayMonth"
              :key="index"
            >
              {{ month }}
            </option>
          </select>
          <br />
          <label for="year" class="edit-label">ปี: </label>
          <input
            type="number"
            name="year"
            class="form-control"
            v-model="bill.year"
          />
        </div>
        <div class="saveEdit">
          <button type="submit" class="form_btn btn btn-success">บันทึก</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import BillService from "@/services/BillService";
import RoomService from "@/services/RoomService";
export default {
  name: "EditBill",

  data() {
    return {
      billId: this.$route.params.billId,
      bill: {},
      roomNotFree: [],
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
  async created() {
    this.bill = await BillService.getBill(this.billId);
  },
  async mounted() {
    this.roomNotFree = await RoomService.getRoomNotFree();
    console.log(this.roomNotFree);
  },
  methods: {
    cancelEdit() {
      this.$router.push(`/manage/listBill`);
    },
    async edit_bill() {
      this.room = await BillService.editBill(this.bill);
      this.$router.push(`/manage/listBill`);
    },
  },
};
</script>
<style scoped>
.editBill {
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
}
.formEdit {
  text-align: start;
  font-size: 1.25rem;
}
.edit-label {
  display: inline-block;
  width: 9rem;
  margin-left: 5rem;
}
.form-control {
  display: inline;
  width: 50%;
  font-size: 1.25rem;
}
.form-select {
  display: inline;
  width: 50%;
  font-size: 1.25rem;
  margin-left: 0;
}
.saveEdit {
  display: block;
  text-align: center;
  margin-top: 3rem;
}
.form_btn {
  width: 6.5rem;
  margin: 1rem;
}
</style>
