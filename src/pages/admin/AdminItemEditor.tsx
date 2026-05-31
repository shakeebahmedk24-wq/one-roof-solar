import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

export function AdminItemEditor() {
  const { collectionId, itemId } = useParams<{ collectionId: string, itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({
    title: '',
    description: '',
    content: '',
    icon: '',
    image: '',
    features: []
  });

  const isNew = itemId === 'new';

  useEffect(() => {
    if (!collectionId || !itemId || isNew) {
      setLoading(false);
      return;
    }
    
    async function fetchItem() {
      setLoading(true);
      try {
        const docRef = doc(db, collectionId!, itemId!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as any);
        } else {
          alert('Item not found');
          navigate(`/admin/collections/${collectionId}`);
        }
      } catch (error) {
         handleFirestoreError(error, OperationType.GET, `${collectionId}/${itemId}`);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [collectionId, itemId, navigate, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionId || !itemId) return;
    setSaving(true);
    try {
       // if new, we generate an ID or use title slug
       const targetId = isNew ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : itemId;
       if (!targetId) {
         alert('Please enter a title');
         setSaving(false);
         return;
       }
       await setDoc(doc(db, collectionId, targetId), data);
       
       if (isNew) {
          navigate(`/admin/collections/${collectionId}`);
       } else {
          alert('Saved successfully!');
       }
    } catch (error) {
       handleFirestoreError(error, OperationType.WRITE, `${collectionId}/${itemId}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading editor...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(`/admin/collections/${collectionId}`)}
          className="text-slate-500 hover:text-slate-800"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-display font-semibold capitalize">
          {isNew ? 'New' : 'Edit'} {collectionId?.slice(0,-1)}
        </h1>
      </div>
      
      <form onSubmit={handleSave} className="space-y-6 bg-white p-8 border border-slate-200 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input 
            type="text" 
            value={data.title}
            onChange={e => setData({...data, title: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            required
            placeholder="e.g. Solar Panel Installation"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
          <textarea 
            value={data.description}
            onChange={e => setData({...data, description: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            rows={2}
            required
            placeholder="A brief summary for cards and lists"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Content</label>
          <textarea 
            value={data.content}
            onChange={e => setData({...data, content: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono text-sm"
            rows={10}
            placeholder="Detailed page content..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
          <input 
            type="text" 
            value={data.image || ''}
            onChange={e => setData({...data, image: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            placeholder="https://..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Features (comma separated)</label>
          <textarea 
            value={Array.isArray(data.features) ? data.features.join(', ') : (data.features || '')}
            onChange={e => setData({...data, features: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            rows={2}
            placeholder="Feature 1, Feature 2"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Lucide Icon Name</label>
           <input 
             type="text" 
             value={data.icon}
             onChange={e => setData({...data, icon: e.target.value})}
             className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none max-w-sm"
             placeholder="e.g. Sun, Battery, Zap"
           />
           <p className="text-xs text-slate-500 mt-1">Check lucide.dev for icon names</p>
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex justify-end">
           <button 
             type="submit" 
             disabled={saving}
             className="px-6 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition disabled:opacity-50"
           >
             {saving ? 'Saving...' : 'Save Item'}
           </button>
        </div>
      </form>
    </div>
  );
}
