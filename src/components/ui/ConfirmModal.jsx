function ConfirmModal({isOpen,title,message,onConfirm,onCancel}){
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div role="dialog" aria-modal="true" className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded border hover:bg-gray-100">
                        Cancel
                    </button>
                     <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmModal;