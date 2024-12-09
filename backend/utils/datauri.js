import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file ) {
        throw new Error("Invalid file object. Ensure 'originalname' and 'buffer' are present.");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    return parser.format(extName, file.buffer); // Convert to Data URI
};

export default getDataUri;
