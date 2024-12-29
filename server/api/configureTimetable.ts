import { exists, get, set } from "../memory.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // check if body is empty or if body.id is empty
    if (!body || !body.id || !body.range || !body.range.start || !body.range.end || !body.project_name) {
        return {
            status: "error",
        };
    }

    const id = body.id;
    if (!exists) {
        return {
            status: "error",
        };
    }

    const timetable = get(id);

    // is already configured
    if (timetable.configured) {
        return {
            status: "error",
        };
    }

    const start_date = Date.UTC(body.range.start.year, body.range.start.month, body.range.start.day);
    const end_date = Date.UTC(body.range.end.year, body.range.end.month, body.range.end.day);

    // generate a day list from the start and end date
    const days = [];
    for (var i = new Date(start_date); i <= new Date(end_date); i.setDate(i.getDate() + 1)) {
        // add the day to the list
        days.push({
            date: i.toISOString().split("T")[0],
            participants: [],
        });
    }

    set(id, {
        id: id,
        configured: true,
        project_name: body.project_name,
        days: days,
    });

    return {
        status: "success",
        configured: true,
        project_name: body.project_name,
        id: body.id,
        days: days,
    };
});
