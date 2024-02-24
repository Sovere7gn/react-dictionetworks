export const site = "NetworksDictionary";

export const prod = {
   url: `https://meralco.sharepoint.com/sites/${site}`,
   meralcoUrl: 'https://meralco.sharepoint.com',
   serverRelativeURL: `/sites/${site}/`
};

const dev = {
  url: `http://localhost:4323/sites/${site}`,
  meralcoUrl: 'https://meralco.sharepoint.com',
  serverRelativeURL: `/sites/${site}/`
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;