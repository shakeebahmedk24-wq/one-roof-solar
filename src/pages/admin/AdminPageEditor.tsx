import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

function RecursiveEditor({ data, onChange, level = 0 }: { data: any, onChange: (newData: any) => void, level?: number }) {
  if (data === null || data === undefined) return null;

  if (typeof data === 'string') {
    const isTextArea = data.length > 60 || data.includes('\n');
    return isTextArea ? (
      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm font-mono"
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
      />
    );
  }

  if (typeof data === 'number') {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
      />
    );
  }

  if (typeof data === 'boolean') {
    return (
      <input
        type="checkbox"
        checked={data}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded"
      />
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="pl-4 border-l-2 border-slate-200 py-2 relative group">
            <div className="absolute -left-[11px] top-4 w-5 h-5 bg-slate-100 rounded-full border border-slate-300 text-xs flex items-center justify-center font-bold text-slate-500">{index + 1}</div>
            <RecursiveEditor
              data={item}
              level={level + 1}
              onChange={(newItem) => {
                const newData = [...data];
                newData[index] = newItem;
                onChange(newData);
              }}
            />
            <button
              onClick={() => {
                const newData = [...data];
                newData.splice(index, 1);
                onChange(newData);
              }}
              className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newItem = typeof data[0] === 'object' ? JSON.parse(JSON.stringify(data[0])) : "";
            onChange([...data, newItem]);
          }}
          className="text-sm text-brand-600 hover:text-brand-800 font-medium"
        >
          + Add Item
        </button>
      </div>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className="space-y-4">
        {Object.keys(data).map((key) => (
          <div key={key} className={level > 0 ? "bg-slate-50 p-4 rounded-lg border border-slate-100 shadow-sm" : ""}>
            <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            <RecursiveEditor
              data={data[key]}
              level={level + 1}
              onChange={(newValue) => {
                const newData = { ...data, [key]: newValue };
                onChange(newData);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export function AdminPageEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({
    title: '',
    heroTitle: '',
    heroSubtitle: '',
    content: ''
  });

  useEffect(() => {
    if (!pageId) return;
    
    async function fetchPage() {
      setLoading(true);
      try {
        const docRef = doc(db, 'pages', pageId!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as any);
        } else {
          // default data based on pageId
          setData({
            title: pageId!.charAt(0).toUpperCase() + pageId!.slice(1),
            heroTitle: '',
            heroSubtitle: '',
            content: ''
          });
        }
      } catch (error) {
         handleFirestoreError(error, OperationType.GET, `pages/${pageId}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [pageId]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pageId) return;
    setSaving(true);
    try {
       await setDoc(doc(db, 'pages', pageId), data);
       alert('Saved successfully!');
    } catch (error) {
       handleFirestoreError(error, OperationType.WRITE, `pages/${pageId}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading editor...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-semibold capitalize">Edit {pageId} Page</h1>
        <button 
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-2 bg-brand-500 text-slate-900 rounded-lg font-bold hover:bg-brand-600 transition disabled:opacity-50 shadow-md"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      
      <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-xl shadow-sm">
        <RecursiveEditor data={data} onChange={setData} />
      </div>
    </div>
  );
}
