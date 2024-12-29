import { exists, get, set } from "../memory.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body || !body.id || !body.name || !body.date) {
        return {
            status: "error",
        };
    }

    const id = body.id;
    if (!exists(id)) {
        return {
            status: "error",
        };
    }

    const timetable = get(id);
    if (!timetable.configured) {
        return {
            status: "error",
        };
    }

    const date = body.date;
    const name = body.name;

    const days = timetable.days;
    const dayIndex = days.findIndex((d: any) => d.date === date);

    if (dayIndex === -1) {
        return {
            status: "error",
        };
    }

    const participants = days[dayIndex].participants;
    participants.push(name);

    set(id, timetable);

    return {
        status: "success",
    };
});
