import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (product) => set({product}),
    createProduct: async(newProduct)=> {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return({succes: false, message: "Fill in all input fields"});
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct)

        })

        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}))
        return {success: true, message: "Product created successfully"}


    },

    fetchProducts: async() => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (!data.success) return { succes: false, message: data.message}

        set((state) => ({products: state.products.filter(product=> product._id !== pid)}) );
        return {success: true, message: data.message}

    },

    updateProduct: async (pid, updatedProduct) => {
    try {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to update product" };
        }

        set(state => ({
            products: state.products.map(product => product._id === pid ? data.data : product)
        }));

        return { success: true, message: "Product updated successfully" };

    } catch (error) {
        console.error(error.message);

        return { success: false, message: "An error occurred while updating the product" };
    }
}


    }

)
)
