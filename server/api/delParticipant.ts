import { exists, get, set } from "../memory.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body || !body.id || !body.name || !body.date) {
        return {
            status: "error",
            message: "invalid_body",
        };
    }

    const id = body.id;
    if (!exists(id)) {
        return {
            status: "error",
            message: "id_not_found",
        };
    }

    const timetable = get(id);
    if (!timetable.configured) {
        return {
            status: "error",
            message: "not_configured",
        };
    }

    const date = body.date;
    const name = body.name;

    const days = timetable.days;
    const dayIndex = days.findIndex((d: any) => d.date === date);

    if (dayIndex === -1) {
        return {
            status: "error",
            message: "date_not_found",
        };
    }

    const participants = days[dayIndex].participants;
    participants.splice(participants.indexOf(name), 1);

    set(id, timetable);

    return {
        status: "success",
    };
});
