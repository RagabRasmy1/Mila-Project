type Category = {
    _id: string;
    name: string
}
type FilterSidebarType = {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    setSelectedCategoryId: (id: string) => void;
}

const FilterSidebar = ({ categories, selectedCategory, setSelectedCategory, setSelectedCategoryId }: FilterSidebarType) => {

    return (
        < div className="space-y-6" >
            < div >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.length && categories.map(category => (
                        <label key={category.name} className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value={category.name}
                                checked={selectedCategory === category.name}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedCategoryId(category._id);
                                }}
                                className="text-rose-600 focus:ring-rose-500"
                            />
                            <span className="ml-2 text-gray-700">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div >

        </div >
    )
};

export default FilterSidebar