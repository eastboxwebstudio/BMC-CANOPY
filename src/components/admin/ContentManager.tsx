import React, { useState, useRef, useEffect } from 'react';
import AdminModal from './AdminModal';

interface ContentManagerProps {
  title: string;
  items: any[];
  fields: any[];
  onSave: (item: any) => void;
  onDelete: (id: string) => void;
  onReorderSave?: (items: any[]) => void;
}

const ContentManager: React.FC<ContentManagerProps> = ({ title, items, fields, onSave, onDelete, onReorderSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  // Drag and Drop state
  const [localItems, setLocalItems] = useState(items);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isOrderChanged, setIsOrderChanged] = useState(false);

  // Sync local items when props change (e.g. after fetch or save)
  useEffect(() => {
    setLocalItems(items);
    setIsOrderChanged(false);
  }, [items]);

  const handleDragStart = (e: React.DragEvent, position: number) => {
    dragItem.current = position;
    // Add a class for styling purposes if needed
    (e.target as HTMLElement).closest('tr')?.classList.add('dragging');
  };

  const handleDragEnter = (e: React.DragEvent, position: number) => {
    dragOverItem.current = position;

    if (dragItem.current === null || dragItem.current === undefined) return;

    // Optional: Reorder locally for visual feedback immediately
    const copyListItems = [...localItems];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = position; // Update drag index to current position
    setLocalItems(copyListItems);
    setIsOrderChanged(true);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).closest('tr')?.classList.remove('dragging');
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleSaveOrder = () => {
    if (onReorderSave) {
      onReorderSave(localItems);
      setIsOrderChanged(false);
    }
  };

  const openModal = (item: any = null) => {
    const initialState = fields.reduce((acc, field) => {
      if (field.type === 'textarea_array' && item && item[field.name]) {
        acc[field.name] = item[field.name].join('\n');
      } else if (field.type === 'textarea_json' && item && item[field.name]) {
        try {
          acc[field.name] = JSON.stringify(item[field.name], null, 2);
        } catch (e) {
          console.error("Failed to stringify JSON:", e);
          acc[field.name] = "{}";
        }
      } else {
        acc[field.name] = item ? item[field.name] : '';
      }
      return acc;
    }, {} as any);
    if (item) initialState.id = item.id;

    setCurrentItem(initialState);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSave = () => {
    const itemToSave = { ...currentItem };
    let hasError = false;

    fields.forEach(field => {
      if (field.type === 'textarea_array') {
        itemToSave[field.name] = itemToSave[field.name].split('\n').filter((s: string) => s.trim() !== '');
      } else if (field.type === 'textarea_json') {
        try {
          if (itemToSave[field.name] && String(itemToSave[field.name]).trim()) {
            itemToSave[field.name] = JSON.parse(itemToSave[field.name]);
          } else {
            itemToSave[field.name] = null;
          }
        } catch (e: any) {
          alert(`Error: Invalid JSON in "${field.label}" field.\n\n${e.message}`);
          hasError = true;
        }
      }
    });

    if (hasError) return;

    onSave(itemToSave);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setCurrentItem((prev: any) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          {isOrderChanged && (
            <button onClick={handleSaveOrder} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save Order
            </button>
          )}
          <button onClick={() => openModal()} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
            Add New
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 w-10"></th>
              {fields.map(f => !f.hidden && <th key={f.name} scope="col" className="px-6 py-3">{f.label}</th>)}
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localItems.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                <td className="px-4 py-4">
                  <div className="drag-handle" title="Drag to reorder">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </td>
                {fields.map(f => !f.hidden && (
                  <td key={`${item.id}-${f.name}`} className="px-6 py-4">
                    {f.name === 'image_url' && item[f.name] ? (
                      <img src={item[f.name]} alt="preview" className="w-16 h-16 object-cover rounded-md" referrerPolicy="no-referrer" />
                    ) : Array.isArray(item[f.name]) ? (
                      item[f.name].length + ' items'
                    ) : typeof item[f.name] === 'object' && item[f.name] !== null ? (
                      <pre className="text-xs bg-gray-100 p-2 rounded-md font-mono max-w-xs overflow-auto">{JSON.stringify(item[f.name], null, 2)}</pre>
                    ) : (
                      <span className="max-w-xs block truncate">{item[f.name]}</span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 flex space-x-2">
                  <button onClick={() => openModal(item)} className="font-medium text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => onDelete(item.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal isOpen={isModalOpen} onClose={closeModal} title={currentItem?.id ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}>
        <div className="space-y-4">
          {fields.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === 'textarea' || field.type === 'textarea_array' || field.type === 'textarea_json' ? (
                <textarea
                  name={field.name}
                  value={currentItem ? currentItem[field.name] || '' : ''}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm ${field.type === 'textarea_json' ? 'font-mono' : ''}`}
                  rows={field.type === 'textarea_json' ? 8 : 3}
                ></textarea>
              ) : (
                <input type={field.type || 'text'} name={field.name} value={currentItem ? currentItem[field.name] || '' : ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2 pt-4">
            <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Save</button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default ContentManager;
