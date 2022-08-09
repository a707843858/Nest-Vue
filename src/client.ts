import { createApp } from "@/core/utils";
import App           from "src/pages/App.vue";

const { app,router } = createApp(App);

router.isReady().then(()=>{
  app.mount('#app')
})
