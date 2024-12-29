<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-vue-next";

const router = useRouter();

const createNewTimeTable = async () => {
    const { data }: any = await useFetch("/api/createNewTimetable", {
        method: "POST",
    });
    const status = data.value.status;

    if (status !== "success") {
        alert("Failed to create new timetable");
        return;
    }
    const calId = data.value.id;

    // redirect to new timetable page
    router.push(`/${calId}`);
};
</script>

<template>
    <div class="text-center m-auto h-[100vh] flex items-center justify-center">
        <Button @click="createNewTimeTable"> <Calendar class="w-4 h-4 mr-2" /> Create new Timetable </Button>
    </div>
</template>
