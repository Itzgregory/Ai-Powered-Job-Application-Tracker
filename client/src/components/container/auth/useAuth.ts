// "use client";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { isTokenValid, getUserRole } from "@/utils/auth/authutils";

// export const useAuth = (requiredRole?: string) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     if (!isTokenValid()) {
//       router.replace("/login");
//       return;
//     }
//     const checkServerValidation = async () => {
//       try {
//         const res = await fetch(pathname, { method: "HEAD" });
//         const validated = res.headers.get("x-auth-validated") === "true";
        
//         const validRole = !requiredRole || getUserRole() === requiredRole;
        
//         setIsValid(validated && validRole);
//         if (!validated || !validRole) router.refresh();
//       } catch (error) {
//         router.refresh();
//       }
//     };

//     checkServerValidation();
//   }, [router, pathname, requiredRole]);

//   return { isValid };
// };