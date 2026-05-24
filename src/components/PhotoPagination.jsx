import { getVisiblePageNumbers } from '../services/dogApi.js'

function PhotoPagination({
  currentPage,
  totalPages,
  totalImages,
  onPageChange,
  disabled = false,
}) {
  if (totalPages <= 1) return null

  const visiblePages = getVisiblePageNumbers(currentPage, totalPages)

  const handlePage = (page) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  return (
    <nav
      className="photo-pagination mt-4"
      aria-label="Paginación de fotos"
    >
      <p className="text-center small patitas-text mb-3 mb-md-2 px-2">
        <span className="d-none d-sm-inline">
          Página {currentPage} de {totalPages} ({totalImages} fotos en total)
        </span>
        <span className="d-sm-none">
          {currentPage} / {totalPages} · {totalImages} fotos
        </span>
      </p>
      <ul className="pagination pagination-sm pagination-md-normal justify-content-center flex-wrap gap-1 mb-0 px-1">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link rounded photo-pagination__nav"
            disabled={disabled || currentPage === 1}
            onClick={() => handlePage(currentPage - 1)}
          >
            <span className="d-none d-sm-inline">Anterior</span>
            <span className="d-sm-none" aria-hidden="true">
              ‹
            </span>
            <span className="visually-hidden d-sm-none">Anterior</span>
          </button>
        </li>

        {visiblePages.flatMap((page, index) => {
          const prev = visiblePages[index - 1]
          const items = []

          if (prev !== undefined && page - prev > 1) {
            items.push(
              <li
                key={`ellipsis-before-${page}`}
                className="page-item disabled"
                aria-hidden="true"
              >
                <span className="page-link border-0 bg-transparent patitas-text">
                  …
                </span>
              </li>,
            )
          }

          items.push(
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <button
                type="button"
                className="page-link rounded"
                aria-current={page === currentPage ? 'page' : undefined}
                disabled={disabled}
                onClick={() => handlePage(page)}
              >
                {page}
              </button>
            </li>,
          )

          return items
        })}

        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <button
            type="button"
            className="page-link rounded photo-pagination__nav"
            disabled={disabled || currentPage === totalPages}
            onClick={() => handlePage(currentPage + 1)}
          >
            <span className="d-none d-sm-inline">Siguiente</span>
            <span className="d-sm-none" aria-hidden="true">
              ›
            </span>
            <span className="visually-hidden d-sm-none">Siguiente</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default PhotoPagination
