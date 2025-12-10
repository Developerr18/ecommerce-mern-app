import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/assets";

export const ShopContext = createContext();

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const currency = "$";
    const deliveryFee = 10;

    ///////////////////////////////////////////////
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please Select Product Size!");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendURL}/api/cart/add`,
                    { itemId, size },
                    { headers: { token } }
                );
            } catch (err) {
                console.log(err);
                toast.error(err.message);
            }
        }
    };

    ////////////////////////////////////////
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };

    ///////////////////////////////////////////////
    const updateCart = async (itemId, size, quantity) => {
        const cartItemsClone = structuredClone(cartItems);
        cartItemsClone[itemId][size] = quantity;
        setCartItems(cartItemsClone);

        if (token) {
            try {
                await axios.post(
                    `${backendURL}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (err) {
                console.log(err);
                toast.error(err.message);
            }
        }
    };

    ////////////////////////////////////////
    const getCartAmount = () => {
        if (products.length > 0) {
            let totalAmount = 0;
            for (const itemId in cartItems) {
                const product = products.find((p) => p._id === itemId);
                for (const size in cartItems[itemId]) {
                    totalAmount += product.price * cartItems[itemId][size];
                }
            }
            return totalAmount;
        }
    };

    /////////////////////////////////////////////
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${backendURL}/api/product/list`);
            if (res.data.success) {
                setProducts(res.data.products);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    ///////////////////////////////////////////
    const getUserCart = async (token) => {
        try {
            const res = await axios.post(
                `${backendURL}/api/cart/get`,
                {},
                { headers: { token } }
            );
            if (res.data.success) {
                setCartItems(res.data.cartData);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    }, []);

    ///////////////////////////////////
    const value = {
        products,
        currency,
        deliveryFee,
        searchText,
        setSearchText,
        showSearchbar,
        setShowSearchbar,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateCart,
        getCartAmount,
        navigate,
        token,
        setToken,
        backendURL,
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
