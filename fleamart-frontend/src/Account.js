// This File interacts with Amazon Cognito. It is responsible for user registration, authentication & other similar features.
import React, { createContext } from 'react';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

const AccountContext = createContext();

const cognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
  });

const Pool = cognitoUserPool();

const Account = (props) => {
  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          console.error(err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log(data);
          resolve(data);
        },
      });
    });
  };

  const sendVerificationCode = (email) => {
    const getUser = () => {
      return new CognitoUser({
        Username: email.toLowerCase(),
        Pool,
      });
    };

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log(data);
      },
      onFailure: (err) => {
        console.error(err);
      },
      inputVerificationCode: (data) => {
        console.log(data);
      },
    });
  };

  const resetPassword = (email, code, password) => {
    const getUser = () => {
      return new CognitoUser({
        Username: email.toLowerCase(),
        Pool,
      });
    };

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log(data);
      },
      onFailure: (err) => {
        console.error(err);
      },
    });
  };

  const fetchSession = () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (error, session) => {
          if (error) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });
            resolve({
              user,
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject();
      }
    });
  };

  const updateProfile = (
    firstName,
    lastName,
    gender,
    dateOfBirth,
    city,
    country
  ) => {
    fetchSession().then(({ user }) => {
      const attributeFirstName = new CognitoUserAttribute({
        Name: 'custom:firstname',
        Value: firstName,
      });

      const attributeLastName = new CognitoUserAttribute({
        Name: 'custom:lastname',
        Value: lastName,
      });

      const attributeGender = new CognitoUserAttribute({
        Name: 'gender',
        Value: gender,
      });

      const attributeDOB = new CognitoUserAttribute({
        Name: 'birthdate',
        Value: dateOfBirth.toISOString().split('T')[0],
      });

      const attributeCity = new CognitoUserAttribute({
        Name: 'custom:city',
        Value: city,
      });

      const attributeCountry = new CognitoUserAttribute({
        Name: 'custom:country',
        Value: country,
      });

      user.updateAttributes(
        [
          attributeFirstName,
          attributeLastName,
          attributeGender,
          attributeDOB,
          attributeCity,
          attributeCountry,
        ],
        (err, result) => {
          if (err) console.error(err);
          console.log(result);
        }
      );
    });
  };

  const updatePassword = (password, newPassword) => {
    fetchSession().then(({ user }) => {
      user.changePassword(password, newPassword, (err, result) => {
        if (err) console.error(err);
        console.log(result);
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  const signup = async (
    email,
    password,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    city,
    country
  ) => {
    return await new Promise((resolve, reject) => {
      const attributeEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: email.toLowerCase(),
      });

      const attributeFirstName = new CognitoUserAttribute({
        Name: 'custom:firstname',
        Value: firstName,
      });

      const attributeLastName = new CognitoUserAttribute({
        Name: 'custom:lastname',
        Value: lastName,
      });

      const attributeGender = new CognitoUserAttribute({
        Name: 'gender',
        Value: gender,
      });

      const attributeDOB = new CognitoUserAttribute({
        Name: 'birthdate',
        Value: dateOfBirth.toISOString().split('T')[0],
      });

      const attributeCity = new CognitoUserAttribute({
        Name: 'custom:city',
        Value: city,
      });

      const attributeCountry = new CognitoUserAttribute({
        Name: 'custom:country',
        Value: country,
      });

      Pool.signUp(
        email,
        password,
        [
          attributeEmail,
          attributeFirstName,
          attributeLastName,
          attributeGender,
          attributeDOB,
          attributeCity,
          attributeCountry,
        ],
        null,
        (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        fetchSession,
        logout,
        signup,
        sendVerificationCode,
        resetPassword,
        updateProfile,
        updatePassword,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
export { Account, AccountContext };
