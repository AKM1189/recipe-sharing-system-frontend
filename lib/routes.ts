export const routes = {
  auth: {
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
  },
  public: {
    home: "/",
    recipes: "/recipes",
    categories: "/categories",
  },
  private: {
    addRecipe: "/recipes/add",
    updateRecipe: "/recipes/update",
  },
};
