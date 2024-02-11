export const whitelist = {
  admin: new Set([
    process.env.NEXT_PUBLIC_MAURO_MAIL,
    process.env.NEXT_PUBLIC_MAURO_MAIL_2,
    process.env.NEXT_PUBLIC_ADMIN_MAIL,
  ]),
};
