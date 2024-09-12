import { http } from "./config";

export const skillService = {
  getAllSkills: () => {
    return http.get("skill");
  },
};
