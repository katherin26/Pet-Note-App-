import Amplify, { Auth } from "aws-amplify";

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_AWS_REGION,
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID,
    },
    API: {
      endpoints: [
        {
          name: "PetNote",
          endpoint: process.env.REACT_APP_API_ENDPOINT,
          custom_header: async () => {
            try {
              const session = await Auth.currentSession();
              return {
                Authorization: session.getAccessToken().getJwtToken(),
                Accept: "application/json",
                "Content-Type": "application/json",
              };
            } catch (error) {
              return null;
            }
          },
        },
      ],
    },
  });
}
