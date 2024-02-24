import sp from "../environment/configSPConnection";

export const getCurrentDetails = async () => {
  let isAdmin = false;
  let userProps = {};
  let userSPGroups = [];

  const currentUserGroups = await sp.web.currentUser
    .select("groups/Title")
    .expand("groups")();
  currentUserGroups.Groups.forEach((element) => {
    if (element.Title === "Administrator") {
      isAdmin = true;
    }
    userSPGroups.push(element.Title);
  });

  await sp.profiles.myProperties().then((user) => {
    const newName = user.DisplayName.replace(/ *\([^)]*\) */g, ""); //remove parenthesis'
    userProps = {
      Name: user.DisplayName,
      NewName: newName,
      EMail: user.Email,
      AccountName: user.AccountName,
      Office:
        user.UserProfileProperties.filter((obj) => obj.Key === "Department")[0]
          .Value || "N/A",
      Position: user.Title || "N/A",
      isAdmin: isAdmin,
    };
  });
  return { userProps };
};
