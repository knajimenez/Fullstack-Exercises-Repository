const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const notificationType = type === 'error' ? 'error' : 'success'

    return (
        <div className={notificationType}>
            {message}
        </div>
    )
}

export default Notification