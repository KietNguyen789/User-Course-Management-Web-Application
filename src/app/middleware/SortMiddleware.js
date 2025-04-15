module.exports = function SortMiddleware(req, res, next) {
    // khoi tao gia tri
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };
    // neu task la _sort thi enabled=true va asc/desc
    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled= true;
        // res.locals._sort.column= req.query.column;
        // res.locals._sort.type = req.query.type;
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
};
