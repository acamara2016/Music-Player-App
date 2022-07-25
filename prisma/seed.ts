import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();
const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          avatar: "https://bit.ly/sage-adebayo",
          firstName: "First Name",
          lastName: "Last Name",
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              thumbnail: song.thumbnail,
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      firstName: "Adama",
      lastName: "Camara",
      avatar: "https://bit.ly/sage-adebayo",
      password: bcrypt.hashSync("password", salt),
    },
  });
  const songs = await prisma.song.findMany();
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i}`,
          thumbnail: `https://picsum.photos/400?random=${i}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
  return {
    user,
    songs,
  };
};

run()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
