class ErrorHelper {
    public getMSG(error: any): string {
        if (error.response === undefined) {
        } else {
            if (error.response.data["errorDetail"] === undefined) {
                return error.response.data;
            } else {
                return error.response.data["errorDetail"];
            }
        }
    }

}

const errorHelper = new ErrorHelper();

export default errorHelper;




