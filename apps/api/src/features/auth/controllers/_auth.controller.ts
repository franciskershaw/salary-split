import localLogin from "./local/localLogin.controller";
import localRegister from "./local/localRegister.controller";
import refreshTokens from "./local/refreshTokens.controller";
import logout from "./logout.controller";

export default {
  localRegister,
  localLogin,
  logout,
  refreshTokens,
};
