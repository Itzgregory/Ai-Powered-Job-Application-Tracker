
export function debugAuthState() {
    console.log("------ AUTH DEBUG ------");
    try {
      const userId = localStorage.getItem("userId");
      const user = localStorage.getItem("user");
      const userRole = localStorage.getItem("userRole");
      const activeUser = localStorage.getItem("activeUser");
      const users = localStorage.getItem("users");
      
      console.table({
        userId,
        hasUser: !!user,
        userRole,
        activeUser,
        hasUsers: !!users
      });
      
      if (users) {
        console.log("Users object:", JSON.parse(users));
      }
      
      if (user) {
        console.log("User object:", JSON.parse(user));
      }
      
      return !!userId && !!user;
    } catch (error) {
      console.error("Debug error:", error);
      return false;
    }
}





