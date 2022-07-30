import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req, res) => {
  const songs = await prisma.song.findMany({
    where: {
      name: req.params.query,
    },
    orderBy: {
      name: "asc",
    },
  });
  res.json(songs);
});
