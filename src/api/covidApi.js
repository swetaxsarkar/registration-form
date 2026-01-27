import axiosInstance from "./axiosInstance";

export const getCovidHistory = async () => {
  try {
    const response = await axiosInstance.get(
      "/covid-19/historical/all?lastdays=10"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching covid history", error);
    throw error;
  }
};
