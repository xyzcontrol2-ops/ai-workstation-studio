/** Returns a problem message, or "" when the Owner password is acceptable. Sign-in allows at most 72 characters. */
export function checkOwnerPassword(pw: string, confirm: string): string {
  if (pw.length < 12) return "Password kam se kam 12 characters ka ho.";
  if (pw.length > 72) return "Password 72 characters se lamba nahi ho sakta.";
  if (pw !== confirm) return "Dono password match nahi kar rahe.";
  return "";
}
