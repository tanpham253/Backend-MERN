import  jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../helper/env.helper';

export interface decodedJWT extends JwtPayload {
  id: string;
  email: string;
  roles: string[];
  iat?: number; // day, month
}

//Định nghĩa một hàm để tạo token
export  function  generateToken(user: any) {

  // Tạo payload chứa thông tin của người dùng
  const payload = {
    id: user.id,
    email: user.email,
    // roles: user.roles
  };

  
  // Tạo token với payload và bí mật
  //jwt.sign(payload, secretOrPrivateKey, options, [callback])

  const accessToken = jwt.sign(
        payload,
        env.JWT_SECRET,
        {
           expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN || '7d', //Xác định thời gian hết hạn của token
        } as jwt.SignOptions
    );

  const refreshToken = jwt.sign(
        payload,
        env.JWT_SECRET,
        {
           expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d', //Xác định thời gian hết hạn của token
        } as jwt.SignOptions
    );
  return {
    accessToken,
    refreshToken,
  };
}


export function verifyToken(token: string) {
  // Thay thế 'your_secret_key' bằng cùng một chuỗi bí mật đã sử dụng để tạo token
    const secretOrPrivateKey = process.env.JWT_SECRET || 'your_secret_key';
    console.log("<<=== 🚀 token ===>>", token);
    const decoded = jwt.verify(token, secretOrPrivateKey);
    console.log("<<=== 🚀 decoded ===>>", decoded);
    return decoded;
}