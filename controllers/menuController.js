const axios = require('axios');

const BASE_URL = "https://private-anon-f2362d9103-pizzaapp.apiary-mock.com";
const CATEGORIES = ['dryck', 'pizza', 'tillbehör'];

exports.getMenuItems = async (req, res) => {
  try {
    const { category } = req.query;
    const { data } = await axios.get(`${BASE_URL}/restaurants/restaurantId/menu`, {
      params: { category }
    });

    if (data) {
      let filteredData = data;

      if (category) {
        if (!CATEGORIES.includes(category.toLowerCase())) {
          return res.status(400).json({ error: `Categoria ${category} non trovata` });
        }

        filteredData = data.filter(item => item.category?.toLowerCase() === category.toLowerCase());
      }

      return res.status(200).json(filteredData);
    } else {
      return res.status(500).json({ msg: "Errore nel recupero dei dati" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Errore del server" });
  }
};