import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, MapPin, Star, Search, Image as ImageIcon, X } from 'lucide-react';

const inputClass =
    'w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-600 outline-none';

const pageLabel = (label) => {
    if (label.includes('Previous')) return 'Sebelumnya';
    if (label.includes('Next')) return 'Berikutnya';
    return label;
};

const emptyForm = (categories) => ({
    name: '',
    category_id: categories[0]?.id || '',
    price: '',
    location: '',
    rating: '4.8',
    description: '',
    image: null,
});

function Field({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold text-gray-700 mb-1">
                {label}
            </label>
            {children}
            {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
        </div>
    );
}

export default function Destinations({ destinations, categories, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);

    const { data, setData, post, transform, reset, processing, errors, clearErrors } = useForm(emptyForm(categories));

    const closeModal = () => {
        setModalOpen(false);
        reset();
        clearErrors();
    };

    // Tutup modal dengan tombol Escape
    useEffect(() => {
        if (!modalOpen) return;
        const onKeyDown = (e) => e.key === 'Escape' && closeModal();
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.destinations.index'), { search: searchTerm }, { preserveState: true });
    };

    const openCreateModal = () => {
        setEditingDestination(null);
        clearErrors();
        setData(emptyForm(categories));
        setModalOpen(true);
    };

    const openEditModal = (dest) => {
        setEditingDestination(dest);
        clearErrors();
        setData({
            name: dest.name,
            category_id: dest.category_id,
            price: dest.price,
            location: dest.location || '',
            rating: dest.rating || '4.8',
            description: dest.description || '',
            image: null,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = { forceFormData: true, onSuccess: closeModal };

        if (editingDestination) {
            // POST + _method=PUT agar upload file (multipart) tetap terbaca Laravel.
            // Memakai post() dari useForm supaya `processing` dan `errors` ikut bekerja.
            transform((formData) => ({ ...formData, _method: 'put' }));
            post(route('admin.destinations.update', editingDestination.id), options);
        } else {
            transform((formData) => formData);
            post(route('admin.destinations.store'), options);
        }
    };

    const handleDelete = (dest) => {
        if (confirm(`Apakah Anda yakin ingin menghapus destinasi "${dest.name}"?`)) {
            router.delete(route('admin.destinations.destroy', dest.id), { preserveScroll: true });
        }
    };

    const editingImage = editingDestination
        ? editingDestination.images?.find((img) => img.is_primary) || editingDestination.images?.[0]
        : null;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-bold leading-tight text-gray-900">Manajemen Destinasi Wisata</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Destinasi Baru</span>
                    </button>
                </div>
            }
        >
            <Head title="Kelola Destinasi - Admin" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Filter & Search Bar */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <form onSubmit={handleSearch} role="search" className="relative w-full sm:w-96">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari nama atau lokasi destinasi..."
                                aria-label="Cari destinasi"
                                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition"
                            />
                        </form>
                        <span className="text-xs text-gray-500 font-medium">
                            Total {destinations.total} destinasi terdaftar
                        </span>
                    </div>

                    {/* Destinations Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th scope="col" className="py-4 px-6">Destinasi</th>
                                        <th scope="col" className="py-4 px-6">Kategori</th>
                                        <th scope="col" className="py-4 px-6">Lokasi</th>
                                        <th scope="col" className="py-4 px-6">Harga Tiket</th>
                                        <th scope="col" className="py-4 px-6">Rating</th>
                                        <th scope="col" className="py-4 px-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {destinations.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-gray-500">
                                                {filters?.search
                                                    ? `Tidak ada destinasi yang cocok dengan "${filters.search}".`
                                                    : 'Belum ada data destinasi wisata.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        destinations.data.map((dest) => {
                                            const primaryImg = dest.images?.find((img) => img.is_primary) || dest.images?.[0];
                                            return (
                                                <tr key={dest.id} className="hover:bg-gray-50/60 transition">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                                {primaryImg ? (
                                                                    <img
                                                                        src={primaryImg.image_url}
                                                                        alt={dest.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                        <ImageIcon className="w-5 h-5" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">{dest.name}</h4>
                                                                <p className="text-xs text-gray-400 font-mono">/{dest.slug}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">
                                                            {dest.category?.name || '-'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-600">
                                                        <div className="flex items-center space-x-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                            <span>{dest.location || '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 font-medium text-gray-900">
                                                        Rp {Number(dest.price).toLocaleString('id-ID')}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center space-x-1 text-amber-500">
                                                            <Star className="w-4 h-4 fill-amber-400" />
                                                            <span className="font-semibold text-gray-800">
                                                                {Number(dest.rating).toFixed(1)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-right space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(dest)}
                                                            className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-yellow-600 rounded-lg transition"
                                                            title="Edit destinasi"
                                                            aria-label={`Edit ${dest.name}`}
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(dest)}
                                                            className="p-1.5 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded-lg transition"
                                                            title="Hapus destinasi"
                                                            aria-label={`Hapus ${dest.name}`}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {destinations.links && destinations.links.length > 3 && (
                            <nav aria-label="Paginasi" className="py-3 px-6 border-t border-gray-100 flex gap-1">
                                {destinations.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        disabled={!link.url}
                                        aria-current={link.active ? 'page' : undefined}
                                        onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                        className={`px-3 py-1.5 text-xs rounded-lg transition ${
                                            link.active
                                                ? 'bg-yellow-600 text-white font-bold'
                                                : link.url
                                                  ? 'hover:bg-gray-100 text-gray-700'
                                                  : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                    >
                                        {pageLabel(link.label)}
                                    </button>
                                ))}
                            </nav>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
                    onMouseDown={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="destination-modal-title"
                        className="bg-white rounded-2xl shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6"
                    >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h3 id="destination-modal-title" className="text-lg font-bold text-gray-900">
                                {editingDestination ? 'Edit Destinasi Wisata' : 'Tambah Destinasi Baru'}
                            </h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Tutup"
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Field id="dest-name" label="Nama Destinasi *" error={errors.name}>
                                <input
                                    id="dest-name"
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Pantai Marina Kalianda"
                                    className={inputClass}
                                />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field id="dest-category" label="Kategori *" error={errors.category_id}>
                                    <select
                                        id="dest-category"
                                        required
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className={`${inputClass} bg-white`}
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </Field>

                                <Field id="dest-location" label="Lokasi (Kabupaten / Kota) *" error={errors.location}>
                                    <input
                                        id="dest-location"
                                        type="text"
                                        required
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Contoh: Lampung Selatan"
                                        className={inputClass}
                                    />
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field id="dest-price" label="Harga Tiket Masuk (Rp) *" error={errors.price}>
                                    <input
                                        id="dest-price"
                                        type="number"
                                        required
                                        min="0"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="Contoh: 25000"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field id="dest-rating" label="Rating (0.0 - 5.0)" error={errors.rating}>
                                    <input
                                        id="dest-rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        placeholder="4.8"
                                        className={inputClass}
                                    />
                                </Field>
                            </div>

                            <Field id="dest-description" label="Deskripsi Destinasi" error={errors.description}>
                                <textarea
                                    id="dest-description"
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Ceritakan daya tarik dan keunikan destinasi ini..."
                                    className={inputClass}
                                />
                            </Field>

                            <Field id="dest-image" label="Unggah Foto Destinasi (Maks. 2MB, JPG/PNG)" error={errors.image}>
                                {editingImage && (
                                    <div className="mb-2 flex items-center gap-3">
                                        <img
                                            src={editingImage.image_url}
                                            alt={`Foto saat ini: ${editingDestination.name}`}
                                            className="h-12 w-12 rounded-xl object-cover"
                                        />
                                        <p className="text-xs text-gray-500">Kosongkan jika tidak ingin mengganti foto.</p>
                                    </div>
                                )}
                                <input
                                    id="dest-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0] ?? null)}
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-yellow-600/10 file:text-yellow-600 hover:file:bg-yellow-600/20"
                                />
                            </Field>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold rounded-xl shadow-sm transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Destinasi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}