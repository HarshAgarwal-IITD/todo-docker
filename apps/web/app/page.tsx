import { prisma } from "@repo/db";

const todos =await prisma.todo.findMany();


export default function Home() {
  return (
    <>
    <h1>{JSON.stringify(todos)}</h1>
    </>
  );
}
export const revalidate = 60;
