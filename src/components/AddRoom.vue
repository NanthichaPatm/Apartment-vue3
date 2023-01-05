<template>
  <div>
    <button class="btn btn-primary pt-2 float-end" @click="addPopup">
      <BootstrapIcon icon="house-add-fill" size="md" variant="light" />
      เพิ่มห้อง
    </button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import RoomService from "../services/RoomService";
export default {
  name: "AddRoom",

  data() {
    return {
      number: "",
    };
  },

  mounted() {},

  methods: {
    async addPopup() {
      const { value: roomNumber } = await Swal.fire({
        title: "เพิ่มรายการห้อง",
        input: "text",
        inputLabel: "เลขห้องที่ต้องการเพิ่ม",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "กรอกข้อมูลผิดพลาด";
          }
        },
      });
      if (roomNumber) {
        Swal.fire(`เพิ่มห้องหมายเลข: ${roomNumber}`);
        this.number = roomNumber;
      }
      console.log(this.number);
      let res = await RoomService.createRoom(this.number);
      console.log(res);
      this.$emit("update");
    },
  },
};
</script>
