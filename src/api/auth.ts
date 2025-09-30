type LoginUserProps = {
  username: string;
  password: string;
  email: string;
}

export async function loginUser({username, password, email}: LoginUserProps) {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, expiresInMins: 60 }),
    });

    if (!res.ok) {
      throw new Error("Invalid username or password");
    }

    return await res.json();
  } catch (err: any) {
    throw new Error(`Login failed: ${err.message}`);
  }
}
