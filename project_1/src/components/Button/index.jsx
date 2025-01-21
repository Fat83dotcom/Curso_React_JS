export const ButtonLoadMore = (loadMore) => {
    return (
        <button 
        onClick={loadMore.loadMore}
        disabled={loadMore.setDisable}
        className="custom-button"
        >
            Carregar Mais Paginas
        </button>
    )
}