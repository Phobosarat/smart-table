import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {

    // #2.3 — подготовить шаблон кнопки
    const template = pages.firstElementChild.cloneNode(true);
    pages.replaceChildren();

    return (data, state, action) => {

        // #2.1 — вычисляем страницы
        const rowsPerPage = state.rowsPerPage || 10;
        const total = data.length;
        const totalPages = Math.ceil(total / rowsPerPage) || 1;
        let page = state.page || 1;

        // #2.6 — обработка клика по странице
          if (action?.name === 'page') {
            page = parseInt(action.value);
        }

        if (action?.name === 'next') {
            page += 1;
        }

        if (action?.name === 'prev') {
            page -= 1;
        }

        if (action?.name === 'first') {
            page = 1;
        }

        if (action?.name === 'last') {
            page = totalPages;
        }

        if (page < 1) {
            page = 1;
        }

        if (page > totalPages) {
            page = totalPages;
        }

        // #2.4 — получаем список страниц
        const visiblePages = getPages(page, totalPages, 10);

        pages.replaceChildren(
            ...visiblePages.map((pageNumber) =>
                createPage(template.cloneNode(true), pageNumber, pageNumber === page)
            )
        );

        // #2.5 — обновляем статус
        const skipped = (page - 1) * rowsPerPage;

        totalRows.textContent = total;
        fromRow.textContent = total ? skipped + 1 : 0;
        toRow.textContent = Math.min(skipped + rowsPerPage, total);

        // #2.2 — возвращаем нужный кусок данных
        return data.slice(skipped, skipped + rowsPerPage);
    }
}