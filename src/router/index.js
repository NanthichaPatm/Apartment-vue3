import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SideNav from "../components/SideNav.vue";
import List_room from "../views/List_room.vue";
import EditRoom from "../views/EditRoom.vue";
import list_cust from "../views/List_cust.vue";
import EditCustomer from "../views/EditCustomer.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
