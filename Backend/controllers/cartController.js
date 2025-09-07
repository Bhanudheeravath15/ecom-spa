const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.itemId');
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, items: [{ itemId, quantity }] });
        } else {
            const index = cart.items.findIndex(i => i.itemId.toString() === itemId);
            if (index > -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push({ itemId, quantity });
            }
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const cart = await Cart.findOne({ userId: req.user.userId });
        cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
