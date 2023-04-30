require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export const getCommentedCode = async (code:string) => {
    try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Provide commented code for the following code entered. ${code}`,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          max_tokens:2090,
          temperature:0
        });
        console.log(response);
        return {success:true, message:"Successfully fetched the data", data:response.data.choices};
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
        return {success:false, message:error.response.data.error.message, data:error.response.data};
      }
};