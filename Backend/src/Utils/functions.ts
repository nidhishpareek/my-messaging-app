export const getServerSession = async (cookie: string) => {
  const res = await fetch(`${process.env.ORIGIN_DOMAIN}/api/auth/session`, {
    headers: { cookie: cookie },
  });
  const session = await res.json();
  return session;
};
