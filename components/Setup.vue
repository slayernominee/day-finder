<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { DateRange } from "radix-vue";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { getLocalTimeZone, today } from "@internationalized/date";
import { type Ref, ref } from "vue";

const start = today(getLocalTimeZone());
const end = start.add({ days: 7 });
const max_value = start.add({ days: 365 });

const value = ref({
    start,
    end,
}) as Ref<DateRange>;
</script>

<template>
    <Card class="w-[350px]">
        <CardHeader>
            <CardTitle>Configure Timetable</CardTitle>
            <CardDescription
                >Configure your timetable by selecting the possible dates. Please select only up to 28
                days.</CardDescription
            >
        </CardHeader>
        <CardContent>
            <form>
                <div class="grid items-center w-full gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="name">Name</Label>
                        <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="calendar">Timeslot</Label>

                        <RangeCalendar
                            id="calendar"
                            weekdayFormat="narrow"
                            v-model="value"
                            :maxValue="max_value"
                            :minValue="start"
                            class="rounded-md border"
                        />
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
            <Button variant="outline"> Cancel </Button>
            <Button>Deploy</Button>
        </CardFooter>
        {{ value }}
    </Card>
</template>
