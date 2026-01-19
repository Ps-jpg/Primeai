const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'pending';
            case 'in-progress':
                return 'in-progress';
            case 'completed':
                return 'completed';
            default:
                return '';
        }
    };

    return (
        <div className="task-card">
            <div className={`task-priority-indicator ${task.priority}`}></div>
            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
                <div className="task-meta">
                    <span className={`task-status ${getStatusClass(task.status)}`}>
                        {task.status === 'in-progress' ? '⏳' : task.status === 'completed' ? '✓' : '○'} {task.status}
                    </span>
                    {task.dueDate && (
                        <span className="task-due-date">
                            📅 {formatDate(task.dueDate)}
                        </span>
                    )}
                </div>
            </div>
            <div className="task-actions">
                <button
                    className="task-action-btn edit"
                    onClick={() => onEdit(task)}
                    title="Edit task"
                >
                    ✏️
                </button>
                <button
                    className="task-action-btn delete"
                    onClick={() => onDelete(task._id)}
                    title="Delete task"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
