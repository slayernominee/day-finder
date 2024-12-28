<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
});
</script>

<template>
    <Card class="w-[350px]">
        <CardHeader>
            <CardTitle>{{ day.toLocaleDateString("de-DE") }}</CardTitle>
        </CardHeader>
        <CardContent>
            <Badge class="mx-2 my-1" v-for="p in participants">{{ p }}</Badge>
        </CardContent>
    </Card>
</template>
