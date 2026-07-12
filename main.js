import { router, builder_0, builder_2 } from "./builder.js";
import { get_me } from "./services/api.js";


const accessConfirmInterface = document.getElementById("access-confirm")
const jwt = localStorage.getItem("token")


get_me(jwt)


