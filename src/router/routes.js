const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "program", component: () => import("pages/ProgramPage.vue") },
      {
        path: "about-solomin",
        component: () => import("pages/AboutSolominPage.vue"),
      },
      {
        path: "",
        // path: "about-conference",
        component: () => import("pages/AboutConferencePage.vue"),
      },
      {
        path: "organizers",
        component: () => import("pages/OrganizersPage.vue"),
      },
      {
        path: "commettee",
        component: () => import("pages/CommetteePage.vue"),
      },
      {
        path: "publication",
        component: () => import("pages/PublicationPage.vue"),
      },
      {
        path: "contacts",
        component: () => import("pages/ContactsPage.vue"),
      },
      {
        path: "path",
        component: () => import("pages/PathPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
