const express = require('express');
const supabase = require('../db/supabase');

const router = express.Router();

// GET /items?status=...
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = supabase.from('items').select('*');
    if (status) {
      query = query.eq('status', status);
    }
    const { data, error } = await query.order('id', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ error: 'Item not found' });
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /items
router.post('/', async (req, res, next) => {
  try {
    const { nama, jenis, status, tanggal_masuk, tanggal_keluar } = req.body;
    const payload = { nama, jenis, status, tanggal_masuk, tanggal_keluar };
    const { data, error } = await supabase.from('items').insert(payload).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  } catch (err) {
    next(err);
  }
});

// PUT /items/:id
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const { data, error } = await supabase.from('items').update(updates).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(data[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE /items/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { data, error } = await supabase.from('items').delete().eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted', item: data[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
