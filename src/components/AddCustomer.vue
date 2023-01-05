<template>
  <div>
    <button class="btn btn-primary pt-2 float-end" @click="addPopup">
      <BootstrapIcon icon="person-fill-add" size="md" variant="light" />
      เพิ่มลูกค้า
    </button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import CustomerService from "../services/CustomerService";
export default {
  name: "AddRoom",

  data() {
    return {
      customer: {
        name: "",
        id_number: "",
        phone: "",
      },
    };
  },

  mounted() {},

  methods: {
    async addPopup() {
      const { value: formValues } = await Swal.fire({
        title: "เพิ่มรายการลูกค้า",
        showCancelButton: true,
        html:
          '<label for="custName" style=" display:inline-block; width:180px;">ชื่อลูกค้า:</label>' +
          '<input type="text" id="custName" class="swal2-input" style=" display:inline; width:180px;">' +
          "<br>" +
          '<label for="custId" style=" display:inline-block; width:180px;">เลขบัตรประชาชนลูกค้า: </label>' +
          '<input  type="number" id="custId" class="swal2-input" style=" display:inline; width:180px;">' +
          "<br>" +
          ' <label for="phoneNumber" style=" display:inline-block; width:180px;">เบอร์โทรลูกค้า: </label>' +
          '<input type="number" id="phoneNumber" class="swal2-input" style= "display:inline; width:180px;">' +
          "<br>",
        focusConfirm: false,
        preConfirm: () => {
          return {
            name: document.getElementById("custName").value,
            id_number: document.getElementById("custId").value,
            phone: document.getElementById("phoneNumber").value,
          };
        },
      });

      if (formValues) {
        (this.customer.name = formValues.name),
          (this.customer.id_number = formValues.id_number),
          (this.customer.phone = formValues.phone),
          console.log(this.customer);
        let res = await CustomerService.createCustomer(
          this.customer.name,
          this.customer.id_number,
          this.customer.phone
        );
        console.log(res);
        this.$emit("update");
      }
    },
  },
};
</script>
