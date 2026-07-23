import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Plus, Trash2, LogOut, CheckCircle, AlertCircle, X } from 'lucide-react';
import { auth } from '../firebase';
import {
  subscribeSarees,
  addSaree,
  deleteSaree,
  getUniqueCategories,
} from '../sareeService';
import { formatPrice } from '../shopConfig';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [colors, setColors] = useState(['#6B1E23']);
  const [currentColor, setCurrentColor] = useState('#6B1E23');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [formError, setFormError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeSarees((data) => {
      setSarees(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const existingCategories = getUniqueCategories(sarees);

  const resetForm = () => {
    setName('');
    setCategory('');
    setNewCategory('');
    setUseNewCategory(false);
    setColors(['#6B1E23']);
    setCurrentColor('#6B1E23');
    setPrice('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAddColor = () => {
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const handleRemoveColor = (color) => {
    if (colors.length > 1) {
      setColors(colors.filter((c) => c !== color));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');

    const finalCategory = useNewCategory ? newCategory.trim() : category;
    if (!finalCategory) {
      setFormError('Please select or enter a category.');
      return;
    }
    if (!imageFile) {
      setFormError('Please select an image.');
      return;
    }

    setSubmitting(true);
    try {
      await addSaree({
        name: name.trim(),
        category: finalCategory,
        colors,
        price,
        imageFile,
      });
      resetForm();
      setSuccess('Saree added successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch {
      setFormError('Failed to add saree. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (saree) => {
    if (!window.confirm(`Delete "${saree.name}"? This cannot be undone.`)) {
      return;
    }
    setDeletingId(saree.id);
    try {
      await deleteSaree(saree);
    } catch {
      alert('Failed to delete saree. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-40 border-b border-maroon/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-serif text-xl font-semibold text-maroon sm:text-2xl">
              Admin Dashboard
            </h1>
            <p className="text-xs text-ink/50">
              {sarees.length} saree{sarees.length !== 1 ? 's' : ''} in collection
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-maroon/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-maroon transition-colors hover:bg-maroon/5"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
        <div className="zari-border h-[3px] w-full" />
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Add Form */}
          <section className="rounded-2xl border border-maroon/10 bg-white shadow-sm">
            <div className="zari-border h-[4px] w-full" />
            <div className="p-5 sm:p-6">
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-maroon">
                <Plus className="h-5 w-5 text-gold" />
                Add New Saree
              </h2>

              {success && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-teal/10 px-4 py-3 text-sm text-teal">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {success}
                </div>
              )}

              {formError && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-maroon/5 px-4 py-3 text-sm text-maroon">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                    Saree Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                    placeholder="e.g. Royal Kanjivaram Silk"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                    Category
                  </label>
                  {!useNewCategory ? (
                    <div className="space-y-2">
                      <select
                        value={category}
                        onChange={(e) => {
                          if (e.target.value === '__new__') {
                            setUseNewCategory(true);
                            setCategory('');
                          } else {
                            setCategory(e.target.value);
                          }
                        }}
                        className="input-field"
                      >
                        <option value="">Select category</option>
                        {existingCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                        <option value="__new__">+ Add new category</option>
                      </select>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="input-field"
                        placeholder="New category name"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUseNewCategory(false);
                          setNewCategory('');
                        }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-maroon/15 text-ink/50 hover:bg-maroon/5"
                        aria-label="Cancel new category"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                    Colors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <div key={color} className="group relative">
                        <span
                          className="block h-10 w-10 rounded-full border-2 border-ink/10 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        {colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(color)}
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-maroon text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Remove color ${color}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="h-11 w-14 cursor-pointer rounded-lg border border-maroon/15"
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-maroon/15 text-xs font-medium uppercase tracking-[0.15em] text-maroon transition-colors hover:bg-maroon/5"
                    >
                      Add Color
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="1"
                    className="input-field"
                    placeholder="e.g. 4500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                    Saree Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-maroon/5 file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-wider file:text-maroon"
                    required={!imagePreview}
                  />
                  {imagePreview && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-maroon/10">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="aspect-[3/4] w-full max-w-[200px] object-cover"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-maroon w-full disabled:opacity-60"
                >
                  {submitting ? 'Uploading...' : 'Add Saree'}
                </button>
              </form>
            </div>
          </section>

          {/* Manage List */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon sm:text-2xl">
              Manage Sarees
            </h2>
            <p className="mt-1 text-sm text-ink/50">
              Updates in real time across all devices
            </p>

            {loading ? (
              <div className="mt-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton h-20 rounded-xl" />
                ))}
              </div>
            ) : sarees.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-maroon/20 bg-white p-8 text-center">
                <p className="text-sm text-ink/50">No sarees yet. Add your first one!</p>
              </div>
            ) : (
              <div className="mt-6 max-h-[70vh] space-y-3 overflow-y-auto pr-1">
                {sarees.map((saree) => (
                  <div
                    key={saree.id}
                    className="flex items-center gap-3 rounded-xl border border-maroon/10 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-4"
                  >
                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-maroon/5 sm:h-20 sm:w-16">
                      {saree.imageUrl ? (
                        <img
                          src={saree.imageUrl}
                          alt={saree.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] text-ink/30">
                          N/A
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-sm font-semibold text-maroon sm:text-base">
                        {saree.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-teal sm:text-xs">
                        {saree.category}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-ink">
                        {formatPrice(saree.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(saree)}
                      disabled={deletingId === saree.id}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-maroon/60 transition-colors hover:bg-maroon/5 hover:text-maroon disabled:opacity-50"
                      aria-label={`Delete ${saree.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
