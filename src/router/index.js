import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SideNav from "../components/SideNav.vue";
import List_room from "../views/List_room.vue";
import EditRoom from "../views/EditRoom.vue";
import list_cust from "../views/List_cust.vue";
import EditCustomer from "../views/EditCustomer.vue";
import list_bill from "../views/List_bill.vue";
import EditBill from "../views/EditBill.vue";
import LoginComponent from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/manage",
    name: "manage",
    component: SideNav,
    children: [
      { path: "listRoom", name: "listRoom", component: List_room },
      {
        path: "/edit_room/:roomId",
        name: "editRoom",
        component: EditRoom,
      },
      { path: "listCustomer", name: "listCustomer", component: list_cust },
      {
        path: "/edit_customer/:custId",
        name: "editCustomer",
        component: EditCustomer,
      },
      { path: "listBill", name: "listBill", component: list_bill },
      {
        path: "/edit_bill/:billId",
        name: "editBill",
        component: EditBill,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
