import { createWebHistory, createRouter } from "vue-router";
import ComicsPage from "@/components/pages/ComicsPage.vue";
import ComicPage from "@/components/pages/ComicPage.vue";
import CharactersPage  from "@/components/pages/CharactersPage.vue";
import CharacterPage from "@/components/pages/CharacterPage.vue";

const routes = [
  
  {
    path: "/marvel/",
    name: "characters",
    component: CharactersPage,
  },
  {
    path: "/marvel/:id",
    name: "character",
    component: CharacterPage,
  },
  {
    path: "/marvel/comics",
    name: "comics",
    component: ComicsPage,
  },
  {
    path: "/marvel/comics/:id",
    name: "comic",
    component: ComicPage,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;