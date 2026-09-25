import useNotificationStore from '../../store/useNotificationStore';

function Toast() {
  const {
    notifications,
    removeNotification,
  } = useNotificationStore();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex min-w-[300px] items-start justify-between gap-4 rounded-lg border bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {notification.title}
            </p>

            {notification.message && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {notification.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeNotification(notification.id)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;