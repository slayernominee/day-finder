<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const props = defineProps({
    day: {
        type: Object,
        required: true,
    },
    participants: {
        type: Array,
        required: false,
        default: () => [],
    },
    isIn: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dd = props.day.getDate();
const mm = props.day.getMonth() + 1;
const yyyy = props.day.getFullYear();
const yy = yyyy.toString().slice(-2);
</script>

<template>
    <Card
        class="cursor-pointer hover:bg-opacity-90 hover:bg-slate-800"
        :class="{ 'bg-green-500 hover:bg-green-600': isIn }"
        @click="$emit('switchInOut', day)"
    >
        <CardHeader>
            <CardTitle class="text-center flex sm:relative">
                <span class="lg:hidden mr-2">{{ weekDays[day.getDay()].slice(0, 3) }}, </span>
                <span class="flex">
                    {{ dd }}.{{ mm }}.
                    <span class="hidden xl:block">{{ yyyy }}</span>
                    <span class="xl:hidden">{{ yy }}</span></span
                >
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Badge class="mx-2 my-1" v-for="p in participants">{{ p }}</Badge>
        </CardContent>
    </Card>
</template>
