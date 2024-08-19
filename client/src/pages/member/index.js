import { lazyLoading as $ } from "utils";

export const EmailLogin = $(() => import("./EmailLogin"));
export const MemberDetail = $(() => import("./MemberDetail"));
export const MemberUpdate = $(() => import("./UpdateForm"));
export const OAuth2LoginPopup = $(() => import("./OAuth2LoginPopup"));
