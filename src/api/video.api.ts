import client from "./axiosClient";
import type { ApiResponse, Video, FeedPage } from "./types";

const getAllVideos = async (page: number = 1): Promise<FeedPage> => {
  const res = await client.get(`/videos?page=${page}`);
  console.log("videos123654", res.data);
  return {
    videos: res.data.data.videos,
    pagination: res.data.data.pagination,
  };
};

const getVideoById = async (videoId: string): Promise<Video> => {
  const res = await client.get(`/videos/${videoId}`);
  return res.data.data;
};

const publishVideo = async (
  videoFile: FormData
): Promise<ApiResponse<Video>> => {
  const res = await client.post("/videos", videoFile);
  return res.data;
};

export { getAllVideos, getVideoById, publishVideo };
