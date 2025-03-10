import User, { IUser } from "../models/user.model";

export async function createUser(
    name: string,
    email: string,
    password: string
): Promise<IUser> {
    const user = new User({ name, email, password });
    await user.save();
    return user;
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ email });
}

export async function getUserByID(userId: string) {
    return await User.findById(userId);
}

export async function getAllUsers() {
    return await User.find({});
}

export async function updateUser(userId: string, updates: Partial<IUser>) {
    await User.updateOne({ _id: userId }, updates);
    return await getUserByID(userId);
}

export async function deleteUser(userId: string) {
    await User.deleteOne({ _id: userId });
}
