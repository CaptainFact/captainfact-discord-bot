import fs from "fs";
import compile from "string-template/compile";

const compileTemplate = (subPath: string) => {
  const fileContent = fs.readFileSync(`src/messages/${subPath}`, {
    encoding: "UTF8",
  });
  return compile(fileContent);
};

interface IMsgTemplateType {
  [s: string]: StringTemplate.Template;
}

const MsgTemplate: IMsgTemplateType = {
  help: compileTemplate("help.md"),
  info_channels: compileTemplate("info/channels.md"),
  info_groups: compileTemplate("info/groups.md"),
  info_opensource: compileTemplate("info/opensource.md"),
  welcome: compileTemplate("welcome.md"),
};

export default MsgTemplate;
