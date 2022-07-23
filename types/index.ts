export type ISong = {
  name: string;
  duration: number;
  url: string;
};
export type IPlaylist = {
  name: string;
  songs: ISong[];
};
// {
//     name: 'Glitch',
//     songs: [
//       {
//         name: 'Fermi Paradox',
//         duration: 235,

//         url: 'https://dl.dropboxusercontent.com/s/7xmpwvvek6szx5n/fermi-paradox.mp3?dl=0',
//       },
//     ],
//   },
