<script setup lang="ts">
const route = useRoute();
const id = ref(route.params.id);

// fetch data
const { data }: any = await useFetch("/api/getTimetable", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: { id: id.value },
});

// status errror handling
if (data.value.status == "error") {
    alert("Error: " + data.value.status);
    useRouter().push("/");
}

const days = ref(
    data.value.days.map((d) => {
        d.date = new Date(d.date);
        d.participants = d.participants;
        return d;
    }),
);

const configured = ref(data.value.configured);

const deploy = async (project_name: string, range: {}) => {
    const { data: resp } = await useFetch("/api/configureTimetable", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { id: id.value, project_name: project_name, range: range },
    });

    if (resp.value.status != "success") {
        alert("Error: " + resp.value.status);
        return;
    }

    configured.value = resp.value.configured;

    // update the days
    days.value = resp.value.days.map((d) => {
        d.date = new Date(d.date);
        d.participants = d.participants;
        return d;
    });
};

const showNameRequest = ref(false);

const name = useCookie("name", {
    default: () => {
        return null;
    },
});

const setName = (username: string) => {
    name.value = username;
    showNameRequest.value = false;
};

const switchInOut = async (day: any) => {
    if (!name.value) {
        showNameRequest.value = true;
        return;
    }

    let add = true;

    days.value = days.value.map((d) => {
        if (d.date.getTime() === day.getTime()) {
            // check if the name is in the participants
            if (d.participants.includes(name.value)) {
                // remove the name
                d.participants = d.participants.filter((p) => p !== name.value);
                d.isIn = false;
                add = false;
            } else {
                // add the name
                d.participants.push(name.value);
                d.isIn = true;
                add = true;
            }
        }
        return d;
    });

    // api request
    if (add) {
        await useFetch("/api/addParticipant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: { id: id.value, date: day.toISOString().split("T")[0], name: name.value },
        });
    } else {
        await useFetch("/api/delParticipant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: { id: id.value, date: day.toISOString().split("T")[0], name: name.value },
        });
    }
};
</script>

<template>
    <div class="flex justify-center mt-16">
        <div v-if="!configured" class="mt-16">
            <Setup @deploy="deploy" />
        </div>

        <NameRequest :open="showNameRequest" @setName="setName" />

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
                <div v-for="i in Array((days[0].date.getDay() + 6) % 7).keys()"></div>

                <Day
                    v-for="d in days"
                    :day="d.date"
                    :participants="d.participants"
                    :isIn="d.participants.includes(name)"
                    @switchInOut="switchInOut"
                />
            </div>
        </div>
    </div>
</template>
