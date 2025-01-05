

if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
}


export const Error = ({title, message, onConfirm}) => {


    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
            {onConfirm && (
                <div id = "confirmation-actions">
                    <button onClick={() => onConfirm ? onConfirm : onCancel}>
                        OK
                    </button>
                </div>
            )}

        </div>
    )
}