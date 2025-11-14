import express from 'express';
import { getTodos, addTodo, toggleTodo, deleteTodo, searchTodos } from '../controllers/todoController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/all', protect, getTodos);
router.post('/add', protect, addTodo);
router.put('/toggle/:id', protect, toggleTodo);
router.delete('/delete/:id', protect, deleteTodo);
router.get('/search', protect, searchTodos);

export default router;
