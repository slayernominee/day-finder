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

const days = ref([]);
for (let i = start_date; i <= end_date; i.setDate(i.getDate() + 1)) {
    // duplicate i
    days.value.push({
        date: new Date(i),
        participants: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace"], // TODO: sample value, take the value from the database
    });
}

const name = ref("");
</script>

<template>
    <div class="flex justify-center mt-32">
        <div v-if="!configured">
            <Setup />
        </div>

        <div v-if="configured">
            <div class="grid grid-cols-4 gap-2">
                <Day v-for="d in days" :day="d.date" :participants="d.participants" />
            </div>
        </div>
    </div>
</template>
