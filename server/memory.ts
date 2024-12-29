let memoryStore: any = {};

function exists(key: string) {
    return key in memoryStore;
}

function get(key: string) {
    return memoryStore[key];
}

function set(key: string, value: any) {
    memoryStore[key] = value;
}

function del(key: string) {
    delete memoryStore[key];
}

function clear() {
    memoryStore = {};
}

function create() {
    let uuid = crypto.randomUUID();

    while (exists(uuid)) {
        uuid = crypto.randomUUID();
    }

    memoryStore[uuid] = {
        id: uuid,
        configured: false,
        project_name: "Untitled",
        days: [],
    };

    return uuid;
}

export { exists, get, set, del, clear, create };
