const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Твоят CJ API ключ
const CJ_API_KEY = '5bde5e8de9674f6c9b121ebbe82e0c5f';

app.post('/getProduct', async (req, res) => {
    try {
        const { productId } = req.body;

        const response = await axios.post(
            'https://developers.cjdropshipping.com/api/product/detail',
            { productIds: [productId] },
            { headers: { 'Content-Type': 'application/json', 'Authorization': CJ_API_KEY } }
        );

        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Грешка при свързване с CJ API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
