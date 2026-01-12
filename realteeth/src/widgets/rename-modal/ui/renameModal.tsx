import { useState } from 'react';
import { Modal } from '@shared/ui';

type RenameModalProps = {
  isOpen: boolean;
  currentName: string;
  onRename: (newName: string) => void;
  onClose: () => void;
};
export function RenameModal({ isOpen, currentName, onRename, onClose }: RenameModalProps) {
  const [newName, setNewName] = useState<string>(currentName);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white w-full max-w-md p-2 md:p-4">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
          이름 변경하기
        </h3>

        <div className="mb-6">
          <label htmlFor="location-name" className="block text-sm md:text-base text-gray-700 mb-2">
            새 이름
          </label>
          <input
            id="location-name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="장소 이름을 입력하세요"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onRename(newName);
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => onRename(newName)}
            disabled={!newName.trim()}
            className="px-5 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            변경
          </button>
        </div>
      </div>
    </Modal>
  );
}
