import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field;
        let order = 'none';

        if (action?.name === 'sort') {
            columns.forEach((column) => {
                if (column === action) {
                    column.dataset.value = sortMap[column.dataset.value];
                } else {
                    column.dataset.value = 'none';
                }
            });
        }

        columns.forEach((column) => {
            if (column.dataset.value !== 'none') {
                field = column.dataset.field;
                order = column.dataset.value;
            }
        });

        const sort = (field && order !== 'none') ? `${field}:${order}` : null;

        return sort ? Object.assign({}, query, { sort }) : query;
    };
}