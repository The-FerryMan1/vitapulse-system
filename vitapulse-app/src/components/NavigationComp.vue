<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { computed, inject, ref, toRef } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUser";
import DropdownMenu from "./DropdownMenu.vue";
import { useColorMode } from "@nuxt/ui/runtime/vue/stubs.js";
import type { alerts } from "@/types/types";
import { useAxios } from "@/axios/useAxios";

const { auth, userLogout } = useUserStore();

const router = useRouter();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

const computedItems = computed(() => {
  const items: NavigationMenuItem[] = [
    [
      {
        class: "sm:text-base text-sm",
        onSelect() {
          isDark.value = !isDark.value;
        },
        slot: "components" as const,
      },
      {
        label: "Sign up",
        icon: "i-heroicons-outline:user-add",
        to: "register",
        class: "sm:text-base text-sm",
      },
      {
        label: "Sign in",
        icon: "i-heroicons-outline:user-circle",
        to: "/login",
        class: "sm:text-base text-sm",
      },
    ],
  ];
  const items2: NavigationMenuItem[] = [
    [
      {
        class: "sm:text-base text-sm",
        onSelect() {
          isDark.value = !isDark.value;
        },
        slot: "components" as const,
      },
      {
        label: auth?.role === "admin" ? "admin" : "dashboard",
        icon: "i-lucide-layout-dashboard",
        to: { name: auth?.role === "admin" ? "admin" : "dashboard" },
        class: "sm:text-base text-sm",
      },

      {
        label: "Settings",
        icon: "i-lucide-settings",
        children: [
          {
            label: "Profile",
            icon: "i-lucide-user-pen",
            onSelect: async () => {
              router.push({ name: "settings" });
            },
          },
          {
            label: "logout",
            icon: "i-lucide-log-out",
            onSelect: async () => {
              confirm("are you sure you want to log out?");

              if (confirm()) {
                await userLogout();
                router.push({ name: "login" });
              }
            },
          },
        ],
      },
    ],
  ];
  return auth ? items2 : items;
});

const isOpen = ref(false);

// const not = computed(()=>{
//     return inject<alerts[]>('notif')
// })

const not = inject<alerts[]>("notif");

const markAsRead = async (id: number) => {
  try {
    await useAxios.patch(`/auth/alerts/${id}`, {});
  } catch (error) {
    console.log(error);
  }
};

const markAsReadAll = async () => {
  try {
    await useAxios.patch(`/auth/alerts`, {});
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <UNavigationMenu
    arrow
    orientation="horizontal"
    variant="link"
    content-orientation="vertical"
    color="error"
    :items="computedItems"
    class="ms-auto sm:flex hidden z-50"
  >
    <template #components-label>
      <UIcon
        class="size-5"
        :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
        :class="isDark ? 'text-orange-300' : 'text-purple-600'"
      />
    </template>
  </UNavigationMenu>

  <UPopover v-if="auth" arrow mode="hover">
    <UButton icon="i-lucide-bell" label="" color="neutral" variant="link" />

    <template #content>
      <div class="p-4 z-[99999]">
        <div class="flex justify-between items-center">
          <h1 class="font-semibold">Latest alert</h1>
          <UButton
            v-if="not && not.length > 0"
            @click="markAsReadAll"
            variant="link"
            class="underline text-black dark:tex-white self-end hover:cursor-pointer text-sm"
            >Mark as read all</UButton
          >
        </div>
        <ul
          v-if="not && not.length > 0"
          class="mt-3 h-1/5 overflow-y-auto flex flex-col gap-2"
        >
          <li v-for="(item, i) in not" :key="i">
            <div
              v-if="!item?.isRead"
              class="flex flex-col gap-1 rounded-md p-2 w-[90%] shadow-md"
            >
              <UButton
                @click="markAsRead(item.id)"
                variant="link"
                color="warning"
                class="underline self-end hover:cursor-pointer text-sm"
                >Mark as read</UButton
              >
              <div if class="flex justify-between items-center">
                <h1
                  class="font-semibold text-wrap"
                  :class="
                    item.message.includes('Hypertension') ? 'text-red-500' : ''
                  "
                >
                  {{ item?.message }}
                </h1>
              </div>
              <p v-if="item.timestamp" class="text-light text-sm">
                {{ new Date(item.timestamp).toDateString() }}
              </p>
            </div>
            <div v-else>
              <h1 class="font-semibold text-wrap">No alerts</h1>
            </div>
          </li>
        </ul>
        <div v-else>
          <h1 class="font-semibold text-wrap">No alerts</h1>
        </div>
      </div>
    </template>
  </UPopover>
  <DropdownMenu class="sm:hidden ms-1" />
</template>

