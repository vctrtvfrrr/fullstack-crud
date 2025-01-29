import Head from "next/head";
import Image from "next/image";
import { PiHeartStraightFill, PiPlayFill } from "react-icons/pi";
import coverPic from "../../public/assets/images/ff-cover.jpeg";
import posterPic from "../../public/assets/images/ff-poster.png";

export default function SongPage() {
  return (
    <div>
      <Head>
        <title>Song</title>
      </Head>

      <div className="relative z-40 flex">
        <Image
          src={coverPic}
          alt="Song Name by Artist Name"
          className="w-48 h-48 border border-neutral-600 rounded-md"
        />
        <div className="flex flex-col justify-between ml-8 py-4">
          <div className="flex">
            <button className="bg-white w-16 h-16 flex justify-center items-center rounded-full">
              <PiPlayFill size={20} color="black" />
            </button>

            <div className="flex flex-col justify-between ml-9">
              <div className="flex justify-between">
                <h2 className="text-3xl font-semibold">Song Name</h2>
                <PiHeartStraightFill size={20} color="red" />
              </div>

              <h3 className="leading-5">
                Artist Name | Album Name | Album Year
              </h3>
            </div>
          </div>

          <div>
            <div>
              <div className="relative h-1 bg-gray-200">
                <div className="absolute h-full w-[62%] bg-lightSeaGreen flex items-center justify-end">
                  <div className="rounded-full w-3 h-3 bg-white shadow"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-neutral-400 font-semibold py-2">
              <div>0:00</div>
              <div>3:20</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 z-30 bg-yankeesBlue w-full h-full">
        <div className="container relative">
          <Image
            src={posterPic}
            alt="Artist Name"
            className="absolute top-28 right-0 opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
