import { config } from "./environment";
import { spfi, SPBrowser} from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";
import "@pnp/sp/sputilities";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/web";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/items/get-all";
import "@pnp/sp/items";
import "@pnp/sp/taxonomy";
import "@pnp/sp/attachments"

const sp = spfi(config.url).using(SPBrowser())

export default sp;
