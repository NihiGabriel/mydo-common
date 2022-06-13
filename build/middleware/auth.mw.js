const jwt = require('jsonwebtoken');
const { getRolesByName, getRoleNames } = require('./role.mw');


exports.protect = (req, secret) => {

    let result, token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];     //get token

    }else if (req.cookies.token){
        token = req.cookies.token;
    }

    if(!token){
        result = null
    }

    if(token){
        const jwtData = jwt.verify(token, secret);
        result = jwtData;
    }

    return result;
    


}
exports.authorize = async (roles, userRoles) => {

    let allRoles, resultFlag = false;

    await getRolesByName(roles).then((resp) => {
        allRoles = [...resp]

    });

    //get authorized role IDs
    const ids = allRoles.map((e) => {   
        return e._id;
    })

    //check if user roles matches authorized roles
    const flag = await checkRole(ids, userRoles);

    if (flag) {
        resultFlag = true
    } else{
        resultFlag = false
    }

    return resultFlag;

}


// brute force

const checkRole = (roleIds, userRoles) => {

    console.log(roleIds, 'role ids');
    console.log(userRoles, 'user ids')

    let flag = false;

    for (let i = 0; i < roleIds.length; i++) {
        for (let j = 0; j < userRoles.length; j++) {
          if (roleIds[i].toString() === userRoles[j].toString()) {
            flag = true;
          }
        }
      }

    return flag;

}