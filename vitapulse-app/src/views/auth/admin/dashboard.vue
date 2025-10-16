<script setup lang="ts">
import AdminLayout from "@/layouts/adminLayout.vue";
import {
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from "vue";
import type { Counts, Logins } from "@/types/types";
import { useAxios } from "@/axios/useAxios";
import SkeletonLoader from "@/components/SkeletonLoader..vue";
import ErrorComp from "@/components/ErrorComp.vue";
import { setUpWebSocketConnection } from "@/composables/websockets";
const AsyncCount = defineAsyncComponent({
  loader: () => import("@/components/admin/counters.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});

const AsyncLogin = defineAsyncComponent({
  loader: () => import("./LoginsChart/LoginChart.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});
const AsyncAge = defineAsyncComponent({
  loader: () => import("./LoginsChart/AgeDistri.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});
const AsyncAbnormalities = defineAsyncComponent({
  loader: () => import("./LoginsChart/AbormalChart.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});

const dashData = ref([]);
let ws: WebSocket | null = null;
const webscoketSetup = (filter?: string) => {
  // ws = new WebSocket('wss://vitapulse-api.onrender.com/api/auth/ws/dashboard');
  ws = setUpWebSocketConnection("dashboard");

  ws.onopen = (event) => {
    console.log("WebSocket connection established");
  };
  ws.onmessage = async (event) => {
    dashData.value = JSON.parse(event.data);
  };
  ws.onclose = () => {
    console.log("Websocket connection has been closed");
  };
  ws.onerror = (error) => {
    console.log(error);
  };

  return ws;
};

onMounted(async () => {
  try {
    webscoketSetup();
    // const { data } = await useAxios.get('/auth/ws/dashboard');
    // console.log(data)
    // dashData.value = data
  } catch (error) {
    // dashData.value = null
    // console.log(error)
  }
});

onBeforeUnmount(() => {
  ws?.close();
});

provide("data", dashData);
</script>

<template>
  <AdminLayout>
    <AsyncCount />

    <!-- First Row of Content with Dark Mode -->
    <div
      class="flex my-10 md:flex-nowrap flex-wrap justify-between gap-4 overflow-hidden"
    >
      <AsyncLogin />
      <AsyncAge />
    </div>

    <!-- Second Row of Content with Dark Mode -->
    <div
      class="flex my-10 md:flex-nowrap flex-wrap justify-between gap-4 overflow-hidden"
    >
      <AsyncAbnormalities />
    </div>
  </AdminLayout>
</template>
