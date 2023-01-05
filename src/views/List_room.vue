<template>
  <div class="listRoom">
    <header>รายการห้องพัก</header>
    <div>
      <AddRoom @update="updateRoom" />
    </div>
    <hr />
    <section>
      <div>
        <table class="roomTable table table-hover table-class">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">หมายเลขห้อง</th>
              <th scope="col">ชื่อผู้เข้าพัก</th>
              <th scope="col" class="middleTable">สถานะ</th>
              <th scope="col" class="middleTable text-secondary">แก้ไข</th>
              <th scope="col" class="middleTable text-secondary">ลบ</th>
            </tr>
          </thead>
          <tbody class="roomList align-middle">
            <tr class="roomID" v-for="(room, index) in rooms" :key="index">
              <td scope="row">{{ index + 1 }}</td>
              <td>{{ room.number }}</td>
              <td>{{ room.customer?.name || "-" }}</td>
              <td
                v-if="room.status == 'free'"
                class="middleTable text-bg-success rounded"
              >
                ห้องว่าง
              </td>
              <td
                v-else-if="room.status == 'not_free'"
                class="middleTable text-bg-danger rounded"
              >
                ห้องไม่ว่าง
              </td>
              <td class="middleTable">
                <button class="btn btn-light" @click="get_room(room)">
                  <BootstrapIcon
                    icon="pencil-fill"
                    size="md"
                    variant="primary"
                  />
                </button>
              </td>
              <td class="middleTable">
                <button
                  v-if="room.status == 'free'"
                  class="btn btn-light"
                  @click="confirmDelete(room.id)"
                >
                  <BootstrapIcon
                    icon="house-dash-fill"
                    size="md"
                    variant="danger"
                  />
                </button>
                <p v-else-if="room.status == 'not_free'" class="status btn"></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div v-if="editInfo">
        <h2>แก้ไขข้อมูลห้อง</h2>
        <form v-on:submit.prevent="edit_room(this.room)">
          <div class="form-group">
            <label for="roomNumber" class="edit-label">แก้ไขเลขห้อง:</label>
            <input
              type="ืnumber"
              name="roomNumber"
              class="form-control"
              v-model="room.number"
            />
          </div>
        </form>
      </div> -->
    </section>
  </div>
</template>

<script>
import RoomService from "../services/RoomService";
import AddRoom from "../components/AddRoom";
import Swal from "sweetalert2";
export default {
  name: "listRoom",
  components: { AddRoom },

  data() {
    return {
      rooms: [],
    };
  },

  async mounted() {
    this.rooms = await RoomService.getAllRooms();
    console.log(this.rooms);
  },

  methods: {
    async updateRoom() {
      this.rooms = await RoomService.getAllRooms();
    },
    async deleteRoom(id) {
      console.log(id);
      let res = await RoomService.deleteRoom(id);
      console.log(res);
      this.updateRoom();
    },
    get_room(room) {
      console.log(room);
      this.$router.push(`/edit_room/${room.id}`);
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
          title: "ลบรายการห้อง",
          text: "ยืนยันการลบห้องรายการนี้?",
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
              "ลบห้องรายการนี้สำเร็จ!",
              "success"
            );
            this.deleteRoom(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "ยกเลิกการลบ",
              "ยกเลิกการลบรายการนี้สำเร็จ!",
              "error"
            );
          }
        });
    },
  },
};
</script>
<style scoped>
.listRoom {
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
.roomTable {
  font-size: 1.15rem;
  text-align: start;
}
.middleTable {
  text-align: center;
}
</style>
