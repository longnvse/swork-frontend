import SuperAdminRouter from "./super-admin";
import AdminRouter from "./admin";
import UserRouter from "./user";

export const RouteByPermission = {
    superAdmin: SuperAdminRouter,
    admin: AdminRouter,
    user: UserRouter
}
