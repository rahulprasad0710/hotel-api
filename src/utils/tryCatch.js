// const asyncTryCatchFn = (controller) => async (req, res, next) => {
//     try {
//         await controller(req, res, next);
//     } catch (error) {
//         next(error);
//     }
// };

const asyncTryCatchFn = (fn) =>
    function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };

export default asyncTryCatchFn;
