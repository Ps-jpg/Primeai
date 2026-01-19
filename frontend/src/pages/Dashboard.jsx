import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Alert from '../components/Alert';
import { taskApi } from '../services/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskApi.getAll();
            setTasks(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const response = await taskApi.create(taskData);
            setTasks((prev) => [response.data, ...prev]);
            setSuccess('Task created successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            throw err;
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const response = await taskApi.update(editingTask._id, taskData);
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === editingTask._id ? response.data : task
                )
            );
            setSuccess('Task updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            throw err;
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await taskApi.delete(taskId);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
            setSuccess('Task deleted successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to delete task');
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleModalSubmit = async (taskData) => {
        if (editingTask) {
            await handleUpdateTask(taskData);
        } else {
            await handleCreateTask(taskData);
        }
    };

    // Calculate stats
    const stats = {
        total: tasks.length,
        pending: tasks.filter((t) => t.status === 'pending').length,
        inProgress: tasks.filter((t) => t.status === 'in-progress').length,
        completed: tasks.filter((t) => t.status === 'completed').length,
    };

    return (
        <div className="app-container">
            <Navbar />

            <main className="main-content">
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Welcome back, {user?.name}! 👋</h1>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Here's an overview of your tasks
                        </p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Task
                    </button>
                </div>

                {/* Alerts */}
                {error && <Alert type="error" message={error} onClose={() => setError('')} />}
                {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

                {/* Stats Cards */}
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Tasks</div>
                    </div>
                    <div className="stat-card pending">
                        <div className="stat-value">{stats.pending}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                    <div className="stat-card in-progress">
                        <div className="stat-value">{stats.inProgress}</div>
                        <div className="stat-label">In Progress</div>
                    </div>
                    <div className="stat-card completed">
                        <div className="stat-value">{stats.completed}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>

                {/* Task List */}
                <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Your Tasks</h2>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3 className="empty-state-title">No tasks yet</h3>
                        <p className="empty-state-text">
                            Create your first task to get started!
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Create Task
                        </button>
                    </div>
                ) : (
                    <div className="task-list">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                task={editingTask}
                isEditing={!!editingTask}
            />
        </div>
    );
};

export default Dashboard;
