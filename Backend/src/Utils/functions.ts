import { PrismaClient } from "@prisma/client";
import { SessionX } from "./types";

export const getServerSession = async (cookie: string) => {
  const res = await fetch(`${process.env.ORIGIN_DOMAIN}/api/auth/session`, {
    headers: { cookie: cookie },
  });
  const session: SessionX = await res.json();
  return session;
};

export const createUserName = async (props: {
  username: string;
  id: string;
  prisma: PrismaClient;
}) => {
  const { prisma, id, username } = props;
  try {
    const existingUser = await prisma?.user?.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error("Username is already taken");
    }

    await prisma.user.update({
      where: { id },
      data: {
        username,
      },
    });
    console.log("Create username success");
    return { success: true };
  } catch (err: any) {
    console.log("Create username failed", err.message);
    return {
      success: false,
      error: err.message || "Failed to create the username",
    };
  }
};
