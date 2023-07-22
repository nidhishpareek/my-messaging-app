import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  console.log(data);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {data ? (
        <>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
          <p>{data?.user?.email}</p>
          <p>{data?.user?.name}</p>
          <Image
            src={data?.user?.image || ""}
            width={100}
            height={100}
            alt={data?.user?.name || ""}
          />
        </>
      ) : (
        <button
          onClick={() => {
            signIn("google");
          }}
        >
          Sign In
        </button>
      )}
    </>
  );
}
export async function getServerSideProps(context = {}) {
  return {
    props: {},
  };
}
