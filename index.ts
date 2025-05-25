import { getAvailableClubs, printAvailableClubs } from "./src/clubs";
import Fastify from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import { getNextDays } from "./src/utils";

const port = 3001;

async function fastifyHandler(req: FastifyRequest, res: FastifyReply) {
  try {
    const day = getNextDays()[0];
    const availableCLubs = await getAvailableClubs(day);
    printAvailableClubs(availableCLubs);

    res.header("Content-Type", "application/json");
    res.status(200);
    res.send({
      availableCLubs,
    });
  } catch (error) {
    console.error(error);
  }
}

const app = Fastify({
  logger: true,
});
app.get("/courts", fastifyHandler);
app.get("/ping", async (req, res) => {
  res.send({ message: "pong" });
});
app.listen({ port });
