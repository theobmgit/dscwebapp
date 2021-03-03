import AccessControl from "accesscontrol";
const ac = new AccessControl();

export const roles = (function () {
  ac.grant("user")
    .resource("post")
    .readAny()
    .createOwn()
    .updateOwn()
    .deleteOwn();
  ac.grant("admin")
    .resource("post")
    .readAny()
    .deleteAny()
    .resource("user")
    .readAny()
    .updateAny()
    .deleteAny();
  return ac;
})();
