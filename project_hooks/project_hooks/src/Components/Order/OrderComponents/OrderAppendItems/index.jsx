
import P from 'prop-types';
import { OrderListItems } from '../OrderListItems';
import { SelectCategory } from '../../../CategorySelect';
import { handleSubmitGet, handleSubmitPost } from '../../../../Utils/ApiCalls';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeWarning } from '../../../../features/warning/warningSlice';
import useSWR from 'swr';

// Fetcher para o SWR
const fetcher = async (url) => await handleSubmitGet(url).then((res) => res.data);

export const OrderAppendItems = ({ orderId, handleFetchOrder }) => {
    const [chosenProduct, setChosenProduct] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [productName, setProductName] = useState('');
    const dispatch = useDispatch();

    // Buscar categorias de produtos
    const { data: productCategory } = useSWR(
        'http://127.0.0.1:8000/search_product_category/',
        fetcher
    );

    // Buscar produtos (geral, por categoria ou por nome)
    const { data: products, mutate: mutateProducts } = useSWR(
        categoryId
            ? `http://127.0.0.1:8000/search_product_by_category/?search_category=${categoryId}`
            : productName
            ? `http://127.0.0.1:8000/search_product_by_name/?search_name=${productName}`
            : 'http://127.0.0.1:8000/get_products/',
        fetcher
    );

    // Buscar produtos associados a um pedido
    const { data: orderProducts, mutate: mutateOrderProducts } = useSWR(
        orderId ? `http://127.0.0.1:8000/search_products_by_order/?products_by_order=${orderId}` : null,
        fetcher
    );

    // Atualizar a lista de produtos escolhidos quando `orderProducts` mudar
    useEffect(() => {
        
        {orderProducts && setChosenProduct(orderProducts.data)}

    }, [orderProducts]);

    // Atualizar a lista de produtos quando `triggerItems` for chamado
    // useEffect(() => {
    //     if (triggerItems) {
    //         mutateOrderProducts();
    //     }
    // }, [triggerItems, mutateOrderProducts]);

    // Adicionar produto ao pedido
    const handleAppendProduct = useCallback(
        async (e) => {
            if (orderId !== 0) {
                const row = e.currentTarget;
                const id = row.children[0].innerText;
                const name = row.children[1].innerText;
                const price = row.children[2].innerText;

                const product = {
                    id,
                    orderId: orderId,
                    name,
                    price,
                    quantity: 1,
                };

                const url = 'http://127.0.0.1:8000/append_items/';
                const body = {
                    id_order: orderId,
                    id_product: product.id,
                    quantity: product.quantity,
                };

                const saveProductsOnDB = await handleSubmitPost(url, body);

                if (saveProductsOnDB.response === 200) {
                    mutateProducts(); // Revalida a lista de produtos
                    mutateOrderProducts(); // Revalida a lista de produtos do pedido
                    handleFetchOrder(); // Recarrega os pedidos
                }
            } else {
                dispatch(changeWarning('Crie um pedido.'));
            }
        },
        [orderId, handleFetchOrder, mutateProducts, mutateOrderProducts, dispatch]
    );

    const handleSelectChangeProduct = (e) => {
        setCategoryId(e.target.value);
        console.log(e.target.value);
        
    };

    const handleInputChangeProduct = (e) => {
        setCategoryId('')
        setProductName(e.target.value);
        console.log(productName);
        
    };

    return (
        <>
            <div>
                <h3>Adicione Produtos</h3>
                <div className="container-search-products-order">
                    <div className="search-products-order">
                        <h5>Buscar por Nome:</h5>
                        <input
                            onChange={handleInputChangeProduct}
                            type="text"
                            value={productName}
                            name="product-name"
                            id="product-name"
                        />
                    </div>
                    <div className="search-products-order">
                        <h5>Buscar por Categoria:</h5>
                        <div className="select-category">
                            <SelectCategory
                                handleChangeProduct={handleSelectChangeProduct}
                                productCategory={productCategory?.data || []}
                            />
                        </div>
                    </div>
                </div>
                <div className="container-order">
                    <h2>Produtos</h2>
                    <h5>Clique nos produtos para adicionar</h5>
                    <div>
                        <div className="center-tables">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código Produto</th>
                                        <th>Nome</th>
                                        <th>Preço R$</th>
                                        <th>Qtd Estoque</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.data?.map((data) => (
                                        <tr onClick={handleAppendProduct} className="click-product" key={data.id}>
                                            <td>
                                                <a>{data.id}</a>
                                            </td>
                                            <td>{data.name}</td>
                                            <td>{data.price}</td>
                                            <td>{data.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <OrderListItems
                    product={chosenProduct}
                    reloadListItemsTrrigger={mutateOrderProducts}
                    reloadProductstrigger={mutateProducts}
                    reloadOrderTrigger={handleFetchOrder}
                />
            </div>
        </>
    );
};

OrderAppendItems.propTypes = {
    idCustomer: P.string,
    orderId: P.number,
    triggerItems: P.func,
    handleFetchOrder: P.func,
};