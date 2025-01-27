import { DocumentId } from "./types/common/base_type";

const BASE_URL = '/dashboard';

//When you will need to change route from subscribers to contacts cause that's what wants client this one config will help
export const RouteConfig = {
  home: `${BASE_URL}`,

  auth: {
    login: '/login',
    unauthorized: '/unauthorized',
  },

  policy: '/policy',
  terms: '/terms',



};
