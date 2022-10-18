const Store = require('../models/storeModel');

exports.getStoreService = async () => {
    const stores = Store.find({});
    return stores;
}
exports.createStoreService = async (data) =>{
    const store = await Store.create(data);
    return store;
}
exports.getStoreByIdService = async (storeId) =>{
    const store = await Store.findOne({_id: storeId});
    return store;
}
