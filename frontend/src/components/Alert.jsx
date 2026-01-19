const Alert = ({ type = 'info', message, onClose }) => {
    if (!message) return null;

    return (
        <div className={`alert alert-${type}`}>
            <span>{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontSize: '1.25rem',
                        padding: '0 0.5rem',
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Alert;
