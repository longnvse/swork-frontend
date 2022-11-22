import {SuperAdminSider} from "./super-admin";
import {AdminSider} from "./admin";
import {UserSider} from "./user";

export const SiderByPermission = {
    superAdmin: SuperAdminSider,
    admin: AdminSider,
    user: UserSider
}
