<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  defineAsyncComponent,
  computed,
} from "vue";
import SkeletonLoader from "@/components/SkeletonLoader..vue";
import ErrorComp from "@/components/ErrorComp.vue";
import userLayout from "@/layouts/userLayout.vue";
import { useUserStore } from "@/stores/useUser";
import { useBpStore } from "@/stores/UseBp";
import { getBpAndPulseByAge } from "@/utils/BpByAge";
import type { User, bpPulse } from "@/types/types";
import { getTheAge } from "@/utils/getTheAge";
import { useToast } from "@nuxt/ui/runtime/composables/useToast.js";
import { setUpWebSocketConnection as wb } from "@/composables/websockets";

const toast = useToast();
const { getUser } = useUserStore();
const { postBp } = useBpStore();

const AsyncCardComp = defineAsyncComponent({
  loader: () => import("@/components/CardComp.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});
const AsyncPulseRateCard = defineAsyncComponent({
  loader: () => import("@/components/PulseRateCard.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});
const AsyncInforList = defineAsyncComponent({
  loader: () => import("@/components/InforList.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});

const AsyncPage = defineAsyncComponent({
  loader: () => import("@/views/auth/user/historicalData.vue"),
  loadingComponent: SkeletonLoader,
  delay: 200,
  errorComponent: ErrorComp,
  timeout: 3000,
});

let lastSaved = Date.now();

const user = ref<User | null>(null);
const data = ref<bpPulse | null>(null);

let ws: WebSocket | null = null;
const setUpWebSocketConnection = () => {
  // ws = new WebSocket('wss://vitapulse-api.onrender.com/api/auth/ws/bp');
  ws = wb("bp");

  ws.onopen = (event) => {
    console.log("WebSocket connection established");
  };
  ws.onmessage = async (event) => {
    const readings = JSON.parse(event.data);
    data.value = readings;
    const now = Date.now();
    if (
      readings.diastolic !== 254 &&
      readings?.systolic !== 254 &&
      readings.pulseRate !== 254
    ) {
      if (now - lastSaved >= 3000) {
        const issaved = await postBp(
          readings.systolic,
          readings.diastolic,
          readings.pulseRate,
          readings.date,
        );
        if (issaved) {
          toast.add({
            title: "Saved",
            description: "Readings saved",
            color: "success",
          });
          lastSaved = now;
        } else {
          toast.add({
            title: "Skipped",
            description: "Data is already saved",
            color: "info",
          });
        }
      }
    }
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
  user.value = await getUser();
  setUpWebSocketConnection();
});

onBeforeUnmount(() => {
  ws?.close();
  ws = null;
  // if (ws && ws.readyState === WebSocket.OPEN) {

  //     ('WebSocket manually closed on unmount');
  // }
});

const reconnect = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
  setUpWebSocketConnection();
};
</script>

<template>
  <userLayout>
    <UContainer class="py-4 px-2 w-full mt-4">
      {{ console.log(user) }}
      <div v-if="user">
        <AsyncInforList :auth="user" />
      </div>

      <h1 class="text-3xl my-10 font-bold self-start">Real-time monitor</h1>
      <div
        v-if="
          data?.diastolic && data?.systolic && data?.pulseRate && user?.birthday
        "
        class="my-5 flex lg:flex-nowrap flex-wrap w-full gap-4"
      >
        <AsyncCardComp
          :bpAndPulse="{
            systolic: data?.systolic,
            diastolic: data?.diastolic,
            age: Number(getTheAge(String(user?.birthday))),
            pulse: data?.pulseRate,
          }"
        />
        <AsyncPulseRateCard
          :PulseRate="{
            pulse_rate: data.pulseRate,
            age: Number(getTheAge(String(user?.birthday))),
          }"
        />
      </div>
      <div
        v-else
        class="p-3 my-2 bg-amber-500 text-black rounded-sm shadow-sm flex items-center gap-5"
      >
        <div class="flex flex-col">
          <p class="text-lg font-semibold flex gap-3 items-center">
            <UIcon name="i-lucide-unplug" class="size-5" />Real-time connection
            lost
          </p>
          <ul class="list-item list-disc ms-15">
            <li class="">Check your internet connection</li>
            <li>Check your device</li>
          </ul>
        </div>

        <UButton
          @click="reconnect"
          class="bg-amber-300 ms-auto text-black"
          icon="i-lucide-plug-zap"
          >Reconnect
        </UButton>
      </div>
    </UContainer>

    <UContainer>
      <AsyncPage />
    </UContainer>
  </userLayout>
</template>
