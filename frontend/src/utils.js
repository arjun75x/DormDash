export const getToken = (developer = true) => {
  if (developer) {
    return `Basic ${btoa("DeveloperOnly:ajhsu2")}`;
  }

  throw Error("Unimplemented");
};
