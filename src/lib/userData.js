import { authClient } from "@/lib/auth-client"; // import the auth client
export const { data: session, error } = await authClient.getSession();
