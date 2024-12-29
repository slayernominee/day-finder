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
</script>

<template>
    <Card
        class="cursor-pointer hover:bg-opacity-90 hover:bg-slate-800"
        :class="{ 'bg-green-500 hover:bg-green-600': isIn }"
        @click="$emit('switchInOut', day)"
    >
        <CardHeader>
            <CardTitle class="text-center">{{ day.toLocaleDateString("de-DE") }}</CardTitle>
        </CardHeader>
        <CardContent>
            <Badge class="mx-2 my-1" v-for="p in participants">{{ p }}</Badge>
        </CardContent>
    </Card>
</template>
