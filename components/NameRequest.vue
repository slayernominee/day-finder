<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const name = ref("");

defineProps({
    open: Boolean,
});
</script>

<template>
    <Dialog :open="open">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Name</DialogTitle>
                <DialogDescription>
                    Set your name here for the calendar. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right"> Name </Label>
                    <Input id="username" v-model="name" placeholder="Your Name" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" @click="$emit('setName', name)"> Save </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
