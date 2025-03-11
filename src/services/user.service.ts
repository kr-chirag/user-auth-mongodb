import User, { IUser } from "../models/user.model";

export async function createUser(
    name: string,
    email: string,
    pass: string
): Promise<Partial<IUser>> {
    const result = await User.create({ name, email, password: pass });
    return {
        name: result.name,
        email: result.email,
        password: result.password,
    };
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ email });
}

export async function getUserByID(userId: string) {
    return await User.findById(userId).select("-pass");
}

export async function getAllUsers() {
    return await User.find({}).select("-pass");
}

export async function updateUser(userId: string, updates: Partial<IUser>) {
    return await User.findOneAndUpdate({ _id: userId }, updates, {
        new: true,
    }).select("-password");
}

export async function deleteUser(userId: string) {
    await User.deleteOne({ _id: userId });
}
