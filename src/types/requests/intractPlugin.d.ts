type StorePluginRequest = {
    form: FormData;
};

interface UpdatePluginRequest {
    pluginId: string;
    active: boolean;
}

type DeletePluginRequest = {
    pluginId: string;
};
