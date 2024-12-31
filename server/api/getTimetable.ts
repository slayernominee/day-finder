import { get, exists } from "../memory";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // check if body is empty or if body.id is empty
    if (!body || !body.id) {
        return {
            status: "error",
            message: "invalid_body",
        };
    }

    const id = body.id;

    // check if the id exists
    if (!exists(id)) {
        return {
            status: "error",
            message: "id_not_found",
        };
    }

    const timetable = get(id);

    return {
        status: "ok",
        configured: timetable.configured,
        project_name: timetable.project_name,
        id: timetable.id,
        days: timetable.days,
    };
});
