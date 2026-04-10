import path from "path";
import fs from "fs";
import transporter from "../config/nodemailer.config";
import Handlebars from "handlebars";

export const mailService = {
  sendMail: async (
    handleBarsData: any,
    email: string,
    fileName: string,
    subject: string,
  ) => {
    const templateDir = path.resolve(__dirname, "../templates");
    const templatePath = path.join(templateDir, fileName);
    const templateSource = fs.readFileSync(templatePath, "utf-8");

    const compiledTemplate = Handlebars.compile(templateSource);

    const template = compiledTemplate(handleBarsData);

    await transporter.sendMail({
      to: email,
      subject: subject,
      html: template,
    });
  },
};
