import { get, exists } from "../memory";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // check if body is empty or if body.id is empty
    if (!body || !body.id) {
        return {
            status: "error",
        };
    }

    const id = body.id;

    // check if the id exists
    if (!exists(id)) {
        return {
            status: "error",
        };
    }

    const timetable = get(id);

    return {
        status: "ok",
        configured: timetable.configured,
        id: timetable.id,
        days: timetable.days,
    };
});
