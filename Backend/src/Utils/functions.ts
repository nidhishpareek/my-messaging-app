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
      return { success: false, error: "Username is already taken" };
    }

    await prisma.user.update({
      where: { id },
      data: {
        username,
      },
    });
    console.log("create username success");
    return { success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: "Failed" };
  }
};
