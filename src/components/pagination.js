import { getPages } from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => {
    let pageCount;

    // #2.3 — подготовить шаблон кнопки
    const template = pages.firstElementChild.cloneNode(true);
    pages.replaceChildren();

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // #2.6 — обработка клика по странице
        if (action?.name === 'page') {
            page = parseInt(action.value);
        } else if (action?.name === 'next') {
            page += 1;
        } else if (action?.name === 'prev') {
            page -= 1;
        } else if (action?.name === 'first') {
            page = 1;
        } else if (action?.name === 'last') {
            page = pageCount;
        }

        if (page < 1) {
            page = 1;
        }

        if (page > pageCount) {
            page = pageCount;
        }

        return Object.assign({}, query, {
            limit,
            page
        });
    };

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        // #2.4 — получаем список страниц
        const visiblePages = getPages(page, pageCount, 10);

        pages.replaceChildren(
            ...visiblePages.map((pageNumber) =>
                createPage(template.cloneNode(true), pageNumber, pageNumber === page)
            )
        );

        // #2.5 — обновляем статус
        const skipped = (page - 1) * limit;

        totalRows.textContent = total;
        fromRow.textContent = total ? skipped + 1 : 0;
        toRow.textContent = Math.min(skipped + limit, total);
    };

    return {
        updatePagination,
        applyPagination
    };
};