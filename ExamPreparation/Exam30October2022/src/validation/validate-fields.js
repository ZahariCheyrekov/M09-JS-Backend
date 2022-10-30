exports.validateFields = async (data) => {
    return Object.values(data).every(field => field !== '');
}