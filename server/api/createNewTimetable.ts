import { create } from "../memory";

export default defineEventHandler(async (event) => {
    const uuid = create();

    return {
        status: "success",
        id: uuid,
    };
});
