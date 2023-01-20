<template>
  <div class="editRoom">
    <header>แก้ไขข้อมูลห้องหมายเลข: {{ room.number }}</header>
    <button class="btn btn-danger f-2 float-end" @click="cancelEdit()">
      <BootstrapIcon icon="x-square-fill" size="md" />
      ยกเลิกการแก้ไข
    </button>
    <hr />
    <section class="mt-5">
      <form v-on:submit.prevent="edit_room()" class="formEdit" id="Form">
        <div class="form-group">
          <label for="roomNumber" class="edit-label">หมายเลขห้อง: </label>
          <input
            type="text"
            name="roomNumber"
            class="form-control"
            v-model="room.number"
          />
        </div>
        <div class="form-group">
          <label for="customerName" class="edit-label">ชื่อผู้เข้าพัก: </label>
          <input
            v-if="customer.name != null"
            type="text"
            name="customerName"
            class="form-control"
            :value="customer?.name"
            disabled
          />
          <input
            v-else
            type="text"
            name="customerName"
            class="form-control"
            value="ไม่มีผู้เข้าพัก"
            disabled
          />
          <label for="customerName" class="edit-label">แก้ไขผู้เข้าพัก: </label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="customer.id"
          >
            <option selected value="null" v-if="customer.id != null">
              ลบผู้เข้าพัก
            </option>
            <option
              :value="customer.id"
              v-for="(customer, index) in customersInactive"
              :key="index"
            >
              {{ customer?.name }}
            </option>
          </select>
        </div>
        <div class="saveEdit">
          <button type="submit" class="form_btn btn btn-success">บันทึก</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import RoomService from "../services/RoomService";
import CustomerService from "../services/CustomerService";
export default {
  name: "EditRoom",

  data() {
    return {
      roomId: this.$route.params.roomId,
      room: {},
      updateRoom: {},
      customer: {
        id: null,
      },
      customersInactive: [],
    };
  },

  async mounted() {
    this.room = await RoomService.getRoom(this.roomId);
    if (this.room.customer != null) {
      this.customer = this.room.customer;
    }

    console.log(this.customer);
    this.customersInactive = await CustomerService.getAllCustomer({
      search: null,
      status: "inactive",
    });
    console.log(this.customersInactive);
  },

  methods: {
    cancelEdit() {
      this.$router.push(`/manage/listRoom`);
    },
    async edit_room() {
      this.room = await RoomService.editRoom(this.room);
      if (this.customer.id == "null") {
        this.customer.id = null;
      }
      await CustomerService.assignCustomerToRoom(
        this.room.id,
        this.customer.id
      );

      this.$router.push(`/manage/listRoom`);
    },
  },
};
</script>

<style scoped>
.editRoom {
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
