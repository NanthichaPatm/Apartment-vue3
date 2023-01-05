<template>
  <div class="editCust">
    <header>แก้ไขข้อมูลลูกค้าชื่อ: {{ customer.name }}</header>
    <button class="btn btn-danger f-2 float-end" @click="cancelEdit()">
      <BootstrapIcon icon="x-square-fill" size="md" />
      ยกเลิกการแก้ไข
    </button>
    <hr />

    <section class="mt-5">
      <form v-on:submit.prevent="edit_customer()" class="formEdit" id="Form">
        <div class="form-group">
          <label for="customerName" class="edit-label">ชื่อลูกค้า: </label>
          <input
            type="text"
            name="customerName"
            class="form-control"
            v-model="customer.name"
          />
        </div>
        <div class="form-group">
          <label for="customerIdNumber" class="edit-label"
            >เลขบัตรประชาชนลูกค้า:
          </label>
          <input
            type="text"
            name="customerIdNumber"
            class="form-control"
            v-model="customer.id_number"
          />
        </div>
        <div class="form-group">
          <label for="customerPhone" class="edit-label">เบอร์โทรลูกค้า: </label>
          <input
            type="text"
            name="customerPhone"
            class="form-control"
            v-model="customer.phone"
          />
        </div>
        <!-- <div class="form-group">
          <label for="customerName" class="edit-label">ชื่อผู้เข้าพัก: </label>
          <input
            type="text"
            name="customerName"
            class="form-control"
            v-model="customerName"
          />
        </div> -->
        <div class="saveEdit">
          <button type="submit" class="form_btn btn btn-success">บันทึก</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import CustomerService from "../services/CustomerService";
export default {
  name: "ProjectEditCustomer",

  data() {
    return {
      custId: this.$route.params.custId,
      customer: {},
    };
  },
  async mounted() {
    this.customer = await CustomerService.getCustomer(this.custId);
    console.log(this.customer);
  },

  methods: {
    cancelEdit() {
      this.$router.push(`/manage/listCustomer`);
    },
    async edit_customer() {
      console.log(this.customer);
      this.customer = await CustomerService.editCustomer(this.customer);
      this.$router.push(`/manage/listCustomer`);
    },
  },
};
</script>
<style scoped>
.editCust {
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
  width: 13rem;
  margin-left: 5rem;
}
.form-control {
  display: inline;
  width: 65%;
  font-size: 1.25rem;
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
