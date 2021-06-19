// protecting and authorizing all our routes (authentication and authorization)

const jwt = require('jsonwebtoken'); // it helps to generate request access token(it encode and decode)
const { getRolesByName, getRoleNames } = require('./role.mw'); //

exports.protect = async(req, secret) => {  //protect the route (it takes the req and secret parameter) NB: wen encoding, u encode with a particular secret but wenever u want to decode u do it with that particular secret, the secret could be anything
    let result, token; // get a result and decode a token (the common service will serve for decoding while the auth service will encode)

    // the token is passed in a req headers wen anybody log in
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]; // get token, split wit a space and return 2 arrays, so we access the index 1
    }else{
        if(req.cookies.token){ // if the token is not sent to d headers, d token is gotten from the cookies
            token = req.cookies.token
        }
    }

    if(!token){ // if it does not contain any value
        result = null;
    }

    if(token){
        const jwtData = jwt.verify(token, secret); // responsible for decoding encoded token. it verifies wen a user is logged in and check for the token. if it has a token and did not pass the verification test it will not log in
        result = jwtData;
    }

    return result // it always return result anytime someone calls the protect function which can be null or the jwtData. the jwtData is what will be process in each of our services

}

exports.authorize = async(roles, userRoles) => { // authorize the roles (we will check the roles passed in with the userRoles and if it matches will allow)  
    let allRoles, resultFlag = false; 

    await getRolesByName(roles).then((resp) => { // a promised is returned in the role.mw that is why we use the .then and .catch. we get d infomation from the .then function

        allRoles = [...resp] //resp contains the data we want to access so we use a spread operator to pass d response in2 anoda array
    });

    // get authorized role ids
    const ids = allRoles.map((e) => { return e._id}); // loop 2ru all d elements in the allRoles array and get d ids

    // check if user roles matches authorized roles
    const flag = await checkRole(ids, userRoles)
        if(flag){
            resultFlag = true;
        }else{
            resultFlag = false;
        }

        return resultFlag;
    }


const checkRole = (roleIDs, userRoles) => { //check d id of roles we are authorizing against d id of the user
    let flag = false;

    for (let i = 0; i < roleIDs.length; i++) {       // called bruth force
        for (let j = 0; j < userRoles.length; j++) {
          if (roleIDs[i].toString() === userRoles[j].toString()) {
            flag = true;
          }
        }
      }

      return flag;
}