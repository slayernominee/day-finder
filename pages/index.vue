<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-vue-next";

const router = useRouter();

const createNewTimeTable = () => {
    // TODO: get new calId from database

    // sample calId
    const calId = "i3b19eb1inajfb2u3bri2";

    // redirect to new timetable page
    router.push(`/t/${calId}`);
};
</script>

<template>
    <div class="text-center m-auto h-[100vh] flex items-center justify-center">
        <Button @click="createNewTimeTable"> <Calendar class="w-4 h-4 mr-2" /> Create new Timetable </Button>
    </div>
</template>
