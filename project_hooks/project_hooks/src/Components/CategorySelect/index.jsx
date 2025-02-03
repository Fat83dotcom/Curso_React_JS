import P from "prop-types"

export const SelectCategory = ({handleChangeProduct: handleChangeCategory, productCategory=[]}) => {
    return (
        <select onChange={handleChangeCategory} name="category" id="category" >
            <option value="">---</option>
            {productCategory.map((cat) => {
                return (
                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                )
            })}
        </select>
    )
}

SelectCategory.propTypes = {
    handleChangeProduct: P.func,
    productCategory: P.array,
}
