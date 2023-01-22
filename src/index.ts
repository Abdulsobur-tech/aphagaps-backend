//import * as dotenv from "dotenv"
////dotenv.config()
import app from "./server";
const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log("Hello app listening on http://localhost:5001");
});
