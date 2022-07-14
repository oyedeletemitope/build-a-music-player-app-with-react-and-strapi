import axios from "axios";
import { useEffect, useState } from "react";
import Player from "./Player";

const Index = () => {
  const [songs, setsongs] = useState([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  // fetching our api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:1337/api/music-players?populate=*"
        );
        let _musics = response.data;

        _musics.map((music) => {
          let pload = {
            title: music.attributes.title,
            artist: music.attributes.artist,
            img_src:
              "http://localhost:1337" +
              music.attributes.img_src.data[0].attributes.url,
            src:
              "http://localhost:1337" +
              music.attributes.music_src.data[0].attributes.url,
          };
          setsongs((oldSongs) => [...oldSongs, pload]);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // .. calling
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);
  // ..
  return (
    <div className="App">
      {songs.length > 0 && (
        <>
          <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            nextSongIndex={nextSongIndex}
            songs={songs}
          />
        </>
      )}
    </div>
  );
};

export default Index;
