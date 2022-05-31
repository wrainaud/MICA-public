import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_Q6Pf7YVy5",
    ClientId: "397hhagbasmba4ta17gsbsbrkq"
}

export default new CognitoUserPool(poolData);