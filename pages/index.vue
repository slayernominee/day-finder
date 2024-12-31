<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const router = useRouter();
const route = useRoute();

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

if (route.query.error) {
    var title = "Error";
    var description = "There was a problem with your request.";

    switch (route.query.error) {
        case "id_not_found":
            title = "ID Not Found Error!";
            description = "The calendar ID provided in your requests doesn't seem to exist in the storage.";
            break;

        default:
            break;
    }

    toast({
        title: title,
        description: description,
        variant: "destructive",
    });

    useRouter().push({ query: {} });
}
</script>

<template>
    <div class="text-center m-auto h-[100vh] flex items-center justify-center">
        <Button @click="createNewTimeTable"> <Calendar class="w-4 h-4 mr-2" /> Create new Timetable </Button>
    </div>
</template>
