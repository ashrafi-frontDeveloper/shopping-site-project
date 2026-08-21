import api from "./api";

export const getAllUsers = async () => {
  const { data } = await api.get("/users");

  return data;
};

export const banUser = async (id) => {
  const { data } = await api.post(`/users/ban/${id}`);

  return data;
};
