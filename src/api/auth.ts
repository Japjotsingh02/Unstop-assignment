import axios from "axios";

type LoginUserProps = {
  username: string;
  password: string;
  email: string;
}

export async function loginUser({username, password, email}: LoginUserProps) {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
      email,
      expiresInMins: 60
    });
    return await res.data;
  } catch (err: any) {
    throw new Error(`Login failed: ${err.message}`);
  }
}
