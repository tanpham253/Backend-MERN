import User, { IUsers } from "../models/users.model";
import createError from "http-errors";
import bcrypt from 'bcrypt'
import { generateToken } from "../helper/token.helper";

const verifyUserByCredentials = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    //b1. Tìm kiếm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(400, "Email or password is invalid");
    }
    //b2. So sánh password
    const passwordHash = user.password;
    if (!passwordHash) {
        //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
        throw createError(400, "Invalid email or password")
    }
    const isValid = await bcrypt.compare(password, passwordHash); // true
    if(!isValid){
        //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
        throw createError(400, "Invalid email or password")
    }
    //b3. Nếu thành công, trả về tokens
    console.log('<<=== 🚀 user ===>>',user);
    const tokens = generateToken({
        id: user._id,
        email: user.email,
        roles: user.roles,
    })
    return tokens;
}


const refreshToken = async (user: IUsers) => {
    const tokens = generateToken({
        id: user._id,
        email: user.email,
        roles: user.roles,
    });
    return tokens;
}

const getProfile =  async(user: IUsers)=>{
    return user
}

export default {
    verifyUserByCredentials,
    refreshToken,
    getProfile
}