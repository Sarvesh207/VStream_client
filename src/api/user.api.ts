import client from "./axiosClient";

const loginUser = async (data) => {
  const res = await client.post("/users/login", data);
  return res.data;
};

const registerUser = async (data) => {
  const res = await client.post("/users/register", data);
  return res.data;
};

const getUser = async () => {
  const res = await client.get("/users/current-user");
  return res.data;
};

const logoutUser = async () => {
  const res = await client.post("/users/logout");
  return res.data;
};

const updateUser = async (data) => {
  const res = await client.patch("/users/update-account", data);
  return res.data;
};

const refreshToken = async () => {
  const res = await client.post("/users/refresh-token");
  return res.data;
};

const changePassword = async (data) => {
  const res = await client.put("/users/change-password", data);
  return res.data;
};

const forgotPassword = async (data) => {
  const res = await client.post("/users/forgot-password", data);
  return res.data;
};

const avatarUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await client.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

const coverUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("coverImage", file);

  const res = await client.patch("/users/cover-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

const getHistory = async () => {
  const res = await client.get("/users/history");
  return res.data;
};

const getUserChannelProfile = async (username: string) => {
  const res = await client.get(`/users/c/${username}`);
  return res.data;
};

const getUserChannelData = async (username: string) => {
  const res = await client.get(`/users/c/${username}`);
  return res.data.data;
};

export {
  loginUser,
  registerUser,
  getUser,
  logoutUser,
  updateUser,
  refreshToken,
  changePassword,
  forgotPassword,
  avatarUpload,
  coverUpload,
  getHistory,
  getUserChannelProfile,
  getUserChannelData,
};
