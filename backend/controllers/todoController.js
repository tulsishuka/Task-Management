import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addTodo = async (req, res) => {
  const { title, description, purpose } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  try {
    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      purpose,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Use deleteOne instead of remove
    await Todo.deleteOne({ _id: req.params.id });

    res.json({ message: 'Todo removed' });
  } catch (error) {
    console.error('Delete failed:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const searchTodos = async (req, res) => {
  const { query } = req.query;
  try {
    const todos = await Todo.find({
      user: req.user._id,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { purpose: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
