import jwt from "jsonwebtoken";
export const createToken =(user, SECRET_KEY, expiresIn) =>{
    const { id, nombre, email, rolId } = user;
    const payload = {
        id,
        nombre,
        email,
        rolId
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}