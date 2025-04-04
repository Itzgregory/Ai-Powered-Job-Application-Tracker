export type UserSession = {
  token: string;
  role: string;
  expiry: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export const debugAuthFlow = (action: string, data: any = {}) => {
  try {
    const logs = JSON.parse(sessionStorage.getItem('authDebugLogs') || '[]');
    logs.push({
      timestamp: new Date().toISOString(),
      action,
      data: {
        ...data,
        hasToken: !!getAuthToken(),
        tokenValid: isTokenValid(),
        role: getUserRole(),
        hasUser: !!localStorage.getItem('user'),
        hasActiveUser: !!localStorage.getItem('activeUser'),
        hasUserId: !!localStorage.getItem('userId')
      }
    });
    sessionStorage.setItem('authDebugLogs', JSON.stringify(logs));
    console.log(`[AUTH DEBUG] ${action}:`, data);
  } catch (error) {
    console.error('Debug logging error:', error);
  }
};

const getUsers = (): Record<string, UserSession> => {
  try {
    return JSON.parse(localStorage.getItem("users") || "{}");
  } catch (error) {
    console.error("Error parsing users from localStorage:", error);
    return {};
  }
};

const setUsers = (users: Record<string, UserSession>): void => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error setting users in localStorage:", error);
  }
};

export const setAuthToken = (
  id: string,
  token: string,
  role: string,
  firstName: string,
  lastName: string,
  email: string,
  expiresIn: number = 3600000
): void => {
  if (!id || !token) {
    console.error("Cannot set auth token: Missing id or token", { id, hasToken: !!token });
    return;
  }

  const users = getUsers();
  users[id] = {
    token,
    role,
    expiry: Date.now() + expiresIn,
    firstName,
    lastName,
    email,
  };

  setUsers(users);
  localStorage.setItem("activeUser", id);
  localStorage.setItem("userId", id);

  console.log(`Auth token set for user ${id}, expires in ${expiresIn / 1000} seconds`);
  window.dispatchEvent(new Event("storage"));
};

export const getAuthToken = (): string | null => {
  const activeUser = localStorage.getItem("activeUser");
  if (!activeUser) {
    console.log("No active user found when getting auth token");
    return null;
  }
  const users = getUsers();
  return users[activeUser]?.token || null;
};

export const getUserRole = (): string | null => {
  const activeUser = localStorage.getItem("activeUser");
  const users = getUsers();
  return activeUser ? users[activeUser]?.role || null : null;
};

export const getUserDetails = (): UserSession | null => {
  const activeUser = localStorage.getItem("activeUser");
  if (!activeUser) {
    console.log("No active user found when getting user details");
    return null;
  }
  const users = getUsers();
  return users[activeUser] || null;
};

export const logAuthStep = (step: string, data: object = {}) => {
  const logs = JSON.parse(sessionStorage.getItem('authFlowLogs') || '[]');
  logs.push({
    timestamp: Date.now(),
    step,
    data: {
      token: getAuthToken(),
      tokenValid: isTokenValid(),
      activeUser: localStorage.getItem('activeUser'),
      reduxUser: data
    }
  });
  sessionStorage.setItem('authFlowLogs', JSON.stringify(logs));
};

export const acquireAuthLock = () => {
  const lock = crypto.randomUUID();
  sessionStorage.setItem('authLock', lock);
  return lock;
};

export const releaseAuthLock = () => {
  sessionStorage.removeItem('authLock');
};

export const isTokenValid = (): boolean => {
  try {
    const users: Record<string, UserSession> = JSON.parse(localStorage.getItem("users") || "{}");
    const activeUser = localStorage.getItem("activeUser");

    if (!activeUser || !users[activeUser]) {
      console.log("Token validation failed: No active user found or user session doesn't exist");
      return false;
    }

    const { token, expiry } = users[activeUser];
    if (!token) {
      console.log("Token validation failed: No token in user session");
      return false;
    }

    const isValid = typeof expiry === "number" && Date.now() < expiry;
    if (!isValid) {
      console.log(`Token expired or invalid. Expiry: ${new Date(expiry).toLocaleString()}`);
    } else if (Date.now() > expiry - 300000) {
      console.log("Token about to expire, consider refreshing.");
    }
    return isValid;

  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

export const switchUser = (id: string): boolean => {
  const users = getUsers();
  if (users[id]) {
    localStorage.setItem("activeUser", id);
    localStorage.setItem("userId", id);
    window.dispatchEvent(new Event("storage"));
    return true;
  }
  return false;
};

export const clearAuthData = (id: string | null = null): void => {
  console.log("Clearing auth data", id ? `for user ${id}` : "for all users");

  if (id) {
    const users = getUsers();
    delete users[id];
    setUsers(users);

    if (localStorage.getItem("activeUser") === id) {
      const remainingUsers = Object.keys(users);
      if (remainingUsers.length > 0) {
        localStorage.setItem("activeUser", remainingUsers[0]);
        localStorage.setItem("userId", remainingUsers[0]);
      } else {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("userId");
      }
    }
  } else {
    localStorage.removeItem("users");
    localStorage.removeItem("activeUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  }

  console.log("Auth data cleared");
  window.dispatchEvent(new Event("storage"));
};