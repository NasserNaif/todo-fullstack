import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
  errorFormat: "pretty",
});

const connectDB = () => {
  try {
    prisma.$connect();
    console.log("database connnected !");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDB, prisma };
