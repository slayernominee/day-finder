<script setup lang="ts">
const route = useRoute();
const id = ref(route.params.id);

// request from the database if the id is already configured
const configured = ref(true); // TODO: sample value

const range = ref({
    start: { calendar: { identifier: "gregory" }, era: "AD", year: 2024, month: 12, day: 29 },
    end: { calendar: { identifier: "gregory" }, era: "AD", year: 2025, month: 1, day: 7 },
}); // TODO: sample value, should be fetched from the database

const start_date = new Date(range.value.start.year, range.value.start.month - 1, range.value.start.day);
const end_date = new Date(range.value.end.year, range.value.end.month - 1, range.value.end.day);

const name = ref("Marcel"); // TODO: if no name is in the cookies, request the name on a switchInOutRequest

const days = ref([]);
for (let i = new Date(start_date); i <= end_date; i.setDate(i.getDate() + 1)) {
    const participants = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace"]; // TODO: sample value, take the value from the database

    days.value.push({
        date: new Date(i),
        participants: participants, // TODO: sample value, take the value from the database,
        isIn: participants.includes(name.value),
    });
}

const switchInOut = (day: any) => {
    days.value = days.value.map((d) => {
        if (d.date.getTime() === day.getTime()) {
            // check if the name is in the participants
            if (d.participants.includes(name.value)) {
                // remove the name
                d.participants = d.participants.filter((p) => p !== name.value);
                d.isIn = false;
            } else {
                // add the name
                d.participants.push(name.value);
                d.isIn = true;
            }
        }
        return d;
    });
};
</script>

<template>
    <div class="flex justify-center mt-16">
        <div v-if="!configured" class="mt-16">
            <Setup />
        </div>

        <div v-if="configured">
            <div class="grid grid-cols-7 gap-2">
                <div
                    v-for="weekday in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                    :key="weekday"
                    class="text-center mb-6"
                >
                    <span>{{ weekday }}</span>
                </div>

                <!-- monday align the days -->
                <div v-for="i in Array((start_date.getDay() + 6) % 7).keys()"></div>

                <Day
                    v-for="d in days"
                    :day="d.date"
                    :participants="d.participants"
                    :isIn="d.isIn"
                    @switchInOut="switchInOut"
                />
            </div>
        </div>
    </div>
</template>
