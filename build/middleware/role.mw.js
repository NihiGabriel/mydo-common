const { getRoleModel } = require('./db.mw');

const findByName = async(model, name) => {

    const role = await model.findOne({ name:name });
    return role;

}

const getRoleName = async(id, model) => {

    const role = await model.findOne({ _id: id });
    return role;
}

exports.getRolesByName = async(roles) => {

    const Role = await getRoleModel();

    const result = roles.map(async (r) => await findByName(Role, r)); 
    const authorized = Promise.all(result); 
    return authorized;
}

exports.getRoleNames = async(roleIDs) => {

    const Role = await getRoleModel();
    const result = roleIDs.map( async (id) => await getRoleName(Role, id));
    const rIds = Promise.all(result);
    return rIds;
}