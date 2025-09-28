const express = require('express');
const app = express();

app.use(express.json());

let cards = [
    { id: 1, suit: 'Hearts', value: 'Ace' },
    { id: 2, suit: 'Spades', value: 'King' },
    { id: 3, suit: 'Diamonds', value: 'Queen' }
];

let nextId = 4;

// Root route: Return all cards
app.get('/', (req, res) => {
    res.json(cards);
});

// GET /cards - List all cards
app.get('/cards', (req, res) => {
    res.status(200).json(cards);
});

// GET /cards/:id - Retrieve a card by ID
app.get('/cards/:id', (req, res) => {
    const cardId = Number(req.params.id);
    const card = cards.find(c => c.id === cardId);
    if (card) {
        res.status(200).json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

// POST /cards - Add a new card
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;
    const newCard = { id: nextId++, suit, value };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// DELETE /cards/:id - Remove a card by ID
app.delete('/cards/:id', (req, res) => {
    const cardId = Number(req.params.id);
    const index = cards.findIndex(c => c.id === cardId);
    if (index !== -1) {
        const removed = cards.splice(index, 1)[0];
        res.status(200).json({ message: `Card with ID ${cardId} removed.`, card: removed });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
