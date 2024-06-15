const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }

    const notificationClass = type === 'error' ? 'message error' : 'message success'

    return (
        <div className={notificationClass}>
            {message}
        </div>
    )
}

export default Notification