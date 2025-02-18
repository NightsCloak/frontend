interface AppState {
    drawer: boolean;
    idle: boolean;
    maintenance: boolean;
    maintenanceCheck: string | null;
    currentGameId: string;
    socket: string;
    socketId: string | null;
    prevPage: IntractLocation;
}
