import { AuthAdminRequest } from "../routes/auth/auth.types";

export const AuthAdmin = async (authData: AuthAdminRequest): Promise<{ token: string }> => {
    
    const adminToken = process.env.ADMIN_TOKEN;
    const adminName = process.env.MONGO_USER;
    const adminPassword = process.env.MONGO_PWD;

    if (!adminToken) {
        throw new Error('Admin token is not set in environment variables');
    }
    if (!adminName) {
        throw new Error('Admin name is not set in environment variables');
    }
    if (!adminPassword) {
        throw new Error('Admin password is not set in environment variables');
    }

    if (authData.name === adminName && authData.password === adminPassword) {
        return { token: adminToken };
    } else {
        throw new Error('Invalid credentials');
    }
};
